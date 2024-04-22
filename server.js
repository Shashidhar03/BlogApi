import express from "express";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import mongoose from "mongoose";
import cors from "cors";

const app=express();
mongoose.connect("mongodb+srv://shashidhar:9573389923@cluster0.faydhvs.mongodb.net/blogDB")
.then(() => {
    console.log('Database connected');
})
.catch((err) => {console.log(err)});

app.use(cors());
app.use(express.json());
app.use("/api",router);
app.use("/api/blogs",blogRouter);


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});


