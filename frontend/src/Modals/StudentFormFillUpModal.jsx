import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick, TiCancel } from "react-icons/ti";
import { SiTicktick } from "react-icons/si";

import { useStateContext } from "../contexts/ContextProvider";

const StudentFormFillUpModal = ({ handleFill, semester_id, form_id }) => {
  const { authToken, authUserId } = useStateContext();

  const [courses, setCourses] = useState([]);
  const [student_id, setStudent_id] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const currentCourses = courses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/courses/`);
      if (res.data) {
        const curr = res.data
          .filter((x) => {
            return x.semester.id === semester_id;
          })
          .map((course) => ({
            ...course,
            all_ok: false,
            is_completed: false,
          }));
        setCourses(curr);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const get_student_id = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/theid/${authUserId}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        setStudent_id(res.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
    get_student_id();
  }, []);

  const [studentInfo, setStudentInfo] = useState([]);
  const fetchForms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/form-fill-up-information/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        const curr = res.data.filter((x) => {
          return x.form_id === form_id && x.student === student_id;
        });
        setStudentInfo(curr);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchForms();
  }, [student_id]);

  useEffect(() => {
    if (studentInfo.length > 0 && courses.length > 0) {
      const updatedCourses = courses.map((course) => {
        const sections = studentInfo.filter(
          (info) =>
            info.student === student_id &&
            info.form_id === form_id &&
            course.sections.includes(info.section)
        );
        const allSectionsOk =
          sections.length > 0 && sections.every((info) => info.is_allowed);
        const completeOk =
          sections.length > 0 && sections.every((info) => info.is_formed);

        return {
          ...course,
          all_ok: allSectionsOk,
          is_completed: completeOk,
        };
      });
      setCourses(updatedCourses);
    }
  }, [studentInfo]);

  const makeFormed = async (id) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/form-fill-up-information/${id}/`,
        { is_formed: true },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        console.log("Hoiya gese!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const changeInfo = (ok, sections) => {
    sections.forEach((section) => {
      !ok &&
        studentInfo.map((info) => {
          if (info.section === section && info.student === student_id) {
            makeFormed(info.id);
            fetchForms();
          }
        });
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[65%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Form Fill Up </p>
            </div>
            <div className="py-2">
              <button onClick={handleFill}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-gray-200">
            <div className="overflow-x-auto rounded-t-lg">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Course Code
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Course Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Type
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Credits
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      <div>
                        <button>Add Course</button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentCourses.map((course) => (
                    <tr key={course.code}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        ICE-{course.code}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.type}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.credit}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        <div>
                          {course.all_ok === true &&
                            course.is_completed === false && (
                              <button
                                className="border rounded-md border-[#03C9D7] hover:bg-[#03C9D7] px-2 py-1"
                                onClick={() => {
                                  changeInfo(
                                    course.is_completed,
                                    course.sections
                                  );
                                }}
                              >
                                Click to add
                              </button>
                            )}
                          {course.is_completed === true && (
                            <div className="w-full flex justify-center items-center">
                              <TiTick className="text-xl text-green-500" />
                            </div>
                          )}
                          {course.all_ok === false && (
                            <div className="w-full flex justify-center items-center">
                              <TiCancel className="text-xl text-red-500" />
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
              <ol className="flex justify-end gap-1 text-xs font-medium">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                  >
                    <span className="sr-only">Prev Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePageChange(index + 1)}
                      className={`block rounded border ${
                        currentPage === index + 1
                          ? "block size-8 rounded border-[#03C9D7] bg-[#03C9D7] text-center leading-8 text-white font-semibold"
                          : "block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                      } text-center leading-8`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                  >
                    <span className="sr-only">Next Page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ol>
            </div>
          </div>
          <div className="flex justify-center items-center py-3">
            <button
              className="text-md font-semibold text-gray-500 hover:text-green-500 flex justify-center items-center"
              onClick={handleFill}
            >
              <SiTicktick /> <span className="m-1">Complete</span>{" "}
              <SiTicktick />{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFormFillUpModal;
