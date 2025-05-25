import jwt from "jsonwebtoken";

export const CreateToken=(id,secret="Ahmad123",expiresIn='1h')=>{
    
   let token= jwt.sign({id:id},secret,{expiresIn})

   return token;
}