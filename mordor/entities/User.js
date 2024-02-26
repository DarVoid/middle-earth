import { BaseEntity } from "../persistence/BaseEntity";

export class User extends BaseEntity {
    name;

    static UserResult(user) {
        return { ...user, __typename: 'User' };
    }
}
