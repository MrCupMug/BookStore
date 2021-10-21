import { IAuthor } from './authors.interface';
import { IMeta } from '../../interfaces/meta.interface';

export interface IAuthorsResponse {
    authors: IAuthor[];
    meta: IMeta;
}
