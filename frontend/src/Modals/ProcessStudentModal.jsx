import React, { useEffect, useState } from "react";
import axios from "axios";

import { SiTicktick } from "react-icons/si";
import { useStateContext } from "../contexts/ContextProvider";
import LOADER from "../assets/Infinity.svg";

const ProcessStudentModal = ({ handleProcess, semester_id, form_id }) => {
  const { authToken } = useStateContext();

  const [isLoading, setIsLoading] = useState(true);

  const [students, setStudents] = useState([]);
  const [sections, setSections] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/students/`);
      if (res.data) {
        const curr = res.data.filter(
          (student) => student.semester.id === semester_id
        );
        setStudents(curr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSections = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/sections/`);
      if (res.data) {
        const curr = res.data.filter(
          (section) => section.course.semester.id === semester_id
        );
        setSections(curr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addStudent = async (student, section) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASEURL}/form-fill-up-information/`,
        { form_id, student: student.id, section: section.id, is_added: true },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
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
    setIsLoading(!isLoading);
  }, [students, sections]);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        handleProcess();
      }, 2000);
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
            {isLoading && <img src={LOADER} alt="loader" />}
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
