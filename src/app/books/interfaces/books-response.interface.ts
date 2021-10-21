import { IBook } from './books.interface';
import { IMeta } from 'src/app/interfaces/meta.interface';

export interface IBooksResponse {
    books: IBook[];
    meta: IMeta;
}
