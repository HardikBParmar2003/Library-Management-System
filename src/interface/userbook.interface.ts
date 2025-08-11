export interface UserBook{
    id:number,
    user_id:number,
    book_id:number,
    borrow_date:Date,
    return_date:Date | null
}


export type CreateUserBook = Pick<UserBook,"book_id" | "user_id">