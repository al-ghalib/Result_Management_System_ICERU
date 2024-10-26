"use client";

import { useStateContext } from "@/contexts";
import { useEffect, useState } from "react";

import LoadingSVG from "@/public/Infinity.svg";
import Image from "next/image";

import * as actions from "@/actions";
import { toast } from "react-toastify";

export default function Home() {
  const { authToken, authUserEmail, handleLogOut } = useStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!authToken) {
        actions.To_login_page();
      } else {
        setLoading(false);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [authToken]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [studentCnt, setStudentCnt] = useState(0);
  const [teacherCnt, setTeacherCnt] = useState(0);
  const [avrgCGPA, setAvrgCGPA] = useState(0.0);
  const [runningFormFillUp, setRunningFormFillUp] = useState(0);
  const [userCnt, setUserCnt] = useState(0);

  const [isMounted, setIsMounted] = useState(false);

  const getCGPA = async (id) => {
    const res = await actions.get_student_cgpa(id);
    return res.cgpa;
  };

  const fetchStudents = async () => {
    const res = await actions.fetch_students();
    if (!res.error) {
      const students = res.students;

      let totalGPA = 0.0;
      let cnt = 0;

      const gpaPromises = students.map(async (student) => {
        const cgpa = await getCGPA(student.id);
        return cgpa;
      });
      const gpas = await Promise.all(gpaPromises);
      gpas.forEach((gpa) => {
        totalGPA += gpa;
        cnt++;
      });
      if (cnt > 0) {
        setAvrgCGPA(totalGPA / cnt);
      }
    }
  };

  const fetchUsers = async () => {
    const res = await actions.fetch_users();
    if (!res.error) {
      setUserCnt(res.userCount);
      let teacherCount = 0;
      let studentCount = 0;
      res.users.forEach((user) => {
        if (user.role === "Teacher") teacherCount++;
        else if (user.role === "Student") studentCount++;
      });
      setTeacherCnt(teacherCount);
      setStudentCnt(studentCount);
    } else {
      toast.error(res.msg);
    }
  };

  const fetchForms = async () => {
    const res = await actions.fetch_forms(authToken);
    if (!res.error) {
      let cnt = 0;
      res.forms.forEach((x) => {
        if (new Date() <= x.end_time && new Date() >= x.start_time) {
          cnt++;
        }
      });
      setRunningFormFillUp(cnt);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStudents();
    fetchForms();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setIsMounted(true);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-[90vh] w-full flex justify-center items-center">
          <div className="m-2">
            <Image
              src={LoadingSVG}
              width={200}
              height={100}
              alt="Infinity loading"
            />
          </div>
        </div>
      ) : (
        <div className="m-2 md:m-8 mt-10 p-2 md:px-10 bg-white rounded-3xl h-[90%]">
          <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6  lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  Result Management System
                </h2>

                <p className="mt-2 text-gray-500 sm:text-xl">
                  Overall dashboard
                </p>
              </div>

              <div className="mt-5 sm:mt-8">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                    <dt className="order-last text-lg font-medium text-gray-500">
                      Total users
                    </dt>

                    <dd className="text-4xl font-extrabold text-sky-500 md:text-5xl">
                      {userCnt}
                    </dd>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                    <dt className="order-last text-lg font-medium text-gray-500">
                      Total students
                    </dt>

                    <dd className="text-4xl font-extrabold text-sky-500 md:text-5xl">
                      {studentCnt}
                    </dd>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                    <dt className="order-last text-lg font-medium text-gray-500">
                      Total teachers
                    </dt>

                    <dd className="text-4xl font-extrabold text-sky-500 md:text-5xl">
                      {teacherCnt}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 sm:mt-8">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                    <dt className="order-last text-lg font-medium text-gray-500">
                      Average CGPA of students
                    </dt>

                    <dd className="text-4xl font-extrabold text-sky-500 md:text-5xl">
                      {avrgCGPA.toFixed(2)}
                    </dd>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                    <dt className="order-last text-lg font-medium text-gray-500">
                      Running form fill ups
                    </dt>

                    <dd className="text-4xl font-extrabold text-sky-500 md:text-5xl">
                      {runningFormFillUp}
                    </dd>
                  </div>

                  <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                    <dt className="order-last text-lg font-medium text-gray-500">
                      Total Semesters
                    </dt>

                    <dd className="text-4xl font-extrabold text-sky-500 md:text-5xl">
                      {8}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col items-center justify-center mt-4">
                <div>
                  <p className="text-gray-400">Current Time</p>
                </div>
                <div className="text-3xl font-semibold text-gray-800 bg-white rounded-lg">
                  {isMounted ? currentTime.toLocaleTimeString() : "Loading..."}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
