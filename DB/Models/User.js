import { sequelize } from '../Connection.js';
import { DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs';

export const User=sequelize.define('User',{
    Username:{
        type:DataTypes.STRING,
        validate:{  
             len: {
                args: [3],
                msg: 'Username must be at least 3 characters long',
             },
        }
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:{
                msg:"please enter a valid email"
            }
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
             len: {
                args: [3],
                msg: 'Password must be at least 3 characters long',
             },
        }
    }
    
},{hooks:{
    beforeCreate:async (user)=>{
            const saltRounds=8;
            user.password=await bcrypt.hash(user.password,saltRounds)
    }
}})

export default User;