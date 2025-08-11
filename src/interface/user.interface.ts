export interface User{
    id:number,
    first_name:string,
    last_name:string,
    email:string,
    contact_no:string,
    address:string,
    created_at:Date,
    deleted_at:Date | null,
}

export type CreateUSer = Pick<User,"first_name"|"last_name"|"address"|"email"|"contact_no">
     