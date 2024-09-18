import { NextFunction, Request, Response } from "express";
import cloudinary from "./cloudinaryConfig";

export async function uploadFile(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
      req.body.image = null;
      return next();
  }

  console.log("File received:", req.file); 

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) {
          console.error("Failed to upload to Cloudinary", error);
          return res.status(500).json({ message: "Failed to upload to Cloudinary" });
        }

        console.log("Upload result:", result); 
        req.body.image = result?.url;
        next();
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Failed to upload file", error);
    return res.status(500).json({ message: "Failed to upload file" });
  }
}
