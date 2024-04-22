import user from '../models/user.js';
import bcrypt from  "bcrypt"

const salt=10;

const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await user.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const signup = async (req, res) => {
    let data=req.body;
    let existingUser;
    try {
        existingUser = await user.findOne({ email: data.email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        let hashpassword=await bcrypt.hash(data.password,salt);
        data.password=hashpassword;
        const newUser = new user(
            {
                name:data.name,
                email:data.email,
                password:data.password,
                blogs:[]
            }
        );
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" ,user:newUser});

    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

const login = async (req, res) => {
    let data=req.body;
    let existingUser;
    try {
        existingUser = await user.findOne({ email: data.email });
        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        let isPasswordCorrect=await bcrypt.compare(data.password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        return res.status(200).json({message:"Logged in successfully",user:existingUser});
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


export  {getAllUsers,signup,login};