import Blog from "../models/blog.js";
import User from "../models/user.js";
import mongoose from "mongoose";

const getAllBlogs = async (req,res) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if(!blogs){
        return res.status(404).json({message:"No blogs found"});
    }
    console.log(blogs)
    res.status(200).json({blogs});
};

const addBlog = async (req,res) => {
    const {title,description,image,user}=req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
        // console.log(existingUser);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if(!existingUser){
        return res.status(404).json({message:"User not found"});
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    console.log("1");
    try {
        // existingUser.blogs.push(blog);
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();

    } catch (err) {
        console.log("2");
        return res.status(500).json({ message: err.message });
    }
    res.status(201).json(blog);
}

const getByID = async (req,res) => {
    const blogID=req.params.id;
    let foundBlog;
    try{
        foundBlog=await Blog.findById(blogID);
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!foundBlog){
        return res.status(404).json({message:"No blog found"});
    }
    res.status(200).json(foundBlog);
}

const updateBlog = async (req,res) => {
    const blogID=req.params.id;
    let foundBlog;
    try{
        foundBlog=await Blog.findByIdAndUpdate(blogID,req.body,{new:true});
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!foundBlog){
        return res.status(404).json({message:"No blog found"});
    }
    res.status(200).json(foundBlog);
}

const deleteBlog = async (req,res) => {
    const blogID=req.params.id;
    let foundBlog;
    try{
        foundBlog=await Blog.findByIdAndDelete(blogID).populate("user");
        await foundBlog.user.blogs.pull(foundBlog);
        await foundBlog.user.save();
    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!foundBlog){
        return res.status(404).json({message:"No blog found"});
    }
    res.status(200).json({message:"Blog deleted"});
}

const getBlogsByUserID=async(req,res)=>{
    let userID=req.params.id;
    let foundUser;
    try{
        foundUser=await User.findById(userID);

    }
    catch(err){
        return res.status(500).json({ message: err.message });
    }
    if(!foundUser){
        return res.status(404).json({message:"No user found"});
    }
    let blogs;
    try {
        blogs = await Blog.find({user:userID});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    if(!blogs){
        return res.status(404).json({message:"No blogs found"});
    }
    res.status(200).json({user:foundUser,blogs:blogs});
}

export {getAllBlogs,addBlog,getByID,updateBlog,deleteBlog,getBlogsByUserID};