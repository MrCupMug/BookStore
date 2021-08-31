import { IAuthor } from './authors.interface';

export interface IAuthorsResponse {
    authors: IAuthor[];
    meta: any;
}
