import { UserBook } from "../interface/userbook.interface";
import { userBookRepository } from "../repositories/userbook.repositories";

export async function checkPenalty(id: number) {
  const is_penalty: UserBook | null = await userBookRepository.checkPenalty(id);
  if (is_penalty) {
    if (is_penalty.penalty_status == "PAID") {
      return true;
    } else {
      const dueDate = new Date(is_penalty.due_date);
      const returnDate = new Date();

      const diffInMs = returnDate.getTime() - dueDate.getTime();

      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      const penalty = diffInDays > 0 ? diffInDays * 10 : 0;
      if (penalty) {
        const data = {
          penalty_amount: penalty,
          penalty_status: "UNPAID",
        };
        await userBookRepository.updateUserBook(data as UserBook, id);
        return false;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
}
