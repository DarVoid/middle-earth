import { Post } from "../entities/Post";

export const Query = {
    posts: (_, __, { persistence }) => Post.all(persistence),
};

export const Mutations = {
    newPost: (_, { post: input }, { persistence }) => {
        const post = new Post(persistence);
        post.body = input.body;
        return post.save();
    },
};

export const Subscriptions = {
    //
};
