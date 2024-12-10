import mongoose, { Schema } from "mongoose";


const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageURL: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"  // Reference will be the model name of a schema
    }

}, { timestamps: true });



const Blog = mongoose.model("Blog", blogSchema);

export default Blog;