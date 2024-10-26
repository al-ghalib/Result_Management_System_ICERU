"use client";

import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { useStateContext } from "@/contexts";
import * as actions from "@/actions";

const CourseViewModal = ({ handleShow }) => {
  const { authUserId } = useStateContext();

  const [teacher_id, setTeacher_id] = useState(null);
  const [info, setInfo] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const totalPages = Math.ceil(info.length / coursesPerPage);
  const currentCourses = info.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getTeacher_id = async () => {
    const res = await actions.get_teacher_id(authUserId);
    if(!res.error) {
        setTeacher_id(res.teacher_id);
    }
  };

  useEffect(() => {
    getTeacher_id();
  }, []);

  const teacherData = async () => {
    const res = await actions.fetch_teacher_info(teacher_id);
    if(!res.error) {
        setInfo(res.info.assigned_sections);
    }
  };

  useEffect(() => {
    teacherData();
  }, [teacher_id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center pb-4">
      <div className="bg-white py-5 px-8 rounded-xl w-[70%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Assigned Courses</p>
            </div>
            <div className="py-2">
              <button onClick={handleShow}>
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
                      Title
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Section
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Type
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Credits
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Year ID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Semester
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentCourses.map((course) => (
                    <tr key={course.course.code}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        {course.course.code}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.course.title}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.section}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.course.type}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.course.credit}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.course.semester.year}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        {course.course.semester.name}
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
        </div>
      </div>
    </div>
  );
};

export default CourseViewModal;