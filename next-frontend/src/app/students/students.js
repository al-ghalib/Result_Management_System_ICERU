"use client";

import { useEffect, useState } from "react";
import SearchIt from './searchIt';
import CreateUserModal from "./createUserModal";
import * as actions from "@/actions";
import { useStateContext } from "@/contexts";
import { toast } from "react-toastify";


const Students = () => {
  const { authRole } = useStateContext();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const studentsPerPage = 12;
  const [adding, setAdding] = useState(false);

  const handleAdd = () => {
    setAdding(!adding);
  };

  const fetchStudents = async () => {
    const res = await actions.fetch_students();
    if (!res.error) {
      setStudents(res.students);
    } else {
      toast.error(res.msg);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const { id, session, user: { name, email } } = student;

    return (
      id.toString().toLowerCase().includes(searchQuery.toLowerCase()) || 
      name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      session.toLowerCase().includes(searchQuery.toLowerCase()) || 
      email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="m-2 md:m-8 mt-24 p-2 md:px-10 md:py-5 bg-white rounded-3xl">
      {adding && <CreateUserModal handleAdd={handleAdd} fetchStudents={fetchStudents} />}
      
      <div className="flex flex-row justify-between">
        {/* Header */}
        <div className="pb-3">
          <p className="text-3xl font-semibold">All Students</p>
        </div>
        <div className="flex justify-center items-center pb-3">
          {!adding && (
            <div className="mr-1">
              <SearchIt searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
          )}
          <div>
            {authRole === "System Admin" && (
              <button
                className="flex justify-center items-center rounded bg-sky-500 px-5 py-2 text-md font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring active:bg-sky-500"
                onClick={handleAdd}
              >
                Add Student
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
                  Student ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Session
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentStudents.map((student) => (
                <tr key={student.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {student.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {student.user.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {student.session}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                    {student.user.email}
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
                      ? "block size-8 rounded border-sky-500 bg-sky-500 text-center leading-8 text-white"
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

export default Students;
