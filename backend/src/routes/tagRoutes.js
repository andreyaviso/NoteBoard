import express from "express";

import {createTag, getAllTags} from "../controllers/tagController.js"

const router = express.Router();

router.get("/", getAllTags);

router.post("/", createTag);

export default router;