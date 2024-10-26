"use client";

import { createContext, useContext, useState, useEffect } from "react";
import * as actions from "@/actions";
import { toast } from "react-toastify";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");
  const [authUserId, setAuthUserId] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authRole, setAuthRole] = useState("");
  const [authName, setAuthName] = useState("");
  const [authId, setAuthId] = useState(null);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setAuthToken("");
    setAuthEmail("");
    setAuthName("");
    setAuthRole("");
    setAuthUserId("");
    setAuthId("");
    actions.To_login_page();
    
  };

  const fetchUser = async () => {
    const res = await actions.fetch_user_profile_data(authToken);
    if (!res.error) {
      setAuthEmail(res.email);
      setAuthName(res.name);
      setAuthRole(res.role);
      setAuthId(res.id);
      if (res.role == "") {
        setAuthToken("");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [authToken]);

  const is_logged_in = async() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await actions.decodeToken(token);
      if (user) {
        setAuthToken(token);
        setAuthUserId(user.user_id);
        fetchUser();
      } else {
        handleLogOut();
        actions.To_login_page();
      }
    }
  }
  useEffect(() => {
    is_logged_in();
  }, []);

  return (
    <StateContext.Provider
      value={{
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
