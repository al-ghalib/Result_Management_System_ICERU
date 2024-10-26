"use client";

import React, { act, useEffect, useState } from "react";
import * as actions from "@/actions";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { toast } from "react-toastify";

const CreateStudentModal = ({ handleAdd, user, fetchStudents }) => {
  const [id, setId] = useState(null);
  const [reg, setReg] = useState(null);
  const [department, setDepartment] = useState(77);
  const [blood_group, setBlood_group] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [allHalls, setAllHalls] = useState([""]);
  const [hall, setHall] = useState(null);

  const [session, setSession] = useState("");
  const [semester, setSemester] = useState(11);
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const fetchHalls = async () => {
    const res = await actions.fetch_halls();
    if (!res.error) {
      setAllHalls(res.halls);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      id,
      reg,
      user,
      department,
      blood_group,
      phone_number,
      hall,
      semester,
      session,
      gender,
      birthdate,
    };
    const res = await actions.create_students(postData);
    if (!res.error) {
      toast.success(res.msg);
      fetchStudents();
      handleAdd();
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Student Details</p>
            </div>
            <div className="py-2">
              <button onClick={handleAdd}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>
          <div>
            <form action="#" onSubmit={handleSubmit}>
              <label
                htmlFor="Student ID"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
              >
                <input
                  type="number"
                  id="Student ID"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="Student ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Student ID
                </span>
              </label>

              <label
                htmlFor="HSC Reg. No."
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
              >
                <input
                  type="number"
                  id="HSC Reg. No."
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="HSC Reg. No."
                  value={reg}
                  onChange={(e) => setReg(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  HSC Reg. No.
                </span>
              </label>

              <select
                name="hall"
                id="hall"
                className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2"
                value={hall}
                onChange={(e) => setHall(e.target.value)}
              >
                <option value={null}>Assigned Hall</option>
                {allHalls.map((hall) => (
                    <option value={hall.id} key={hall.id}>
                      {hall.name}
                    </option>
                ))}
              </select>

              <label
                htmlFor="Session"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
              >
                <input
                  type="text"
                  id="Session"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="Session"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Session
                </span>
              </label>

              <select
                name="blood_group"
                id="blood_group"
                className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2"
                value={blood_group}
                onChange={(e) => setBlood_group(e.target.value)}
              >
                <option value="">Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <select
                name="gender"
                id="gender"
                className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <label
                htmlFor="phone_number"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
              >
                <input
                  type="text"
                  id="phone_number"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="Phone Number"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Phone Number
                </span>
              </label>

              <input
                type="date"
                name="birthdate"
                className="mb-5 block w-full rounded-md border border-gray-200 shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 py-2 px-2"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
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
  );
};

export default CreateStudentModal;
