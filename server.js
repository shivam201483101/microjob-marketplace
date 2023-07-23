import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from 'path';
const __dirname = path.resolve();


const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
const MONGO="mongodb+srv://Shivampandey:shivam%40123@cluster23.lzflq9e.mongodb.net/fiv?retryWrites=true&w=majority&";
//MONGO = mongodb+srv://root:root@cluster0.yckkfgk.mongodb.net/fiv?retryWrites=true&w=majority&

const connect = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use(express.static(path.join(__dirname, "./dist")));
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,"./dist/index.html"));

})
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
