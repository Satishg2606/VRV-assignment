import mongoose,{Schema} from 'mongoose';
import { Role } from './role.model.js';
import {User} from './user.model.js'

const expenseSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    },
    approvedBy:[{
        type:mongoose.Schema.ObjectId,
        ref:Role
    }],
    fundDisburse:{
        type:Boolean,
        required:true,
        default:false,
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:User

    }
})