"use client";

import { useStateContext } from "@/contexts";
import { FiLogOut } from "react-icons/fi";
import BookGIF from "@/public/book.gif";
import Image from "next/image";
import * as actions from "@/actions";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { authEmail, authName, authToken, handleLogOut, authRole } =
    useStateContext();
  const [userMenu, setUserMenu] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // Track mobile menu state

  const handleLogoutClick = () => {
    handleLogOut();
  };

  useEffect(() => {
    if (!authEmail) actions.To_login_page();
  }, [authEmail]);

  return (
    <>
      {authEmail && (
        <header className="bg-white shadow-md">
          <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <button
              className="block text-teal-600"
              onClick={() => {
                setUserMenu(false);
                actions.To_home_page();
              }}
            >
              <span className="sr-only">Home</span>
              <Image src={BookGIF} width={40} height={50} />
            </button>

            <div className="flex flex-1 items-center justify-end md:justify-between">
              {/* Desktop Nav */}
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li className="relative">
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => setUserMenu(!userMenu)}
                    >
                      {" "}
                      Users{" "}
                    </button>
                    {userMenu && (
                      <div
                        className="absolute end-0 z-10 mt-2 w-auto rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                      >
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setUserMenu(!userMenu);
                              actions.To_students_page();
                            }}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                            role="menuitem"
                          >
                            Students
                          </button>

                          <button
                            onClick={() => {
                              setUserMenu(!userMenu);
                              actions.To_teachers_page();
                            }}
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 w-full"
                            role="menuitem"
                          >
                            Teachers
                          </button>
                        </div>
                      </div>
                    )}
                  </li>

                  <li>
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => {
                        setUserMenu(false);
                        actions.To_courses_page();
                      }}
                    >
                      {" "}
                      Courses{" "}
                    </button>
                  </li>

                  <li>
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => {
                        setUserMenu(false);
                        actions.To_form_fillup_page();
                      }}
                    >
                      {" "}
                      FormFillup{" "}
                    </button>
                  </li>

                  {authRole === "Teacher" && (
                    <li>
                      <button
                        className="text-gray-500 transition hover:text-gray-500/75"
                        onClick={() => {
                          setUserMenu(false);
                          actions.To_marking_page();
                        }}
                      >
                        {" "}
                        Marking{" "}
                      </button>
                    </li>
                  )}

                  <li>
                    <button
                      className="text-gray-500 transition hover:text-gray-500/75"
                      onClick={() => {
                        setUserMenu(false);
                        actions.To_result_page();
                      }}
                    >
                      {" "}
                      Result{" "}
                    </button>
                  </li>

                  {authRole === "System Admin" && (
                    <li>
                      <a
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href={`${process.env.NEXT_PUBLIC_BASEURL}/admin/`}
                      >
                        {" "}
                        Admin{" "}
                      </a>
                    </li>
                  )}
                </ul>
              </nav>

              {/* Mobile Toggle Button */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                  <button
                    className="hover:bg-sky-500 text-gray-400 hover:text-white  px-2 rounded-md"
                    onClick={() => {
                      setUserMenu(false);
                      actions.To_profile_page();
                    }}
                  >
                    <span className="text-14">Hi,</span>{" "}
                    <span className="font-bold ml-1 text-14">{authName}</span>
                  </button>
                  <button className="px-4" onClick={handleLogoutClick}>
                    <FiLogOut className="font-semibold text-gray-500 hover:text-red-500 hover:font-bold text-xl" />
                  </button>
                </div>

                {/* Toggle Button */}
                <button
                  className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                  onClick={() => setIsNavOpen(!isNavOpen)} // Toggle mobile menu
                >
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Mobile Dropdown Modal */}
              {isNavOpen && (
                <div className="absolute top-16 right-4 z-20 w-64 bg-white border border-gray-200 shadow-lg rounded-md">
                  <ul className="space-y-1 p-2">
                    <li>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                          className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          <span className="text-sm font-medium"> Users </span>
                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          <li>
                            <button
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                              onClick={() => {
                                actions.To_students_page();
                                setIsNavOpen(false);
                              }}
                            >
                              Students
                            </button>
                          </li>

                          <li>
                            <button
                              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                              onClick={() => {
                                actions.To_teachers_page();
                                setIsNavOpen(false);
                              }}
                            >
                              Teachers
                            </button>
                          </li>
                        </ul>
                      </details>
                    </li>
                    <li>
                      <button
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => {
                          actions.To_courses_page();
                          setIsNavOpen(false)
                        }}
                      >
                        Courses
                      </button>
                    </li>
                    <li>
                      <button
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => {
                          actions.To_result_page();
                          setIsNavOpen(false)
                        }}
                      >
                        Results
                      </button>
                    </li>
                    <li>
                      <button
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        onClick={() => {
                          actions.To_form_fillup_page();
                          setIsNavOpen(false)
                        }}
                      >
                        Form fill up
                      </button>
                    </li>
                    { authRole === "System Admin" && <li>
                      <a
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        href={`${process.env.NEXT_PUBLIC_BASEURL}/admin/`}
                      >
                        Admin
                      </a>
                    </li>}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Navbar;