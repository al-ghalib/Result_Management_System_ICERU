import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

const AssignTeacherModal = ({ handleAdd, handleAssign, code, type }) => {
  const [id, setId] = useState(code * 10);

  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [lab, setLab] = useState(null);

  const [allTeachers, setAllTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/teachers/`);
      if (res.data) setAllTeachers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (type === "Theory") {
      try {
        const [resA, resB] = await Promise.all([
          axios.post(`${import.meta.env.VITE_BASEURL}/sections/`, {
            id: id + 1,
            course_id: code,
            section: "A",
            teacher: a,
          }),
          axios.post(`${import.meta.env.VITE_BASEURL}/sections/`, {
            id: id + 2,
            course_id: code,
            section: "B",
            teacher: b,
          }),
        ]);
        if (resA.data && resB.data) {
          handleAdd();
          handleAssign();
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (type === "Lab") {
      try {
        const [resA, resB] = await Promise.all([
          axios.post(`${import.meta.env.VITE_BASEURL}/sections/`, {
            id,
            course_id: code,
            section: "LAB",
            teacher: lab,
          }),
        ]);
        if (resA.data && resB.data) {
          handleAdd();
          handleAssign();
        }
      } catch (error) {
        console.error(error);
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
            <p>nnsdlndscldsldsk</p>
          </div>

          <div>
            {type === "Theory" && (
              <form action="submit" onSubmit={handleSubmit}>
                <select
                  name="teacher"
                  id="teacher"
                  className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] py-2 mb-5 px-2 outline-none"
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
                  className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] py-2 mb-5 px-2 outline-none"
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
                  className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] py-2 mb-5 px-2 outline-none"
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
