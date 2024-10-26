import React, { useEffect, useState } from "react";
import axios from "axios";

import { useStateContext } from "../contexts/ContextProvider";
import SelectToMarkModal from "../Modals/SelectToMarkModal";

const Marking = () => {
  const { authToken, authRole } = useStateContext();

  const [notices, setNotices] = useState([]);

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
              <article className="rounded-xl bg-white p-4 ring ring-[#03C9D7] sm:p-6 lg:p-8 mb-6" key={notice.id}>
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
                          className="rounded border border-[#03C9D7] hover:bg-[#03C9D7] px-3 py-1.5 text-sm font-medium hover:text-white mr-2"
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
