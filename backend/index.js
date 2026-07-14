import express, { urlencoded } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AddNote from "./models/addnotes.js";
import Note from "./models/notes.js";
import User from "./models/user.js";
import jwt from "jsonwebtoken";
import cors from 'cors'
import verifyToken from "./middlewares/auth.js";

import notesRouter from "./routes/notesRouter.js"
import userRouter from  "./routes/userRouter.js"

import { configDotenv } from "dotenv";
configDotenv();

const app = express();

app.use(cors())
app.use(express.json());
app.use(urlencoded({extended:true}))


mongoose  
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => { 
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port 5000!");
});


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/notes", notesRouter)

app.use("/user", userRouter)

