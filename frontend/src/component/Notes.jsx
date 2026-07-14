import React, { useEffect, useState } from "react";
// import notes from "../data/notes.json";
import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { space } from "postcss/lib/list";
import axios from "axios";

const Notes = () => {
  const[notes,setNotes]=useState([]);

  const [loading , setLoading ] = useState(true)
  
  const tags = [...new Set(notes.flatMap((note) => note.tags))];

  const navigate = useNavigate();

  
  useEffect(()=>{
    const fetchnotes= async ()=>{
      try{
        const res=await axios.get("http://localhost:5000/notes")
        setNotes(res.data);
      }catch(err){
        console.log(err);
      }
      finally{
        setLoading(false)
      }

    }
    fetchnotes()
  } , [])


  return (
    <>
      <div className="flex justify-between py-1">
        <div className="flex gap-10 ">
          <h1 className="font-bold text-xl py-1">DAILYNOTES</h1>
          <input
            type="text"
            placeholder="Search your notes...."
            className="border-2 border-gray-500 pl-2 pr-20 rounded-full"
          ></input>
        </div>
        <div className="flex ">
          <button className="border-2 border-gray-500 rounded-md bg-gray-500/20 mx-2 px-3">
            <Link to="/notes/8"> + Preview Note</Link>
          </button>
          <h1 className="border-2 mx-1 w-10 text-center rounded-full border-amber-400 bg-amber-300/20 shadow-md ">
            AL
          </h1>
        </div>
      </div>
      <div className="border-b-2 py-1 border-black/30 shadow-lg"></div>
      <div>
        <button className="flex flex-wrap mt-4 gap-3 px-6 group">
          {tags.map((tag) => (
            <h1
              key={tag}
              className="px-5 py- rounded-full border bg-white transition-all duration-300 group-hover:opacity-40 hover:!opacity-100 hover:bg-green-700 hover:text-white hover:scale-110 cursor-pointer"
            >
              {tag}
            </h1>
          ))}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:mx-auto gap-8 p-8">
          <div className="border-2 border-dashed shadow-sm rounded-lg py-20 w-auto h-auto text-center m-4 flex justify-center items-center hover:bg-green-200/60 transition duration-300 hover:border-black">
            <button className="text-center">
              <Link to="/notes/addnote">+ New</Link>
            </button>
          </div>
          {notes.map((note) => (
            <Link
              key={note._id}
              to={`/notes/${note.id}`}
              className="bg-white/90 rounded-xl shadow-md shadow-amber-200 m-4 max-w-lg hover:shadow-xl transition duration-300 hover:translate-y-2 overflow-hidden hover:rotate-[0.5deg]"
            >
              <div
                className="h-1"
                style={{ backgroundColor: note.topcolor }}
              ></div>
              <h2 className="text-lg  font-serif text-bold text-[#1F2937] mb-3 px-6 py-2">
                {note.title}
              </h2>
              <p className="text-[#6B7280] px-6 leading-8 text-base line-clamp-3">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-2 border-t-2 mx-1 py-1 border-amber-200">
                <span
                  className="w-fit my-2 text-white mx-2 rounded-full px-4 py-2 "
                  style={{ backgroundColor: note.topcolor }}
                >
                  {note.tags}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-end p-2 mx-5">
        <button className="bg-green-700 text-white px-8 py-3 rounded-full text-md hover:bg-green-800 transition duration-300 shadow-sm shadow-green-400">
          <Link to="/notes/addnote">+ New Note</Link>
        </button>
      </div>

      <Outlet />
    </>
  );
};

export default Notes;
