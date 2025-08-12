import { Book, User } from "../generated/prisma";
import nodemailer from "nodemailer";
import { UserBook } from "../interface/userbook.interface";

export const sendEmail = {
  async sendBorrowBook(user: User, book: Book, borrowBook: UserBook) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "projectmanagement760@gmail.com",
          pass: "vkpq qkmo mhvk ovzb",
        },
      });

      const returnDate = borrowBook.return_date;
      const isPenaltyPaid = borrowBook.penalty_status === "PAID";

      // Determine the message type
      let messageHeader = "";
      let extraNote = "";
      let penaltyNote = "";

      if (returnDate) {
        messageHeader = `<p>Thank you for returning a book to the library. Here are the details:</p>`;
      } else if (isPenaltyPaid) {
        messageHeader = `<p>This email is regarding the penalty you recently paid. Below are the book details:</p>`;
        extraNote = `<p><strong>Penalty Paid:</strong> Rs. ${borrowBook.penalty_amount}</p>`;
      } else {
        messageHeader = `<p>Thank you for borrowing a book from the library. Here are the details:</p>`;
        penaltyNote = `
          <p>Please return the book by the due date to avoid late fees.</p>
          <p><strong>Note:</strong> If you miss the due date, you must pay Rs. 10 per day.</p>
        `;
      }

      return await transporter.sendMail({
        from: "projectmanagement760@gmail.com",
        to: user.email,
        subject: "Library Notification - Book Activity",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #fff;
      padding: 20px;
      border: 1px solid #ddd;
    }
    .header {
      background-color: #3f51b5;
      color: #fff;
      padding: 10px 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-top: 20px;
    }
    .book-details {
      margin: 10px 0;
      padding: 10px;
      background-color: #f1f1f1;
      border-left: 4px solid #3f51b5;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>📚 Library Notification</h1>
    </div>
    <div class="content">
      <p>Dear <strong>${user.first_name} ${user.last_name}</strong>,</p>
      ${messageHeader}

      <div class="book-details">
        <p><strong>Title:</strong> ${book.book_name}</p>
        <p><strong>Author:</strong> ${book.author_name}</p>
        <p><strong>Borrowed Date:</strong> ${borrowBook.borrow_date.toDateString()}</p>
        <p><strong>Due Date:</strong> ${borrowBook.due_date.toDateString()}</p>
        ${
          returnDate
            ? `<p><strong>Return Date:</strong> ${returnDate.toDateString()}</p>`
            : ""
        }
        ${extraNote}
      </div>

      ${penaltyNote}

      <p>For any queries, feel free to contact the library.</p>
      <p>Happy Reading!</p>
    </div>
    <div class="footer">
      &copy; 2025 Library System. All rights reserved.
    </div>
  </div>
</body>
</html>
        `,
      });
    } catch (error) {
      throw new Error("Error while sending email or incorrect email");
    }
  },
};
