import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const filter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.png' || ext === '.jpeg') {
        cb(null, true);
    } else {
        cb(new Error('Only Images Allowed'));
    }
};

export const upload = multer({ storage, fileFilter: filter });
