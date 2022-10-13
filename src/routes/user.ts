import { Router } from "express";
import { getUsers, loginUser, newUser } from "../controllers/user";

const router = Router()

router.post("/", newUser)

router.post("/login", loginUser);

router.get("/", getUsers)

export default router;