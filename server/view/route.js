import { Router } from "express";
import { signUpHandler, loginHandler, getSessionData, logoutHandler } from "../controller/userController.js";
import { getPosts, createPost } from "../controller/postController.js";

const router = Router();

// Endpoints
router.post('/signup', signUpHandler);
router.post('/login', loginHandler);
router.get('/get-session-data', getSessionData);
router.post('/logout', logoutHandler);

router.get('/posts', getPosts);
router.post('/posts', createPost);

export default router;