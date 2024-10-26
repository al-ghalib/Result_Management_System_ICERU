"use client";

import { useState } from "react";
import * as actions from "@/actions";
import { MdOutlineCancel } from "react-icons/md";
import { FaCircleArrowRight } from "react-icons/fa6";
import CreateTeacherModal from "./createTeacherModal";
import { toast } from "react-toastify";

const CreateUserModal = ({ handleAdd, fetchTeachers }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("Teacher");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [addTeacher, setAddTeacher] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { name, email, role, password };
    const res = await actions.create_user(postData);
    if (!res.error) {
      setUser(res.userData.user_id);
      setAddTeacher(!addTeacher);
    } else {
      toast.error(res.msg);
    }
  };

  return (
    <>
      {!addTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
            <div>
              <div className="flex justify-between items-center pb-3">
                <div className="py-2">
                  <p className="text-2xl font-semibold">Create User</p>
                </div>
                <div className="py-2">
                  <button onClick={handleAdd}>
                    <MdOutlineCancel className="text-2xl hover:text-red-500" />
                  </button>
                </div>
              </div>
              <div>
                <form action="submit" onSubmit={handleSubmit}>
                  <label
                    htmlFor="full name"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
                  >
                    <input
                      type="text"
                      id="full name"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Full Name
                    </span>
                  </label>
                  <label
                    htmlFor="email"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
                  >
                    <input
                      type="email"
                      id="email"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Email
                    </span>
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 py-2 mb-5 px-2"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled
                  >
                    <option value="">Select Role</option>
                    <option value="System Admin">System Admin</option>
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                  <label
                    htmlFor="password"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 mb-5"
                  >
                    <input
                      type="password"
                      id="password"
                      className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full py-2 px-2"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                      Password
                    </span>
                  </label>
                  <div className="w-full flex justify-center items-center">
                    <button
                      className="text-md font-semibold text-gray-500 hover:text-sky-500 flex justify-center items-center"
                      type="submit"
                    >
                      {" "}
                      <span className="mr-1">
                        Next
                      </span> <FaCircleArrowRight />{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {addTeacher && (
        <CreateTeacherModal
          handleAdd={handleAdd}
          user={user}
          fetchTeachers={fetchTeachers}
        />
      )}
    </>
  );
};

export default CreateUserModal;
