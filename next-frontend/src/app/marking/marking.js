"use client";

import React, { useEffect, useState } from "react";

import { useStateContext } from "@/contexts";
import * as actions from "@/actions";

import SelectToMarkModal from "./selectToMarkModal";
import { toast } from "react-toastify";

const Marking = () => {
  const { authToken, authRole } = useStateContext();

  const [notices, setNotices] = useState([]);

  const fetchForms = async () => {
    const res = await actions.fetch_forms(authToken);
    if(!res.error) {
        setNotices(res.forms);
    } else {
        toast.error(res.msg);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const [selecting, setSelecting] = useState(false);
  const [form_id, setForm_id] = useState(null);
  const [semester_id, setSemester_id] = useState(null);
  const handleSelection = () => {
    setSelecting(!selecting);
  };
  const handleChange = (form_id, semester_id) => {
    setForm_id(form_id);
    setSemester_id(semester_id);
  };

  return (
    <div className="m-2 md:m-8 mt-24 p-2 md:px-10 md:py-5 bg-white rounded-3xl h-[90%]">
      {selecting && (
        <SelectToMarkModal
          handleSelection={handleSelection}
          semester_id={semester_id}
          form_id={form_id}
        />
      )}
      <div className="w-full">
        <p className="text-2xl pb-2 font-semibold">Section For Adding Marks</p>
      </div>
      <div className="py-3">
        {notices.map((notice) =>
            notice.can_mark && (
              <article className="rounded-xl bg-white p-4 ring ring-sky-500 sm:p-6 lg:p-8 mb-6" key={notice.id}>
                <div className="flex items-start sm:gap-8">
                  <div
                    className="hidden sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-sky-500"
                    aria-hidden="true"
                  >
                    <div className="flex items-center gap-1">
                      <span className="h-8 w-0.5 rounded-full bg-sky-500"></span>
                      <span className="h-6 w-0.5 rounded-full bg-sky-500"></span>
                      <span className="h-4 w-0.5 rounded-full bg-sky-500"></span>
                      <span className="h-6 w-0.5 rounded-full bg-sky-500"></span>
                      <span className="h-8 w-0.5 rounded-full bg-sky-500"></span>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="w-full flex justify-between items-center">
                      <div>
                        <h3 className="mt-4 text-lg font-medium sm:text-xl">
                          <p className="hover:underline"> {notice.title} </p>
                        </h3>
                        <p className="mt-1 text-sm text-gray-700">
                          The form fill up process has been ended. Now click the
                          right end button to add marks.
                        </p>
                      </div>
                      <div>
                        <button
                          className="rounded border border-sky-500 hover:bg-sky-500 px-3 py-1.5 text-sm font-medium hover:text-white mr-2"
                          onClick={() => {
                            handleChange(notice.id, notice.semester);
                            handleSelection();
                          }}
                        >
                          Add Marks
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
        )}
      </div>
    </div>
  );
};

export default Marking;