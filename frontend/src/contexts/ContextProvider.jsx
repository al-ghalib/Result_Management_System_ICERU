import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [authToken, setAuthToken] = useState("");
  const [authUserId, setAuthUserId] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authRole, setAuthRole] = useState("");
  const [authName, setAuthName] = useState("");
  const [authId, setAuthId] = useState(null);

  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthToken("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = decodeToken(token);
      if (user) {
        setAuthToken(token);
        setAuthUserId(user.user_id);
      } else {
        setAuthToken("");
      }
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASEURL}/profile/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.data) {
        const data = response.data;
        setAuthEmail(data.email);
        setAuthName(data.name);
        setAuthRole(data.role);
        setAuthId(data.id);
        if (data.role === "") {
          setAuthToken("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [authToken]);

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        authToken,
        setAuthToken,
        setAuthUserId,
        handleLogOut,
        authUserId,
        authRole,
        authEmail,
        authName,
        authId,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
