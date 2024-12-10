import express from 'express';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// ========= Storing Cover Image using Multer ===========
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    }
  })

const upload = multer({ storage: storage });


router.get("/add-new", (req,res)=>{

    return res.render("addBlog",{
        user: req.user,
    });
});

router.get("/:id", async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId:req.params.id }).populate("createdBy");

  return res.render("blog",
    {user: req.user,
    blog: blog,
    comments
  });

})


router.post("/", upload.single('coverImageURL'), async (req,res)=>{
   
    const {title, body, coverImageURL} = req.body;

    const blog = await Blog.create({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
     })

    return res.redirect(`/blog/${blog._id}`);
});


//================== Handling comment ============

router.post("/comment/:blogId", async (req,res)=>{

       await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
       });

       return res.redirect(`/blog/${req.params.blogId}`);
})









export default router;
