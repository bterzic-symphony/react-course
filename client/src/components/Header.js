import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Header = () => {
  const { user, logout } = useGlobalContext();
  const { pathName } = useLocation();

  return (
    <div className="main-header">
      <div className="main-header__inner">
        <div className="main-header__left">
          <Link to="/">ToDo List</Link>
        </div>
        <div className="main-header__right">
          {user ? (
            <button className="btn" onClick={logout}>
              Logout
            </button>
          ) : pathName === "/" ? (
            <Link to="/register" className="btn">
              Register
            </Link>
          ) : (
            <Link to="/" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
