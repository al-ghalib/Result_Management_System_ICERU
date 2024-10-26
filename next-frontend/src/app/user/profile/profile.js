"use client";

import { useEffect, useState } from "react";

import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";

import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
import CourseViewModal from "./courseViewModal";

const Profile = () => {
  const { authToken, authUserId, authRole, authName } = useStateContext();
  const [user, setUser] = useState([]);
  const [dept, setDept] = useState("");

  const [showing, setShowing] = useState(false);
  const handleShow = () => {
    setShowing(!showing);
  };

  const setUpStudent = (data) => {
    setDept(data.department.name);
    setUser([
      { label: "Full Name", value: data.user.name },
      { label: "Email", value: data.user.email },
      { label: "Student ID", value: data.id },
      { label: "HSC Reg.", value: data.reg },
      { label: "Hall", value: data.hall.name },
      { label: "Birthdate", value: data.birthdate },
      { label: "Blood Group", value: data.blood_group },
      { label: "Session", value: data.session },
      {
        label: "Year & Semester",
        value: `Year ${data.semester.year} & ${data.semester.name} Semester`,
      },
    ]);
  };

  const setUpTeacher = (data) => {
    setDept(data.department.name);
    setUser([
      { label: "Full Name", value: data.user.name },
      { label: "Email", value: data.user.email },
      { label: "Teacher ID", value: data.id },
      { label: "Birthdate", value: data.birthdate },
      { label: "Blood Group", value: data.blood_group },
      { label: "Rank", value: data.rank },
    ]);
  };
  const setUpAdmin = (data) => {
    setDept("System Admin");
    setUser([
      { label: "Full Name", value: data.name },
      { label: "Email", value: data.email },
      { label: "Admin ID", value: data.id },
    ]);
  };

  const fetchUser = async (id) => {
    if (authRole === "Teacher") {
      const res = await actions.fetch_teacher_info(id);
      if (!res.error) {
        setUpTeacher(res.info);
      }
    } else if (authRole === "Student") {
      const res = await actions.fetch_student_info(id);
      if (!res.error) {
        setUpStudent(res.info);
      }
    } else {
      const res = await actions.fetch_user_profile_data(authToken);
      if (!res.error) {
        setUpAdmin(res.info);
      }
    }
  };

  const getId = async () => {
    if (authRole === "System Admin") {
      fetchUser(null);
      return;
    }
    const res = await actions.get_teacher_id(authUserId);
    if (!res.error) {
      fetchUser(res.teacher_id);
    }
  };

  useEffect(() => {
    getId();
  }, []);

  return (
    <div className="m-2 md:m-8 mt-24 bg-white rounded-3xl h-[90%]">
      {showing && <CourseViewModal handleShow={handleShow} />}
      <div className="w-full h-full rounded-3xl ">
        <div className="container mx-auto p-3 flex flex-col justify-center items-center w-full">
          <div className="col-md-4 mb-3 w-full md:w-1/3">
            <div className="card bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="card-body p-4">
                <div className="d-flex flex-col items-center text-center">
                  <div className="flex w-full justify-center items-center">
                    {authRole === "Student" && (
                      <PiStudentBold className="text-xl" />
                    )}
                    {authRole === "Teacher" && (
                      <FaChalkboardTeacher className="text-xl" />
                    )}
                    {authRole === "System Admin" && (
                      <RiAdminFill className="text-xl" />
                    )}
                  </div>
                  <div className="mt-3">
                    <h4 className="text-xl font-semibold">{authName}</h4>
                    <p className="text-gray-500 mb-1">{dept}</p>
                    <p className="text-gray-400 text-sm">
                      University of Rajshahi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3 bg-white rounded-lg overflow-hidden w-[70%]">
            <div className="card-body p-4">
              {user.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-start items-center mb-4 border-b-2 border-gray-200 pb-2"
                >
                  <div className="w-[40%]">
                    <h6 className="mb-0 text-gray-700">{item.label}</h6>
                  </div>
                  <div className="w-[60%] text-secondary">{item.value}</div>
                </div>
              ))}
              {authRole === "Teacher" && (
                <div className="w-full flex justify-center items-center pt-4">
                  <button
                    className="flex justify-center items-center rounded bg-sky-500 px-5 py-2 text-md font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring active:bg-sky-500"
                    onClick={handleShow}
                  >
                    Your Assigned Courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
