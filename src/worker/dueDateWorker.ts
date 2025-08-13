import { Worker } from "bullmq";
import { transporter } from "../shared/email";

const connection = { host: "127.0.0.1", port: 6379 };

const worker = new Worker(
  "dueDateEmailQueue",
  async (job) => {
    console.log("hellom emailqueue this is your job data", job.data);
    // console.log(job.data.borrow_date);
    const { user, book, borrow_date } = job.data;
    const date = new Date(borrow_date);
    // console.log(user, book, borrow_date);

    const emailHtml = `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border: 1px solid #ddd;">
      <h1 style="background-color: #3f51b5; color: white; padding: 10px;">📚 Library Notification</h1>
      <p>Dear <strong>${user.first_name} ${user.last_name}</strong>,</p>
        <p><strong>Today Is Due Date !!!</strong></p>
        <p>This email is regarding the due date of the book you borrowed. Below are the book details:</p>      
        <div style="margin: 10px 0; padding: 10px; background-color: #f1f1f1; border-left: 4px solid #3f51b5;">
        <p><strong>Title:</strong> ${book.book_name}</p>
        <p><strong>Author:</strong> ${book.author_name}</p>
        <p><strong>Borrowed Date:</strong> ${date.toDateString()}</p>
        <p><strong>Due Date:</strong> ${new Date().toDateString()}</p>

      </div>
      <p><strong>Note:</strong>If you failed to returm book by today then you have to pay pnalty <strong>Rs 10</strong> per day.</p>
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
