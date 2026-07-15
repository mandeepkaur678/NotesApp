import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
    <div className="py-2 bg-[#0D530E] text-white fixed top-0 left-0 w-full">
    <div className="flex justify-around mx-10 relative z-50">
      <NavLink to="/" className=" px-8 py-2 hover:border hover:transition duration-500 hover:scale-110  ">Login</NavLink>
      <NavLink to="/register" className=" px-8 py-2 hover:border hover:transition duration-500 hover:scale-110">Register</NavLink>
      <NavLink to="/notes" className=" px-8 py-2 hover:border hover:transition duration-500 hover:scale-110">Notes</NavLink>
      <NavLink to="/notes/default" className=" px-8 py-2 hover:border hover:transition duration-500 hover:scale-110">Notes(View)</NavLink>
      <NavLink to="/notes/addnote" className=" px-8 py-2 hover:border hover:transition duration-500 hover:scale-110">Add Note</NavLink>
    
      </div>
      </div>
    </>
  );
};

export default Header;
