import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import { useStateContext } from "../contexts/ContextProvider";

const MarkingModal = ({
  handleAdd,
  handleSelection,
  semester_id,
  form_id,
  section_id,
}) => {
  const { authToken } = useStateContext();

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

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
            x.is_added === true &&
            x.is_allowed === true &&
            x.is_formed === true
          );
        });
        setStudents(curr);
        const initialMarks = {};
        curr.forEach((student) => {
          initialMarks[student.student] = {
            final_marks: (parseFloat(student.final_marks) === 0.00 ? null : parseFloat(student.final_marks)),
            ct_marks: (parseFloat(student.ct_marks) === 0.00 ? null : parseFloat(student.ct_marks)),
            attend_marks: (parseFloat(student.attend_marks) === 0.00 ? null : parseFloat(student.attend_marks)),
          };
        });
        setMarks(initialMarks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleMarksChange = (studentId, field, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: {
        ...prevMarks[studentId],
        [field]: value,
      },
    }));
  };

  const handleAddStudent = async (studentId) => {
    //console.log({ ...marks[studentId] });
    const theStudent = students.filter((student) => {
      return student.student === studentId;
    });
    
    const X = { ...marks[studentId] };
    if(X.final_marks === null || X.attend_marks === null || X.ct_marks === null) {
      console.log("All fields required");
      return;
    }
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/form-fill-up-information/${theStudent[0].id}/`,
        {
          is_marks_added: true,
          ...marks[studentId],
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        fetchStudents();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[70%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Add Student's Marks </p>
            </div>
            <div className="py-2">
              <button onClick={handleSelection}>
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
                      Final Exam Marks
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Class Test Marks
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Attendance Marks
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      Add
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentStudents.map((student) => (
                    <tr key={student.student}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        {student.student}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        <label
                          htmlFor={`final-${student.student}`}
                          className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7]"
                        >
                          <input
                            type="number"
                            id={`final-${student.student}`}
                            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2"
                            placeholder="Final Exam Marks"
                            value={marks[student.student]?.final_marks || ""}
                            onChange={(e) =>
                              handleMarksChange(
                                student.student,
                                "final_marks",
                                e.target.value
                              )
                            }
                          />

                          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Final Exam Marks
                          </span>
                        </label>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        <label
                          htmlFor={`ct-${student.student}`}
                          className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7]"
                        >
                          <input
                            type="number"
                            id={`ct-${student.student}`}
                            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2"
                            placeholder="Class Test Marks"
                            value={marks[student.student]?.ct_marks || ""}
                            onChange={(e) =>
                              handleMarksChange(
                                student.student,
                                "ct_marks",
                                e.target.value
                              )
                            }
                          />

                          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Class Test Marks
                          </span>
                        </label>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        <label
                          htmlFor={`attendance-${student.student}`}
                          className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7]"
                        >
                          <input
                            type="number"
                            id={`attendance-${student.student}`}
                            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2"
                            placeholder="Attendance Marks"
                            value={marks[student.student]?.attend_marks || ""}
                            onChange={(e) =>
                              handleMarksChange(
                                student.student,
                                "attend_marks",
                                e.target.value
                              )
                            }
                          />

                          <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                            Attendance Marks
                          </span>
                        </label>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                        <div>
                          {student.is_marks_added === false && (
                            <button
                              className="border rounded-md border-[#03C9D7] hover:bg-[#03C9D7] px-2 py-1"
                              onClick={() => handleAddStudent(student.student)}
                            >
                              Click to add
                            </button>
                          )}
                          {student.is_marks_added === true && (
                            <div className="inline-block rounded-full border border-green-500 p-1">
                              <TiTick className="text-xl text-green-500" />
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

export default MarkingModal;
