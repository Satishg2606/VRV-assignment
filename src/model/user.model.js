import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Role } from "./role.model.js";


const UserSchema = new Schema({
    fullName:{
        type:"String",
        required:true,
        trim:true,
        index:true,
    },
    email:{
        type:"String",
        required:true,
        unique: true,
        lowercase:true,
        trim:true,
    },
    role:{
        type:mongoose.Schema.ObjectId,
        ref:Role,
        required:true,
    },
    password:{
        type:"String",
        required:true,
    },
    refreshToken:{
        type:"String",
    }
},{timestamps:true});

//Password Encryption..
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password =await bcrypt.hash(this.password, 10);
    next();
});


UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateAccessToken = async function(){
    return await jwt.sign(
        {
            _id:this._id,
            email:this.email,
            role:this.role,
            fullName:this.fullName

        },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}
UserSchema.methods.generateRefreshToken = async function(){
    return await jwt.sign(
        {
            _id:this._id,
           
        }, process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}


export const User = mongoose.model("User",UserSchema);