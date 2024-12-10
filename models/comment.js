import mongoose, { Schema } from "mongoose";


const commentSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "Blog"  // Reference will be the model name of a schema
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"  // Reference will be the model name of a schema
    }

}, { timestamps: true });


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;