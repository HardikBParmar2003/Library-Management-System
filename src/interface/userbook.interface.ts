import { Status } from "../generated/prisma";

export interface UserBook {
  id: number;
  user_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date | null;
  due_date: Date;
  penalty_amount: number ;
  penalty_status: Status | null;
}

export type CreateUserBook = Pick<UserBook, "book_id" | "user_id" | "due_date">;

