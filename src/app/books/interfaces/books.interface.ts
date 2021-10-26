export interface IBook {
  id?: number;
  description: string;
  author_id: number;
  title: string;
  price: number;
  genres: Array<object>;
  previews?: Array<null>;
  image: null;
  writing_date?: string;
  release_date?: string;
}
