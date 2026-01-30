import { uploadToCloudiary } from "../helpers/uploadToCloudiary.helper";
import { Request, Response, NextFunction } from "express";

export const uploadSingle = async (req: Request, res: Response, next:NextFunction): Promise<void> => {
  if (req["file"]) {
    const link = await uploadToCloudiary(req["file"].buffer);
    req.body[req["file"].fieldname] = link;
    next();
  }
  else {
    next();
  }
}

export const uploadFields = async (req, res, next) => {
  try {
    if (req.files) {
      for (const key in req.files) {
        const links: string[] = [];
        for (const file of req.files[key]) {
          const link = await uploadToCloudiary(file.buffer);
          links.push(link);
        }
        req.body[key] = links;
      }
    }
    next();
  } catch (error) {
    console.error("Upload middleware error:", error);
    next(error); 
  }
};
