import express from "express";
import { createVideo } from "../controllers/video.js";
import { getUploadedImg } from "../controllers/Image.js";
import Video from '../models/Video.js';
const router = express.Router();

// http://localhost:5000/api/videos/
router.post("/", createVideo);
router.get('/', getUploadedImg);
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
  
    try {
      if (!id) {
        res.status(400).json({ error: 'Invalid video ID' });
        return;
      }
  
      const video = await Video.findById(id);
      if (!video) {
        res.status(404).json({ error: 'Video not found' });
        return;
      }
  
      res.status(200).json({ videoUrl: video.videoUrl });
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
export default router;