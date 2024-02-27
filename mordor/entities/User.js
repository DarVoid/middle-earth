import { BaseEntity } from "../persistence/BaseEntity";

export class User extends BaseEntity {
    __typename = 'User';

    name;
    email;
    avatar;
}
