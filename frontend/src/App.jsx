import { Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./component/Header";
import Login from "./component/Login";
import Register from "./component/Register";
import Notes from "./component/Notes";
import NoteView from "./component/NoteView";
import AddNote from "./component/AddNote";
import { Toaster, toast } from "sonner";
import Layout from "./component/Layout";

function App() {
//   useEffect(()=>{
//     const fetchdata=async()=>{
//   const res = await fetch("http://localhost:5000/notes");
//   const data=await res.json();
//   console.log(data);};
//   fetchdata();
// },[])

  return (
    <>
      <Toaster
        richColors
        position="top-right"
        closeButton
        expand
        duration={4000}
      />
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<Notes />}>
            <Route path="/notes/:id" element={<NoteView />} />
            <Route path="addnote" element={<AddNote />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
