import UserModel from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const secret_key = process.env.SECRET_KEY;

export const registerUserController = async (req,res) => {
    try {
        const { name, email, password, confirmpassword } = req.body
        
        if (!name || !email || !password || !confirmpassword) {
            return res.status(400).json({
                message:"please,fill all fields"
            })
        }

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                message:"Already register email"
            })
        }

        if (password !== confirmpassword) {
            return res.status(400).json({
                message:"password and confirm password must be same"
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)
        
        const newUser = new UserModel({name,email,password:hashPassword})
        const save = await newUser.save()
        
        return res.status(201).json({
            message: "user registerd successfully",
            data:save
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error
        })
    }
}

export const loginController = async (req,res) => {
    try {

        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(400).json({
                message:"please fill all fields"
            })
        }

        const user = await UserModel.findOne({email})
        
        if (!user) {
            return res.status(400).json({
                message:"user not register"
            })
        }

        const checkedPassword = await bcryptjs.compare(password,user.password)
        if (!checkedPassword) {
            return res.status(400).json({
            message:"check your password"
        })
        }
        
         // 3. JWT erstellen
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      secret_key,
      { expiresIn: "5h" }
        )
        
        res.cookie("token", token, {
             httpOnly: true,
            secure: true,
            sameSite:"None"
});
        return res.status(200).json({
            message: "login successfully",
            data:user
        })
    
    } catch (error) {
        return res.status(500).json({
            message:error.message || error
        })
    }
}



export const logoutController = async (req,res) => {
    try {
        const userid = req.userId
        
        res.clearCookie("token",{httpOnly:true,secure:false,sameSite:"None"})
        
        return res.status(200).json({
            message:"logout successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || error
        })
    }
}


export const getCurrentUserController = async (req, res) => {
    
    try {
        const _id = req.userId
        console.log(_id)
        const user = await UserModel.findById( _id ).select("-password  -token")

        if (!user) {
            return res.status(400).json({
                message:"user not found"
            })
        }

        return res.status(200).json({
            message: "current user",
            data:user
        })


        
    } catch (error) {
        return res.status(500).json({
            message:error.message || error
        })
    }
}