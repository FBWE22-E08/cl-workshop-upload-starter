import express from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/fileController.js';

const router =  express.Router();
//configure storage 
const storage = multer.diskStorage({
    destination:(req, file, cb) => { //where to store the file
        cb(null,'./uploads');
    },

    //name of the file 
    filename:(req, file, cb) => {
        console.log("mimetype file", file.mimetype);
        const ext = file.mimetype.split('/')[1];
        const originalNameNoExtension = file.originalname.split('.')[0];

        cb(null, `${originalNameNoExtension}-${Date.now()}.${ext}`);
    }
});

//initialize multer middleware
const upload = multer({storage:storage});


router.post('/create', upload.single('image'), uploadFile);

export default router;