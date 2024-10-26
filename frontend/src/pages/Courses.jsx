import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { SearchIt } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import CreateCourseModal from "../Modals/CreateCourseModal";

const Courses = () => {
  const { authRole } = useStateContext();

  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  const [adding, setAdding] = useState(false);
  const handleAdd = () => {
    setAdding(!adding);
  };

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
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/courses`
      );
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="m-2 md:m-8 mt-24 p-2 md:px-10 md:py-5 bg-white rounded-3xl h-[90%]">
      {adding && (
        <CreateCourseModal handleAdd={handleAdd} fetchCourses={fetchCourses} />
      )}
      <div className="flex flex-row justify-between">
        {/* Header */}
        <div className="pb-3">
          <p className="text-3xl font-semibold">All courses</p>
        </div>
        <div className=" flex justify-center items-center pb-3">
          {!adding && (
            <div className="mr-1">
              <SearchIt />
            </div>
          )}
          <div>
            {authRole === "System Admin" && (
              <button
                className="flex justify-center items-center rounded bg-[#03C9D7] px-5 py-1 text-md font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#03C9D7]"
                onClick={handleAdd}
              >
                <span className="font-bold pr-2">
                  <IoMdAdd />
                </span>
                Add course
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
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
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Sections
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentCourses.map((course) => (
                <tr key={course.code}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {course.code}
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
                    {course.semester.year}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {course.semester.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    <ul>
                      {course.sections.map((x) => (
                        <li className="py-1">
                          <span className="font-semibold px-1">
                            {x.section}:{" "}
                          </span>
                          {x.teacher.user.name}
                        </li>
                      ))}
                    </ul>
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
  );
};

export default Courses;
