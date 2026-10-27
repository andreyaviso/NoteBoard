import Note from "../model/Note.js"
import Tag from "../model/Tag.js" // to search for existing tags
import mongoose from "mongoose" // needed to validate ObjectId formatting

export async function getAllNotes(req, res){
    try{
        // .populate("tag") retrieves the referenced tag document, and includes both the id and name in the response
        const notes = await Note.find().populate("tag").sort({createdAt:-1}) 
        res.status(200).json(notes)
    } catch(error){
        console.error("Error in getAllNotes controller", error)
        res.status(500).json({message: "Internal server error"});
    }
} 

export async function getNoteById(req, res){
    try {
        const note = await Note.findById(req.params.id).populate("tag");
        if(!note) return res.status(404).json({message: "Note not found"})
        
        res.json(note)
    } catch (error) {
        console.error("Error in getNoteById controller", error)
        res.status(500).json({message: "Internal server error"});
    }
} 

export async function createNote(req, res){
    try{
        const {title, content, tag} = req.body // It extracts the title and content properties from req.body and stores them in variables with the same names.

        if (tag != null && tag !== "") {
            if (!mongoose.isObjectIdOrHexString(tag)) {
                return res.status(400).json({
                    message: "Invalid tag ID"
                });
            }

            const existingTag = await Tag.findById(tag);

            if (!existingTag) {
                return res.status(404).json({
                    message: "Tag not found"
                });
            }
        }

        const newNote = new Note({title, content, tag: tag || null})
        const savedNote = await newNote.save()
        res.status(201).json(savedNote)
    }catch (error){
        console.error("Error in createNote controller", error)
        res.status(500).json({message: "Internal server error"});
    }
} 

export async function updateNote(req, res){
    try {
        const { title, content, tag } = req.body;

        if (tag !== undefined && tag !== null && tag !== "") {
            if (!mongoose.isObjectIdOrHexString(tag)) {
                return res.status(400).json({
                    message: "Invalid tag ID"
                });
            }

            const existingTag = await Tag.findById(tag);

            if (!existingTag) {
                return res.status(404).json({
                    message: "Tag not found"
                });
            }
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                ...(tag !== undefined && { tag: tag || null })
            },
            {
                // tells mongoose to return the updated document instead of the original
                new: true,
                // tells mongoose to apply relevant schema validators to the fields being updated
                runValidators: true
            }
        ).populate("tag");

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error)
        res.status(500).json({message: "Internal server error"});
    }
} 

export async function deleteNote(req, res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deletedNote) return res.status(404).json({message: "Note not found"})
        res.json({message: "Note deleted sucessfully!"})
    } catch (error) {
        console.error("Error in deleteNote controller", error)
        res.status(500).json({message: "Internal server error"});
    }
} 