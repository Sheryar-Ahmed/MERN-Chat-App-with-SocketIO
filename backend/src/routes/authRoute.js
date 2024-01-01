import express from "express";
import { login, register } from "../controller/auth";

const router = express.Router();


router.post('/api/users/register', register);
router.post('/api/users/login', login);


export { router as authRoute };