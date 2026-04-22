import User from "../models/User.model.js";
import generateToken from "../utils/generatetoken.js";
import transporter from "../config/mailAuth.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const findUser = await User.findOne({email});
        if (findUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const response = await User.create({
            name,
            email,
            password
        })
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Welcome to our platform",
            // text: `Hello ${name},\n\nThank you for registering on our platform. We're excited to have you on board!\n\nBest regards,\nThe Team`,
            html:`<p>Hello ${name},</p>
            <p>Thank you for registering on our platform. We're excited to have you on board!</p>
            <p>Best regards,<br>The Team</p>`
        };
        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully");



        res.status(201).json({message: "User registered successfully", user: response});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const login = async (req, res) => {    
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({message: "Email and password are required"});
        }

        const findUser = await User.findOne({email});
        if (!findUser) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const isMatch = await findUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = generateToken(findUser._id);
        res.status(200).json({message: "User logged in successfully", token});

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {
        const { email } = req.params;
        const { name, password } = req.body;
        
        const updateData = {};
        if (name) updateData.name = name;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User account deleted successfully", user: deletedUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


