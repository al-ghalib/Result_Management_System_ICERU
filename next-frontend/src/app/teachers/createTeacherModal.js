"use client";

import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import * as actions from "@/actions"
import { toast } from "react-toastify";

const CreateTeacherModal = ({ handleAdd, user, fetchTeachers }) => {
  const [id, setId] = useState("");
  const [department, setDepartment] = useState(77);
  const [blood_group, setBlood_group] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [rank, setRank] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      id,
      user,
      department,
      blood_group,
      phone_number,
      rank,
      gender,
      birthdate,
    };
    const res = await actions.create_teachers(postData);
    if (!res.error) {
      toast.success(res.msg);
      fetchTeachers();
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
              <p className="text-2xl font-semibold">Teacher Details</p>
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
                htmlFor="Teacher ID"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] mb-5"
              >
                <input
                  type="number"
                  id="Teacher ID"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="Teacher ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Teacher ID
                </span>
              </label>
              <label
                htmlFor="Department ID"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] mb-5"
              >
                <input
                  type="number"
                  id="Department ID"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="Department ID"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Department ID
                </span>
              </label>

              <label
                htmlFor="Rank"
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] mb-5"
              >
                <input
                  type="text"
                  id="Rank"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                  placeholder="Rank"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                  Rank
                </span>
              </label>

              <select
                name="blood_group"
                id="blood_group"
                className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] py-2 mb-5 px-2"
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
                className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] py-2 mb-5 px-2"
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
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] mb-5"
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
                className="mb-5 block w-full rounded-md border border-gray-200 shadow-sm focus:border-[#03C9D7] focus:ring-1 focus:ring-[#03C9D7] py-2 px-2"
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

export default CreateTeacherModal;
