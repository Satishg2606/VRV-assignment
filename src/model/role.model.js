import mongoose,{Schema} from 'mongoose';

// Roles :
const roleSchema = new Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    permissions:[{
        type:String
    }]
},
{timestamps:true});


export const Role = mongoose.model("Role",roleSchema)