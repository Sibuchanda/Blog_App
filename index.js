import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import userRoute from './routes/user.js';
import blogRoute from './routes/blog.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import checkForAuthenticationCookie from './middleware/authentication.js';
import Blog from './models/blog.js';

const app = express();
dotenv.config();


const PORT = 8000;

//Connecting mongodb--
mongoose.connect('mongodb://127.0.0.1:27017/BlogWebApp')
.then(()=>{
    console.log("MongoDB connected successfully...");
}).catch(err =>{
    console.log(err);
})

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));  // This is for server images into the desktop statically
app.use(checkForAuthenticationCookie("token")); //As the cookie name is "token". That are set in the signin function



// app.get('/', async (req,res)=>{

//    const allBlogs = await Blog.find({}); 
//     return res.render("home",{user: req.user, blogs: allBlogs});  // As the req.user is set in checkForAuthenticationCookie() function.
// });
app.get('/', async (req,res)=>{
    return res.render("home");
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);


app.listen(PORT,()=>{
    console.log(`Server started at PORT:${PORT}`);
})
