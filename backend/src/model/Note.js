import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        content:{
            type: String,
            required: true
        },

        tag: {
            // storing the MongoDB ID of the tag
            type: mongoose.Schema.Types.ObjectId,
            // tells Mongoose which model the ObjectId refers to 
            // from Tag.js -> "const Tag = mongoose.model("Tag", tagSchema)
            ref: "Tag",
            default: null
        }
    },
    { 
        timestamps: true
    } 
)

const Note = mongoose.model("Note", noteSchema)

export default Note