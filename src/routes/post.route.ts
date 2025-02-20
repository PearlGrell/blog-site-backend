import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, likePost, unlikePost } from "../controllers/post.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import { PostValidateMiddleware } from "../middlewares/validator.middleware.js";

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.get('/current', AuthMiddleware, getPost);
postRouter.get('/:id', getPost);

postRouter.post('/', AuthMiddleware, PostValidateMiddleware, createPost);

postRouter.put('/:post_id/like', AuthMiddleware, likePost)
postRouter.put('/:post_id/unlike', AuthMiddleware, unlikePost)

postRouter.delete('/:post_id', deletePost)

export default postRouter;