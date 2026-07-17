import express from "express"

import { register, login, refresh } from "../controllers/userController.js"

const User = express.Router()

User.post("/",register)

User.post("/login",login)
User.post("/refresh", refresh)

export default User
