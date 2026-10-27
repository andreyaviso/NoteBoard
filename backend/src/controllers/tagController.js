import Tag from "../model/Tag.js";

export const createTag = async (req, res) =>{
    try {
        const {name} = req.body;

        if (typeof name !== "string" || !name.trim()){
            return res.status(400).json({
                message: "Tag name is required"
            })
        } 
        
        const newTag = new Tag({
            name: name.trim()
        });

        const savedTag = await newTag.save();
        res.status(201).json(savedTag);

    } catch (error) {
        if (error.code === 11000){
            return res.status(409).json({
                message: "Tag already exists"
            })
        }

        console.error("Error creating tag:", error);

        res.status(500).json({
            message: "Failed to create tag"
        })
    }
}

export const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find().sort({name:1});

        res.status(200).json(tags); // sends the retrieved tags back to frontend as JSON

    } catch (error) {
        console.error("Error fetching tags:", error)

        res.status(500).json({
            message: "Failed to fetch tags"
        })
    }   
}