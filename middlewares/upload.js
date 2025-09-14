// middlewares/upload.js
import multer from 'multer';
import { AppError } from '../utils/appError.js';


// Configure storage
const storage = multer.memoryStorage()

// File filter
const fileFilter = (req, file, cb) => {

  if (!file) return cb(null, true);
  if (file.mimetype && !file.mimetype.startsWith('image/')) {
    return cb(new AppError('Only images are allowed!', 400), false);
  }
  cb(null, true);
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB default
  }
});

export default upload;