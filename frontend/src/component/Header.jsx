import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

  const navLinkClass = ({ isActive }) =>
    `px-8 py-2 hover:border hover:transition duration-500 hover:scale-110 ${
      isActive
        ? "border-b-2 border-white text-white font-semibold"
        : "text-white"
    }`;

  return (
    <>
      <div className="py-2 bg-[#0D530E] text-white fixed top-0 left-0 w-full">
        <div className="flex justify-around mx-10 relative z-50">
          <NavLink to="/" className={navLinkClass}>
            Login
          </NavLink>
          <NavLink to="/register" className={navLinkClass}>
            Register
          </NavLink>
          <NavLink to="/notes" className={navLinkClass}>
            Notes
          </NavLink>
          <NavLink to="/notes/default" className={navLinkClass}>
            Notes(View)
          </NavLink>
          <NavLink to="/notes/addnote" className={navLinkClass}>
            Add Note
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
