import { Post as PostEntity } from "../entities/Post";

export const Query = {
    posts: async (_, __, { persistence }) => {
        return (await PostEntity.all(persistence)).map((each)=> {
            return {
                ...each
            }
        })
            
    }, 
};
export const Post = {
    likes: async (parent, __, { persistence }) => {
        console.log({parent})
        return { count : 20}
        // return {count:parent.likesArray.length} 
    },
};

export const Mutations = {
    newPost: async (_, { post: input }, { persistence }) => {
        const post = new PostEntity(persistence);
        post.body = input.body;
        return await post.save();
    },
};

export const Subscriptions = {
    //
};
