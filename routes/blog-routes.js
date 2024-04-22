import express from 'express';
import { getAllBlogs,addBlog,getByID,updateBlog,deleteBlog,getBlogsByUserID} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/addblog", addBlog);
blogRouter.get("/:id", getByID);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getBlogsByUserID);

export default blogRouter;