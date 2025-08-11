export interface CreateAdmin {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  created_at?:Date;
}
