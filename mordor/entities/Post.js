import { BaseEntity } from "../persistence/BaseEntity";

export class Post extends BaseEntity {
    __typename = 'Post';

    body;
}
