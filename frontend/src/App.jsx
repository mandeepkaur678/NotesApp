import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Header from "./component/Header";
import Login from "./component/Login";
import Register from "./component/Register";
import Notes from "./component/Notes";
import NoteView from "./component/NoteView";
import AddNote from "./component/AddNote";
import RequireAuth from "./component/RequireAuth";
import { Toaster } from "sonner";
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
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="/notes"
            element={
              <RequireAuth>
                <Notes />
              </RequireAuth>
            }
          >
            <Route
              path=":id"
              element={
                <RequireAuth>
                  <NoteView />
                </RequireAuth>
              }
            />
            <Route
              path="addnote"
              element={
                <RequireAuth>
                  <AddNote />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
