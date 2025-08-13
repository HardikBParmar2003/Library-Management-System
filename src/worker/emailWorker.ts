import { Worker } from "bullmq";
import { transporter } from "../shared/email";


const connection = { host: "127.0.0.1", port: 6379 };

const worker = new Worker(
  "sendEmailQueue",
  async (job) => {
    const { user, book, borrowBook } = job.data;

    borrowBook.borrow_date = new Date(borrowBook.borrow_date);
    borrowBook.due_date = new Date(borrowBook.due_date);
    borrowBook.return_date = borrowBook.return_date
      ? new Date(borrowBook.return_date)
      : null;

    let messageHeader = "";
    let extraNote = "";
    let penaltyNote = "";

    if (borrowBook.return_date) {
      messageHeader = `<p>Thank you for returning a book to the library. Here are the details:</p>`;
    } else if (borrowBook.penalty_status === "PAID") {
      messageHeader = `<p>This email is regarding the penalty you recently paid. Below are the book details:</p>`;
      extraNote = `<p><strong>Penalty Paid:</strong> Rs. ${borrowBook.penalty_amount}</p>`;
    } else {
      messageHeader = `<p>Thank you for borrowing a book from the library. Here are the details:</p>`;
      penaltyNote = `
      <p>Please return the book by the due date to avoid late fees.</p>
      <p><strong>Note:</strong> If you miss the due date, you must pay Rs. 10 per day.</p>
    `;
    }

    const emailHtml = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border: 1px solid #ddd;">
      <h1 style="background-color: #3f51b5; color: white; padding: 10px;">📚 Library Notification</h1>
      <p>Dear <strong>${user.first_name} ${user.last_name}</strong>,</p>
      ${messageHeader}
      <div style="margin: 10px 0; padding: 10px; background-color: #f1f1f1; border-left: 4px solid #3f51b5;">
        <p><strong>Title:</strong> ${book.book_name}</p>
        <p><strong>Author:</strong> ${book.author_name}</p>
        <p><strong>Borrowed Date:</strong> ${borrowBook.borrow_date.toDateString()}</p>
        <p><strong>Due Date:</strong> ${borrowBook.due_date.toDateString()}</p>
        ${
          borrowBook.return_date
            ? `<p><strong>Return Date:</strong> ${borrowBook.return_date.toDateString()}</p>`
            : ""
        }
        ${extraNote}
      </div>
      ${penaltyNote}
      <p>For any queries, feel free to contact the library.</p>
      <p>Happy Reading!</p>
      <footer style="font-size: 12px; color: #888; margin-top: 20px;">&copy; 2025 Library System. All rights reserved.</footer>
    </div>
  </div>
  `;

    await transporter.sendMail({
      from: `"Library" <${process.env.EMAIL}>`,
      to: user.email,
      subject: `Library Notification - Book Activity`,
      html: emailHtml,
    });

    console.log(`✅ Email sent to ${user.email} for book "${book.book_name}"`);
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`✔️ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed: ${err.message}`);
});
