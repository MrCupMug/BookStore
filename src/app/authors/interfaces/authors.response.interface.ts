import { IAuthors } from './authors.interface';

export interface IAuthorsResponse {
    authors: IAuthors[];
    meta: any;
}
