import React from "react";
import { useAuth } from "../context/authContext";
import "./Logout.css";

const Logout = () => {
  const { logout, accessToken } = useAuth();

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
  };

  return (
    <button className="out-btn" onClick={handleLogout}>
      Sign Out
    </button>
  );
};
export default Logout;
