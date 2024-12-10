import mongoose from "mongoose";
import {createTokenForUser} from '../services/authentication.js';
import { createHmac, randomBytes } from 'crypto';


const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    },
    salt: {
        type: String
    },
    profileImageUrl: {
        type: String,
        default: '/images/default_User.png'
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }


}, { timestamps: true });


userSchema.pre("save", function (next) {

    const user = this; // 'this' pointing to the current user

    if (!user.isModified("password")) return; // If the password is not modified then simply return without hashing because do hasing with a hashed password would croupt the password.

    if (user.password !== user.confirmpassword) {
        const error = new Error("Password and Confirm Password must be the same");
        error.name = "PasswordMismatchError";
        return next(error);
    }

     
       const salt = randomBytes(16).toString();
       const hasedPassword = createHmac('sha256', salt).update(user.password).digest('hex');
       const hasedPassword2 = createHmac('sha256', salt).update(user.confirmpassword).digest('hex');

        this.salt = salt;
        this.password=hasedPassword;
        this.confirmpassword=hasedPassword2;

    next();

});


userSchema.static("matchPasswordAndGenerateToken", async function(email, password){

    const user = await this.findOne({email});

    if(!user) throw new Error("User not found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvideHash = createHmac('sha256', salt).update(password).digest('hex');

    // return hashedPassword===userProvideHash;

     if(hashedPassword!==userProvideHash) throw new Error("Invalid username or password");
    
     const token = createTokenForUser(user);
     return token;
})




const User = mongoose.model("User", userSchema);

export default User;