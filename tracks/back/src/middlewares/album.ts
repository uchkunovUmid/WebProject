import multer from "multer";
import config from "../config";
import {randomUUID} from "crypto";
import path from "path";


const storage = multer.diskStorage({
    destination:(req,file,callback)=> {
        callback(null,config.albumPath)
    },
    filename(req, file, callback) {
        callback(null, randomUUID() + path.extname(file.originalname));
    },
});

export const albumRoot = multer({ storage });