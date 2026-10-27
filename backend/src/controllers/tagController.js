import Tag from "../model/Tag";

export const createtag = async (req, res) =>{
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