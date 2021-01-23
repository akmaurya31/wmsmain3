import mongoose from 'mongoose';

const UserSchema= new mongoose.Schema({
    name: { type:String, required:true},
    lname: { type:String, required:true},
    email:{ type:String, required:true, unique:true, dropDups: true},
    mobile: { type:Number, required:true},
    password: { type:String, required:true},
    isAdmin:{ type:Boolean, required:true, default:false}
},
{
    timestamps: true,
}
);

const User= mongoose.model("user", UserSchema);

export default User;