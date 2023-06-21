import { StatusCodes } from "http-status-codes"
import File from "../models/File.js";

export const uploadFile = async(req, res) => {
    console.log(req.file);

    try {
        const newFile = await File.create({
            filename:req.file.filename,
            filePath:req.file.path,
            size:req.file.size,
            fileMimetype:req.file.mimetype
        });

        return res.status(StatusCodes.OK).json({message:'file uploaded', newFile});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Something went wrong'})
    }
}