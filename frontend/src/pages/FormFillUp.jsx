import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import { IoMdAdd } from "react-icons/io";
import { IoNotificationsOff } from "react-icons/io5";

import { useStateContext } from "../contexts/ContextProvider";
import CreateNoticeModal from "../Modals/CreateNoticeModal";
import ProcessStudentModal from "../Modals/ProcessStudentModal";
import AllowStudentModal from "../Modals/AllowStudentModal";
import StudentFormFillUpModal from "../Modals/StudentFormFillUpModal";

const DateTimeDisplay = ({ dateTimeString }) => {
  const dateObj = new Date(dateTimeString);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  return (
    <span>
      {date} {time}
    </span>
  );
};

const FormFillUp = () => {
  const navigate = useNavigate();
  const { authToken, authRole } = useStateContext();
  const [notices, setNotices] = useState([]);
  const [cnt, setCnt] = useState(0);

  const [adding, setAdding] = useState(false);
  const handleAdd = () => {
    setAdding(!adding);
  };

  const [processing, setProcessing] = useState(false);
  const handleProcess = () => {
    setProcessing(!processing);
  };

  const [allowing, setAllowing] = useState(false);
  const handleAllow = () => {
    setAllowing(!allowing);
  };

  const [filling, setFilling] = useState(false);
  const handleFill = () => {
    setFilling(!filling);
  }

  const [semester_id, setSemester_id] = useState(null);
  const [form_id, setForm_id] = useState(null);

  const handleChange = (x, y) => {
    setSemester_id(x);
    setForm_id(y);
  };

  const fetchForms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/form-fill-ups/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        const data = res.data;
        setNotices(data);
      } else {
        console.log("Something is wrong!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    notices.forEach((x) => x.is_expired === false && setCnt(cnt + 1));
  },[notices])

  return (
    <div className="m-2 md:m-8 mt-24 p-2 md:px-10 md:py-5 bg-white rounded-3xl h-[90%]">
      {adding && <CreateNoticeModal handleAdd={handleAdd} />}
      {processing && (
        <ProcessStudentModal
          handleProcess={handleProcess}
          semester_id={semester_id}
          form_id={form_id}
        />
      )}
      {allowing && (
        <AllowStudentModal
          handleAllow={handleAllow}
          semester_id={semester_id}
          form_id={form_id}
        />
      )}
      {
        filling && <StudentFormFillUpModal handleFill={handleFill} semester_id={semester_id} form_id={form_id}/>
      }
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-semibold">All Notices</p>
        </div>
        <div className="px-1">
          {authRole === "System Admin" && (
            <button
              className="flex justify-center items-center rounded bg-[#03C9D7] px-5 py-1 text-md font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#03C9D7]"
              onClick={handleAdd}
            >
              <span className="font-bold pr-2">
                <IoMdAdd />
              </span>
              Add Notice
            </button>
          )}
        </div>
      </div>
      <div>
        {notices.map(
          (notice) =>
            !notice.is_expired && (
              <article
                className="rounded-xl bg-white p-4 ring ring-[#03C9D7] sm:p-6 lg:p-8 my-5"
                key={notice.id}
              >
                <div className="flex items-start sm:gap-8">
                  <div
                    className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-[#03C9D7]"
                    aria-hidden="true"
                  >
                    <div className="flex items-center gap-1">
                      <span className="h-8 w-0.5 rounded-full bg-[#03C9D7]"></span>
                      <span className="h-6 w-0.5 rounded-full bg-[#03C9D7]"></span>
                      <span className="h-4 w-0.5 rounded-full bg-[#03C9D7]"></span>
                      <span className="h-6 w-0.5 rounded-full bg-[#03C9D7]"></span>
                      <span className="h-8 w-0.5 rounded-full bg-[#03C9D7]"></span>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="rounded border border-[#03C9D7] bg-[#03C9D7] px-3 py-1.5 text-[10px] font-medium text-white mr-2">
                          Notice ID #{notice.id}
                        </strong>
                        {authRole === "System Admin" &&
                          new Date() < new Date(notice.start_time) && (
                            <button
                              className="rounded border border-[#03C9D7] hover:bg-[#03C9D7] px-3 py-1.5 text-[10px] font-medium hover:text-white mr-2"
                              onClick={() => {
                                handleProcess();
                                handleChange(notice.semester, notice.id);
                              }}
                            >
                              Pre-process Students
                            </button>
                          )}
                      </div>
                      <div>
                        {authRole === "Student" &&
                          new Date() >= new Date(notice.start_time) &&
                          new Date() <= new Date(notice.end_time) && (
                            <button className="rounded border border-[#03C9D7] hover:bg-[#03C9D7] px-3 py-1.5 text-[10px] font-medium hover:text-white mr-2" onClick={() => {
                              handleFill();
                              handleChange(notice.semester, notice.id);
                            }}>
                              Form Fill Up
                            </button>
                          )}
                        {authRole === "Teacher" &&
                          new Date() < new Date(notice.start_time) && (
                            <button
                              className="rounded border border-[#03C9D7] hover:bg-[#03C9D7] px-3 py-1.5 text-[10px] font-medium hover:text-white mr-2"
                              onClick={() => {
                                handleAllow();
                                handleChange(notice.semester, notice.id);
                              }}
                            >
                              Add Collegites
                            </button>
                          )}
                      </div>
                    </div>

                    <h3 className="mt-4 text-lg font-medium sm:text-xl">
                      <p> {notice.title} </p>
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">
                      {notice.description}
                    </p>

                    <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>

                        <p className="text-xs font-medium">
                          Starts at{" "}
                          <DateTimeDisplay dateTimeString={notice.start_time} />
                        </p>
                      </div>

                      <span className="hidden sm:block" aria-hidden="true">
                        &middot;
                      </span>

                      <div className="flex items-center gap-1 text-gray-500">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>

                        <p className="text-xs font-medium">
                          Ends at{" "}
                          <DateTimeDisplay dateTimeString={notice.end_time} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
        )}
        {cnt === 0 && (
          <div className="w-full h-full flex justify-center items-center py-40">
            <div className="flex-col justify-center items-center">
              <div className="flex justify-center items-center">
                <IoNotificationsOff className="text-8xl text-[#03C9D7]" />
              </div>
              <p className="font-semibold text-xl text-gray-400">
                There is no notices for now
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormFillUp;
