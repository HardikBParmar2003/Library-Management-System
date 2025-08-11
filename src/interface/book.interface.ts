export interface Book {
  id: number;
  book_name: string;
  author_name: string;
  available_quantity: number;
  created_at: Date;
  deleted_at: Date | null;
}

export type CreateBook = Pick<
  Book,
  "book_name" | "author_name" | "available_quantity"
>;
