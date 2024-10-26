import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import { useStateContext } from "../contexts/ContextProvider";

const SemesterStudentsModal = ({
  handleAdd,
  handleAllow,
  semester_id,
  form_id,
  section_id,
}) => {
  const { authToken } = useStateContext();

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12;

  const totalPages = Math.ceil(students.length / studentsPerPage);
  const currentStudents = students.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const fetchStudents = async () => {
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
          return (
            x.form_id === form_id &&
            x.section === section_id &&
            x.is_added === true
          );
        });
        setStudents(curr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const [infoId, setInfoId] = useState(null);
  const changeInfo = (x) => {
    setInfoId(x);
  }

  const handleAddStudent = async (x) => {
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BASEURL}/form-fill-up-information/${x}/`,{
        is_allowed: true
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      });
      if(res.data) {
        fetchStudents();
        changeInfo(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[50%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Add Collegiate Students </p>
            </div>
            <div className="py-2">
              <button onClick={handleAllow}>
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
                      Student ID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      <div>
                        <button>Add</button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        {student.student}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        <div>
                          {student.is_allowed === false && (
                            <button className="border rounded-md border-[#03C9D7] hover:bg-[#03C9D7] px-2 py-1" onClick={() => {
                              changeInfo(student.id);
                              handleAddStudent(student.id);
                            }}>
                              Click to add
                            </button>
                          )}
                          {student.is_allowed === true && (
                            <div className="w-full flex justify-center items-center"><TiTick className="text-xl text-green-500" /></div>
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
          <div className="flex justify-center items-center">
            <button
              className="font-semibold text-[#03C9D7] hover:text-red-500 flex"
              onClick={handleAdd}
            >
              <span
                aria-hidden="true"
                className="block transition-all group-hover:ms-0.5 rtl:rotate-180 px-1"
              >
                &larr;
              </span>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SemesterStudentsModal;
