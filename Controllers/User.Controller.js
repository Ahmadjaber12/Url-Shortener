import User from "../DB/Models/User.js"
import bcrypt from 'bcryptjs';
import { CreateToken } from "../Middlewares/TokenCreation.js";
import auth from "../Middlewares/TokenVerification.js";

export const register=async(req,res)=>{

    const {Email,Username,password}=req.body;
    try
        {   const user=await User.create({Email,Username,password})
            res.status(201).json(user);
        }

    catch(error){
      
      const messages = error.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    
    }
    
}

export const login=async(req,res)=>{

    const {Email,password}=req.body;
    const user=await User.findOne({where:{Email}})
    if(user){
       let correctPass= await bcrypt.compare(password,user.password);
       if(correctPass){
            
            let token=CreateToken(user.id)          
             res.cookie('token', token, {
                httpOnly: true,
                secure: false, // set to true if using HTTPS
                maxAge: 2 * 60 * 60 * 1000, // 1 day
                });
                return res.status(200).json({message:"Successful login"});
       }
    }
    else{
         return res.json({message:"wrong email or password"})
    }

}
export const Profile=async(req,res)=>{

    const user=await User.findOne({where:{id:req.userId}});

    if(user){
       return res.status(200).json(user)
    }

}

export const UpdateProfile=async(req,res)=>{
    
    const { Username } = req.body;

    if (!Username) {
    return res.status(400).json({ message: "Please provide the new Username field" });
    }

    // Find the user by ID (assumes you're using req.userId from auth middleware)
   try{ const user = await User.findByPk(req.userId);

    if (!user) {
    return res.status(404).json({ message: "User not found" });
    }

    // Update username
    await User.update(
    { username: Username },
    { where: { id: req.userId } }
    );

    // Fetch the updated user
    const updatedUser = await User.findByPk(req.userId, {
    attributes: ["username", "UserN"]
    });

    return res.status(200).json(updatedUser);}

     catch(error){
      
      return res.status(400).json({ error });

    }

}