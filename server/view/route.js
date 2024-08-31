import { Router } from "express";
import { signUpHandler, loginHandler, getSessionData, logoutHandler } from "../controller/userController.js";
import { getPosts, createPost, getPost, deletePost } from "../controller/postController.js";

const router = Router();

// Endpoints
router.post('/signup', signUpHandler);
router.post('/login', loginHandler);
router.get('/get-session-data', getSessionData);
router.post('/logout', logoutHandler);

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.get('/post/:id', getPost);
router.delete('/post/:id', deletePost);

export default router;