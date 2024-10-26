"use client";

import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

import * as actions from "@/actions";
import { toast } from "react-toastify";

const AssignTeacherModal = ({ handleAdd, handleAssign, code, type , fetchCourses}) => {
  const [id, setId] = useState(code * 10);

  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [lab, setLab] = useState(null);

  const [allTeachers, setAllTeachers] = useState([]);

  const fetchTeachers = async () => {
    const res = await actions.fetch_teachers();
    if(!res.error) {
      setAllTeachers(res.teachers);
    } else {
      toast.error(res.msg);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Theory") {
      const postData_section_A = {
        id: id + 1,
        course_id: code,
        section: "A",
        teacher: a,
      };
      const postData_section_B = {
        id: id + 2,
        course_id: code,
        section: "B",
        teacher: b,
      };
      const res = await actions.assign_teachers_in_theory(
        postData_section_A,
        postData_section_B
      );
      if (!res.error) {
        toast.success(res.msg);
        fetchCourses();
        handleAdd();
        handleAssign();
      } else {
        toast.error(res.msg);
      }
    }
    if (type === "Lab") {
      const postData_lab = {
        id,
        course_id: code,
        section: "LAB",
        teacher: lab,
      }
      const res = await actions.assign_teachers_in_lab(postData_lab);
      if (!res.error) {
        toast.success(res.msg);
        fetchCourses();
        handleAdd();
        handleAssign();
      } else {
        toast.error(res.msg);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Assign Teachers</p>
            </div>
            <div className="py-2">
              <button onClick={handleAdd}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>

          <div>
            {type === "Theory" && (
              <form action="submit" onSubmit={handleSubmit}>
                <select
                  name="teacher"
                  id="teacher"
                  className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2 outline-none"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                >
                  <option value={null}>Select Teacher</option>
                  {allTeachers.map((teacher) => (
                    <option value={teacher.id} key={teacher.id}>
                      {teacher.user.name} | ID-{teacher.id}
                    </option>
                  ))}
                </select>
                <select
                  name="teacher"
                  id="teacher"
                  className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2 outline-none"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                >
                  <option value={null}>Select Teacher</option>
                  {allTeachers.map((teacher) => (
                    <option value={teacher.id} key={teacher.id}>
                      {teacher.user.name} | ID-{teacher.id}
                    </option>
                  ))}
                </select>
                <div className="w-full flex justify-center items-center">
                  <button
                    className="text-md font-semibold text-gray-500 hover:text-green-500 flex justify-center items-center"
                    type="submit"
                  >
                    <SiTicktick /> <span className="m-1">Assign</span>{" "}
                    <SiTicktick />{" "}
                  </button>
                </div>
              </form>
            )}
            {type != "Theory" && (
              <form action="submit" onSubmit={handleSubmit}>
                <select
                  name="teacher"
                  id="teacher"
                  className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2 outline-none"
                  value={lab}
                  onChange={(e) => setLab(e.target.value)}
                >
                  <option value={null}>Select Teacher</option>
                  {allTeachers.map((teacher) => (
                    <option value={teacher.id} key={teacher.id}>
                      {teacher.user.name} | ID-{teacher.id}
                    </option>
                  ))}
                </select>
                <div className="w-full flex justify-center items-center">
                  <button
                    className="text-md font-semibold text-gray-500 hover:text-green-500 flex justify-center items-center"
                    type="submit"
                  >
                    <SiTicktick /> <span className="m-1">Assign</span>{" "}
                    <SiTicktick />{" "}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTeacherModal;
