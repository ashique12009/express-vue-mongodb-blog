import { Router } from "express";
import { signUpHandler, loginHandler, getSessionData, logoutHandler } from "../controller/userController.js";

const router = Router();

// Endpoints
router.post('/signup', signUpHandler);
router.post('/login', loginHandler);
router.get('/get-session-data', getSessionData);
router.post('/logout', logoutHandler);

export default router;