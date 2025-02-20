interface iPost {
    id: string;
    author_id: string;
    title: string;
    content: string;
    published: Date;
    likes: string[];
}

class PostModel implements iPost{
    id: string;
    author_id: string;
    title: string;
    content: string;
    published: Date;
    likes: string[];

    constructor(post: Partial<iPost>){
        this.id = post.id || crypto.randomUUID()
        this.author_id = post.author_id!;
        this.title = post.title!;
        this.content = post.content!;
        this.published = post.published || new Date(),
        this.likes = post.likes || []
    }

    toJSON(){
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