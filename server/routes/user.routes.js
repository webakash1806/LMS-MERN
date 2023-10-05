import { Router } from "express";
import { register, login, logout, profile } from "../controllers/user.controller.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', profile)

export default router