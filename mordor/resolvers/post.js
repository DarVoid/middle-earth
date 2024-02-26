import { Post } from "../entities/Post";

export const Query = {
    posts: async (_, __, { persistence }) => await Post.all(persistence),
};

export const Mutations = {
    newPost: async (_, { post: input }, { persistence }) => {
        const post = new Post(persistence);
        post.body = input.body;
        return await post.save();
    },
};

export const Subscriptions = {
    //
};
