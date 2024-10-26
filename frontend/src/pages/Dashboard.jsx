import React, { useEffect, useState } from "react";
import axios from "axios";

import { useStateContext } from "../contexts/ContextProvider";

const Dashboard = () => {
  const { authToken } = useStateContext();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [studentCnt, setStudentCnt] = useState(0);
  const [teacherCnt, setTeacherCnt] = useState(0);
  const [avrgCGPA, setAvrgCGPA] = useState(0.0);
  const [runningFormFillUp, setRunningFormFillUp] = useState(0);
  const [userCnt, setUserCnt] = useState(0);

  const getCGPA = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/result/?studentId=${id}&semesterId=0`
      );
      if (res.data) {
        return res.data.CGPA;
      } else {
        return 0.0;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/students/`);
      if (res.data) {
        const students = res.data;

        let totalGPA = 0.0;
        let cnt = 0;

        const gpaPromises = students.map(async (student) => {
          try {
            const cgpa = await getCGPA(student.id);
            return cgpa;
          } catch (error) {
            console.error(error);
            return 0.0;
          }
        });
        const gpas = await Promise.all(gpaPromises);
        gpas.forEach((gpa) => {
          totalGPA += gpa;
          cnt++;
        });
        if (cnt > 0) {
          setAvrgCGPA(totalGPA / cnt);
          console.log(totalGPA / cnt);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/users/`);
      if (res.data) {
        setUserCnt(res.data.length);

        let teacherCount = 0;
        let studentCount = 0;

        res.data.forEach((user) => {
          if (user.role === "Teacher") teacherCount++;
          else if (user.role === "Student") studentCount++;
        });
        setTeacherCnt(teacherCount);
        setStudentCnt(studentCount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchForms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/form-fill-ups/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        const data = res.data;
        let cnt = 0;
        data.forEach((x) => {
          if (new Date() <= x.end_time && new Date() >= x.start_time) {
            cnt++;
          }
        });
        setRunningFormFillUp(cnt);
      } else {
        console.log("Something is wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchStudents();
    fetchForms();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="m-2 md:m-8 mt-24 p-2 md:px-10 md:py-5 bg-white rounded-3xl h-[90%]">
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 md:pt-12 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-serif">
              Result Management System
            </h2>

            <p className="mt-2 text-gray-500 sm:text-xl">Overall dashboard</p>
          </div>

          <div className="mt-5 sm:mt-8">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Total users
                </dt>

                <dd className="text-4xl font-extrabold text-[#03C9D7] md:text-5xl">
                  {userCnt}
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Total students
                </dt>

                <dd className="text-4xl font-extrabold text-[#03C9D7] md:text-5xl">
                  {studentCnt}
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Total teachers
                </dt>

                <dd className="text-4xl font-extrabold text-[#03C9D7] md:text-5xl">
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

                <dd className="text-4xl font-extrabold text-[#03C9D7] md:text-5xl">
                  {avrgCGPA}
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Running form fill ups
                </dt>

                <dd className="text-4xl font-extrabold text-[#03C9D7] md:text-5xl">
                  {runningFormFillUp}
                </dd>
              </div>

              <div className="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center shadow-md">
                <dt className="order-last text-lg font-medium text-gray-500">
                  Total Semesters
                </dt>

                <dd className="text-4xl font-extrabold text-[#03C9D7] md:text-5xl">
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
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
