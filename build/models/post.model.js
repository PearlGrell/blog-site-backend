class PostModel {
    id;
    author_id;
    title;
    content;
    published;
    likes;
    constructor(post) {
        this.id = post.id || crypto.randomUUID();
        this.author_id = post.author_id;
        this.title = post.title;
        this.content = post.content;
        this.published = post.published || new Date(),
            this.likes = post.likes || [];
    }
    toJSON() {
        return {
            author_id: this.author_id,
            title: this.title,
            content: this.content,
            published: this.published,
            likes: this.likes
        };
    }
}
export default PostModel;
//# sourceMappingURL=post.model.js.map