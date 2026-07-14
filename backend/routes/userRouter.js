import express from "express"

import { register,login } from "../controllers/userController.js"

const User = express.Router()

User.post("/",register)

User.post("/login",login)

export default User