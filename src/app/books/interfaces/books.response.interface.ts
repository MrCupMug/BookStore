import { IBooksCard } from "./books.interface";

export interface IBooksResponse {
    books: IBooksCard[];
    meta: any;
}
