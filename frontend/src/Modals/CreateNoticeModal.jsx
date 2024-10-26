import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import axios from "axios";

import { useStateContext } from "../contexts/ContextProvider";

const CreateNoticeModal = ({ handleAdd }) => {
  const {authToken} = useStateContext();

  const [semester, setSemester] = useState(null);
  const [title, setTitle] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [description, setDescription] = useState("");

  const [allSemesters, setAllSemesters] = useState([]);

  const fetchSemesters = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASEURL}/semesters/`);
      if (res.data) {
        setAllSemesters(res.data);
      } else {
        console.log("Error!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASEURL}/form-fill-ups/`, {title, description, semester, start_time, end_time}, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      if(res.data) {
        console.log("Success");
        handleAdd();
      } else {
        console.log("Error!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white py-5 px-8 rounded-xl w-[40%]">
        <div>
          <div className="flex justify-between items-center pb-3">
            <div className="py-2">
              <p className="text-2xl font-semibold">Create Notice</p>
            </div>
            <div className="py-2">
              <button onClick={handleAdd}>
                <MdOutlineCancel className="text-2xl hover:text-red-500" />
              </button>
            </div>
          </div>
          <div>
            <form action="submit" onSubmit={handleSubmit}>
              <select
                name="semester"
                id="semester"
                className="mt-1.5 w-full rounded-lg border border-gray-200 text-gray-700 sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] py-2 mb-5 px-2 outline-none"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value={null}>Select Semester</option>
                {allSemesters.map((sem) => (
                    <option value={sem.id} key={sem.id}>
                      Year-{sem.year} {sem.name} Semester
                    </option>
                ))}
              </select>

              <textarea
                id="title"
                className="mt-2 w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] outline-none px-2 mb-5 py-2"
                rows="2"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>

              <textarea
                id="description"
                className="mt-2 w-full rounded-lg border border-gray-200 align-top shadow-sm sm:text-sm focus-within:border-[#03C9D7] focus-within:ring-1 focus-within:ring-[#03C9D7] outline-none px-2 mb-5 py-2"
                rows="4"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <label
                htmlFor="start-time"
                className="block text-sm text-gray-700 mb-1 px-2"
              >
                Start Time
              </label>
              <input
                type="datetime-local"
                id="start-time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring focus:border-[#03C9D7] mb-5"
                value={start_time}
                onChange={(e) => setStart_time(e.target.value)}
              />
              <label
                htmlFor="start-time"
                className="block text-sm text-gray-700 mb-1 px-2"
              >
                End Time
              </label>
              <input
                type="datetime-local"
                id="start-time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring focus:border-[#03C9D7] mb-5"
                value={end_time}
                onChange={(e) => setEnd_time(e.target.value)}
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

export default CreateNoticeModal;
