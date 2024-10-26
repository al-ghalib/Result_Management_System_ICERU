import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import { Navbar, Footer, Sidebar } from "./components";
import { Login , Dashboard, Students, Teachers, Profile, Users, FormFillUp, Marking, Result, Courses} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const AuthenticatedRoutes = ({ activeMenu }) => {
  return (
    <div className="flex relative">
      {activeMenu ? (
        <div className="w-72 fixed bg-white ">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">
          <Sidebar />
        </div>
      )}
      <div
        className={
          activeMenu
            ? "bg-main-bg min-h-screen md:ml-72 w-full"
            : "bg-main-bg w-full min-h-screen flex-2"
        }
      >
        <div className="fixed md:static w-full ">
          <Navbar />
        </div>
        <div className="w-full h-full flex flex-col justify-between items-center shadow-sm">
          <div className="w-full bg-[#FAFBFB] h-full">
            <Routes>
              {/* dashboard  */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/users" element={<Users />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/form-fill-up" element={<FormFillUp />} />
              <Route path="/marking" element={<Marking />} />
              <Route path="/result" element={<Result />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </div>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { activeMenu, authToken } = useStateContext();

  return (
    <div>
      <BrowserRouter>
        {authToken ? (
          <AuthenticatedRoutes activeMenu={activeMenu} />
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;