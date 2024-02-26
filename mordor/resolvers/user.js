import { User } from "../entities/User";

export const Query = {
    users: async (_, __, { persistence }) => await User.all(persistence),
};

const validationError = (field, rule) => ({ field, rule, __typename: 'ValidationError' });

export const Mutations = {
    newUser: async (_, { user: input }, { persistence }) => {
        if(input.name.length === 0) {
            return validationError('name', 'notEmpty');
        }
        const user = new User(persistence);
        user.name = input.name;
        return User.UserResult(await user.save());
    },
};

export const Subscriptions = {
    //
};
