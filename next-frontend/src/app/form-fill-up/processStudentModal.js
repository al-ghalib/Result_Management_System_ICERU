"use client";
import { useEffect, useState } from "react";

import { SiTicktick } from "react-icons/si";
import { useStateContext } from "@/contexts";
import * as actions from "@/actions";

import LOADER from "@/public/Infinity.svg";
import { toast } from "react-toastify";
import Image from "next/image";

const ProcessStudentModal = ({ handleProcess, semester_id, form_id }) => {
  const { authToken } = useStateContext();

  const [isLoading, setIsLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);

  const fetchStudents = async () => {
    const res = await actions.fetch_students();
    if(!res.error) {
      const curr = res.students.filter(
        (student) => student.semester.id === semester_id
      );
      setStudents(curr);
    } else {
      toast.error(res.msg);
    }
  };

  const fetchSections = async () => {
    const res = await actions.fetch_sections();
    if(!res.error) {
      const curr = res.sections.filter(
        (section) => section.course.semester.id === semester_id
      );
      setSections(curr);
    }
  };

  const addStudent = async (student, section) => {
    const postData = { form_id, student: student.id, section: section.id, is_added: true };
    const res = await actions.add_student_for_form_fillup_from_admin(postData, authToken);
  };

  useEffect(() => {
    fetchSections();
    fetchStudents();
  }, []);

  useEffect(() => {
    students.forEach((student) => {
      sections.forEach((section) => {
        addStudent(student, section);
      });
    });
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 4000);
  }, [students, sections]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        handleProcess();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[30%]">
        <div>
          <div className="w-full flex justify-center items-center pb-2">
            <div className="py-2">
              {isLoading ? (
                <p className="text-2xl font-semibold">Processing...</p>
              ) : (
                <p className="text-2xl font-semibold">Done</p>
              )}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            {isLoading && <Image src={LOADER} alt="loader" />}
            {!isLoading && (
              <div className="py-5">
                <SiTicktick className="text-6xl text-green-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessStudentModal;