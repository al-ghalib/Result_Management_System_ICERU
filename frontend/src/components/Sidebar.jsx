import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdSpaceDashboard, MdOutlineCancel } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { IoMdContacts } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher, FaLandmark  } from "react-icons/fa";
import { SiGoogleforms,SiCoursera } from "react-icons/si";

import { useStateContext } from "../contexts/ContextProvider";

const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        role: ["System Admin", "Student", "Teacher"],
        icon: <MdSpaceDashboard />,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "profile",
        role: ["System Admin", "Student", "Teacher"],
        icon: <ImProfile />,
      },
      {
        name: "users",
        role: ["System Admin", "Student", "Teacher"],
        icon: <IoMdContacts />,
      },
      {
        name: "students",
        role: ["System Admin", "Student", "Teacher"],
        icon: <PiStudentBold />,
      },
      {
        name: "teachers",
        role: ["System Admin", "Student", "Teacher"],
        icon: <FaChalkboardTeacher />,
      },
      {
        name: "courses",
        role: ["System Admin", "Student", "Teacher"],
        icon: <SiCoursera />,
      },
      {
        name: "form-fill-up",
        role: ["System Admin", "Student", "Teacher"],
        icon: <SiGoogleforms />,
      },
      {
        name: "marking",
        role: ["Teacher"],
        icon: <IoSettingsSharp />,
      },
      {
        name: "result",
        role: ["System Admin","Teacher", "Student"],
        icon: <FaLandmark />,
      },
    ],
  },
];

const currentColor = "#03C9D7";

const Sidebar = () => {
  //const navigate = useNavigate();
  const { authRole, activeMenu, setActiveMenu, handleLogOut } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined) {
      //setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-semiabold tracking-tight text-slate-900"
            >
              <FaBookOpenReader className="text-[#03C9D7]" />{" "}
              <span>Result Management</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
            <div>
              {links.map((item) => (
                <div key={item.title}>
                  <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                    {item.title}
                  </p>
                  {item.links.map(
                    (link) =>
                      link.role.find((id) => id === authRole) && (
                        <NavLink
                          to={`/${link.name}`}
                          key={link.name}
                          onClick={handleCloseSideBar}
                          style={({ isActive }) => ({
                            backgroundColor: isActive ? currentColor : "",
                          })}
                          className={({ isActive }) =>
                            isActive ? activeLink : normalLink
                          }
                        >
                          {link.icon}
                          <span className="capitalize ">{link.name}</span>
                        </NavLink>
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
