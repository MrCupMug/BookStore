import { IBook } from "./books.interface";

export interface IBooksResponse {
    books: IBook[];
    meta: any;
}
