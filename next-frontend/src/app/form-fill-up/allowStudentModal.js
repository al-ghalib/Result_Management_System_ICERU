"use client";

import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
import SemesterStudentsModal from "./semesterStudentsModal";
import { toast } from "react-toastify";

const AllowStudentModal = ({ handleAllow, semester_id, form_id }) => {
  const { authUserId } = useStateContext();

  const [adding, setAdding] = useState(false);
  const handleAdd = () => {
    setAdding(!adding);
  };

  const [teacher_id, setTeacher_id] = useState(null);
  const [info, setInfo] = useState(undefined);

  useEffect(() => {
    (async () => {
      const res = await actions.get_teacher_id(authUserId);
      if (!res.error) {
        setTeacher_id(res.teacher_id);
      } else {
        toast.error(res.msg);
      }
    })();
  }, [authUserId]);

  useEffect(() => {
    (async () => {
      const res = await actions.fetch_teacher_info(teacher_id);
      if (!res.error) {
        setInfo(res.info);
      } else {
        toast.error(res.msg);
      }
    })();
  }, [teacher_id]);

  const [section_id, setSection_id] = useState(null);
  const handleChange = (x) => {
    setSection_id(x);
  };

  return (
    <>
      {!adding && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white py-5 px-8 rounded-xl w-[50%] max-h-[90vh] overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-3">
                <div className="py-2">
                  <p className="text-2xl font-semibold">Semester Courses</p>
                </div>
                <div className="py-2">
                  <button onClick={handleAllow}>
                    <MdOutlineCancel className="text-2xl hover:text-red-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pb-5 pt-3">
              {info?.assigned_sections.map(
                (section) =>
                  section?.course?.semester?.id === semester_id && (
                    <article
                      className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6 mb-3"
                      key={section?.course?.semester?.id}
                    >
                      <div className="flex justify-start items-center">
                        <span className="inline-block rounded bg-sky-500 p-2 text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </span>
                        <p className="px-3 font-semibold text-xl">
                          ICE-{section?.course?.code}
                        </p>
                      </div>

                      <div>
                        <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                          {section?.course?.title}
                          {"  "}|{"  "} Section {section?.section}
                        </h3>
                      </div>

                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        Type: {section?.course?.type}{" "}
                        <span className="mx-2 font-bold">.</span>
                        Credit: {section?.course?.credit}
                      </p>

                      <button
                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-500 hover:text-green-600"
                        onClick={() => {
                          handleAdd();
                          handleChange(section.id);
                        }}
                      >
                        Add students
                        <span
                          aria-hidden="true"
                          className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                        >
                          &rarr;
                        </span>
                      </button>
                    </article>
                  )
              )}
            </div>
          </div>
        </div>
      )}
      {adding && (
        <SemesterStudentsModal
          handleAdd={handleAdd}
          handleAllow={handleAllow}
          semester_id={semester_id}
          form_id={form_id}
          section_id={section_id}
        />
      )}
    </>
  );
};

export default AllowStudentModal;
