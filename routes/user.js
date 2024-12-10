import express from 'express';
import User from '../models/user.js';
import Blog from '../models/blog.js';

const router = express.Router();



router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    

    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie("token", token);
        const allBlogs = await Blog.find({}); 
        return res.render('dashboard',{user: req.user, blogs: allBlogs});
    } catch (error) {
        res.render('signin', {
            error: "Invalid email and password"
        });
    }

});

router.post('/signup', async (req, res) => {

    try {
        const { fullname, email, confirmpassword, password } = req.body;

        await User.create({
            fullname,
            email,
            password,
            confirmpassword
        });

        return res.render('signin');
    } catch (error) {
        if (error.name === "PasswordMismatchError") {
            return res.render("signup", {
                 error: error.message,
                 data: req.body,
                });
        }
    }

});


router.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.redirect("/");
})

export default router;