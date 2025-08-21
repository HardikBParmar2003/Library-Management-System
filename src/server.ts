import express from "express";
import "./worker/emailWorker";
import "./worker/dueDateWorker";
import "./worker/reminderWorker";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`📧 Worker running on http://localhost:${port}`);
});


