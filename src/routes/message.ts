import { Router } from "express";
import { getAllMessages, getMessages, sendMessages } from "../controllers/message";
import valideteToken from "./validate-token";


const router = Router();

router.get("/api/users/:username/messages/inbox", valideteToken, getMessages)

router.get("/api/users/:username/messages/sent", valideteToken, getAllMessages)

router.post("/api/users/:username/messages", valideteToken, sendMessages ) 




export default router