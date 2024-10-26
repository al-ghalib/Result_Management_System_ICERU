"use client";

import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import AssignTeacherModal from "./assignTeacherModal";

import * as actions from "@/actions";
import { toast } from "react-toastify";

const CreateCourseModal = ({ handleAdd, fetchCourses }) => {
  const [semester_id, setSemester_id] = useState(null);
  const [department_id, setDepartment_id] = useState(null);

  const [assigning, setAssigning] = useState(false);
  const handleAssign = () => {
    setAssigning(!assigning);
  };

  const [allSemesters, setAllSemesters] = useState([]);
  const [allDept, setAllDept] = useState([]);
  const [allType, setAllType] = useState([
    "Lab",
    "Theory",
    "Thesis",
    "Project",
    "Viva",
  ]);

  const [code, setCode] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [credit, setCredit] = useState(null);

  const fetchData = async () => {
    const res = await actions.fetch_semesters_and_departments();
    if (!res.error) {
      setAllSemesters(res.semesters);
      setAllDept(res.departments);
    } else {
      toast.error(res.msg);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { department_id, semester_id, code, credit, title, type };
    const res = await actions.create_courses(postData);
    if (!res.error) {
      toast.success(res.msg);
      handleAssign();
      fetchCourses();
    } else {
      toast.error(res.msg);
    }
  };
  return (
    <>
      {!assigning && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
            <div>
              <div className="flex justify-between items-center pb-3">
                <div className="py-2">
                  <p className="text-2xl font-semibold">Create Course</p>
                </div>
                <div className="py-2">
                  <button onClick={handleAdd}>
                    <MdOutlineCancel className="text-2xl hover:text-red-500" />
                  </button>
                </div>
              </div>
              <div>
                <form action="submit" onSubmit={handleSubmit}>
                  <select
                    name="semester"
                    id="semester"
                    className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2 outline-none"
                    value={semester_id}
                    onChange={(e) => setSemester_id(e.target.value)}
                  >
                    <option value={null}>Select Semester</option>
                    {allSemesters.map((sem) => (
                      <option value={sem.id} key={sem.id}>
                        Year-{sem.year} {sem.name} Semester
                      </option>
                    ))}
                  </select>
                  <select
                    name="department"
                    id="department"
                    className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2 outline-none"
                    value={department_id}
                    onChange={(e) => setDepartment_id(e.target.value)}
                  >
                    <option value={null}>Select Department</option>
                    {allDept.map((dept) => (
                      <option value={dept.id} key={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="Course Code"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
                  >
                    <input
                      type="number"
                      id="Course Code"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Course Code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Course Code
                    </span>
                  </label>
                  <label
                    htmlFor="title"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
                  >
                    <input
                      type="text"
                      id="title"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Title
                    </span>
                  </label>

                  <select
                    name="department"
                    id="department"
                    className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2 outline-none"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value={null}>Select Type</option>
                    {allType.map((t) => (
                      <option value={t} key={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="Credit"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
                  >
                    <input
                      type="number"
                      id="Credit"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Credit"
                      value={credit}
                      onChange={(e) => setCredit(e.target.value)}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Credit
                    </span>
                  </label>
                  <div className="w-full flex justify-center items-center">
                    <button
                      className="text-md font-semibold text-gray-500 hover:text-green-500 flex justify-center items-center"
                      type="submit"
                    >
                      <SiTicktick /> <span className="m-1">Create</span>{" "}
                      <SiTicktick />{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {assigning && (
        <AssignTeacherModal
          handleAdd={handleAdd}
          handleAssign={handleAssign}
          code={code}
          type={type}
          fetchCourses={fetchCourses}
        />
      )}
    </>
  );
};

export default CreateCourseModal;
