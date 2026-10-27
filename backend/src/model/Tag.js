import mongoose from "mongoose";

const tagScheema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }

})

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;