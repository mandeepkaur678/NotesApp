import React, { useEffect, useState } from "react";
import notes from "../data/notes.json";
import { Outlet, useNavigate, useParams,  } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes,setNotes]=useState()
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(()=>{
    //axios.get(`http://localhost:5000/notes/`)
    //.then((res) => setNotes(res.data))
    //.catch((err) => console.log(err))

    const fetchNotes = async () => {
      try{

        if(!id){
          const res = await axios.get(`${apiUrl}/notes/`)

          if(res.data && res.data.length > 0){
            setNotes(res.data[0])
          }
          
        }
        else{
          const res = await axios.get(`${apiUrl}/notes/${id}`)
          if(res.data){
            setNotes(res.data)
          }
        }
      } catch(err){
      
    }
    }
   
  },[id])

 
  if(!notes){
    return<h2>Loading.....</h2>
  }

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-40 ">
        <div className="bg-white border-2 p-2 rounded-xl mx-32 ">
          <div>
            <div className="flex justify-between px-4 pt-2">
              <h1 className="font-bold text-lg ">{note.title}</h1>
              <p className=" text-gray-400">{note.date}</p>
            </div>
            <button
              className="border-2 w-fit px-3 rounded-full mx-3 my-2"
              style={{ backgroundColor: note.topcolor }}
            >
              {note.tags}
            </button>
          </div>
          <div className="border-t-2 border-black/50"></div>
          <div className=" font-serif px-3 py-2 ">
            <p className="">{note.content}</p>

            <div className="py-3">
              {note.tasks.map((tag, index) => (
                <p key={index}>{tag}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-between mx-3 border-t-2">
            <button className="text-red-600">Delete Note</button>
            <div className="">
              <button onClick={()=>(navigate("/notes"))} className="border-2 mx-2 px-2 rounded-lg my-3 hover:bg-green-600 hover:text-white">
                Close
              </button>
              <button className="border-2 px-2 rounded-lg hover:bg-green-600 hover:text-white">
                Edit Note
              </button>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default NoteView;
