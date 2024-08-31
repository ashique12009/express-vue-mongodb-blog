import { Router } from "express";
import { signUpHandler, loginHandler, getSessionData, logoutHandler } from "../controller/userController.js";
import { getPosts, createPost, getPost, deletePost, editPost } from "../controller/postController.js";
import { getTotalPostNumber, getTotalUserNumber, getTotalPostNumberOfToday } from "../controller/dashboardController.js";

const router = Router();

// Endpoints
// User
router.post('/signup', signUpHandler);
router.post('/login', loginHandler);
router.get('/get-session-data', getSessionData);
router.post('/logout', logoutHandler);

// Post
router.get('/posts', getPosts);
router.post('/posts', createPost);
router.get('/post/:id', getPost);
router.delete('/post/:id', deletePost);
router.put('/post/:id', editPost);

// Dashboard
router.get('/get-total-post-number', getTotalPostNumber);
router.get('/get-total-user-number', getTotalUserNumber);
router.get('/get-total-post-number-of-today', getTotalPostNumberOfToday);

export default router;