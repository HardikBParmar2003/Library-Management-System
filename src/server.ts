import express from "express";
import http from "http";
import { PrismaClient } from "./generated/prisma";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.routes";
import { adminRouter } from "./routes/admin.routes";
import { bookRouter } from "./routes/book.routes";
import { userBookRouter } from "./routes/userbook.routes";
dotenv.config();


const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

const PORT = process.env.PORT || 10000;

app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/book", bookRouter);
app.use("/userbook", userBookRouter);

const start = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    server.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start app:", err);
  }
};

start();
