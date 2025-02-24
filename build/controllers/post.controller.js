import PostModel from "../models/post.model.js";
import { client } from "../database/index.js";
import respond from "../middlewares/response.middleware.js";
import { StatusError } from "../middlewares/error.middleware.js";
export async function getPosts(req, res, next) {
    try {
        const { limit, offset } = req.query;
        const posts = await client.posts.findMany({
            skip: Number(offset) || undefined,
            take: Number(limit) || undefined,
        });
        if (posts.length === 0) {
            return next(new StatusError(404, "No posts found"));
        }
        return respond({
            message: "Posts found",
            status_code: 200,
            label: "posts",
            data: posts
        }, res);
    }
    catch (error) {
        next(error);
    }
}
export async function getPost(req, res, next) {
    try {
        const posts = await client.posts.findMany({
            where: {
                author_id: req.params.id
            }
        });
        if (posts.length === 0) {
            return next(new StatusError(404, "No posts found"));
        }
        return respond({
            message: `Post${posts.length > 1 ? 's' : ''} found`,
            status_code: 200,
            label: `post${posts.length > 1 ? 's' : ''}`,
            data: posts
        }, res);
    }
    catch (error) {
        next(error);
    }
}
export async function createPost(req, res, next) {
    try {
        const author_id = req.params.id;
        const { title, content } = req.body;
        const post = new PostModel({
            author_id,
            title,
            content
        });
        await client.posts.create({
            data: post.toJSON()
        });
        return respond({
            status_code: 200,
            message: "Post created"
        }, res);
    }
    catch (err) {
        next(err);
    }
}
export async function likePost(req, res, next) {
    try {
        const id = req.params.id;
        const post_id = req.params.post_id;
        const post = await client.posts.findUnique({
            where: {
                id: post_id
            }
        });
        if (!post) {
            return next(new StatusError(404, "No post found"));
        }
        const likes = post.likes;
        if (likes.includes(id)) {
            return next(new StatusError(400, "already liked"));
        }
        likes.push(id);
        await client.posts.update({
            data: {
                likes: likes
            },
            where: {
                id: post_id
            }
        });
        return respond({
            status_code: 200, message: "liked"
        }, res);
    }
    catch (error) {
        next(error);
    }
}
export async function unlikePost(req, res, next) {
    try {
        const id = req.params.id;
        const post_id = req.params.post_id;
        const post = await client.posts.findUnique({
            where: {
                id: post_id
            }
        });
        if (!post) {
            return next(new StatusError(404, "No post found"));
        }
        const likes = post.likes;
        if (!likes.includes(id)) {
            return next(new StatusError(400, "not liked"));
        }
        likes.splice(likes.indexOf(id), 1);
        await client.posts.update({
            data: {
                likes: likes
            },
            where: {
                id: post_id
            }
        });
        return respond({
            status_code: 200, message: "like removed"
        }, res);
    }
    catch (error) {
        next(error);
    }
}
export async function deletePost(req, res, next) {
    try {
        const post_id = req.params.post_id;
        await client.posts.delete({
            where: {
                id: post_id
            }
        });
        return respond({
            status_code: 200, message: "post deleted"
        }, res);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=post.controller.js.map