import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dynamicUpload = ({
  prefix = "file",
  directory = "uploads",
  sizeLimit = 5 * 1024 * 1024,
  fieldName = "file",
  multiple = false,
  maxCount = 3,
  fields = [],
} = {}) => {
  const uploadDir = path.join(__dirname, `../uploads/${directory}`);

  // Create upload directory if not exists
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log(`Created upload folder: ${uploadDir}`);
    }
  } catch (err) {
    r;
    console.error("Failed to create uploads folder:", err);
    return (req, res, next) => {
      res.status(500).json({ error: "Failed to prepare upload directory." });
    };
  }
  function generateFourDigitNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const uniqueName = `${prefix}-${Date.now()}${generateFourDigitNumber()}${path.extname(
        file.originalname
      )}`;
      cb(null, uniqueName);
    },
  });

  const multerInstance = multer({
    storage,
    limits: { fileSize: sizeLimit },
  });

  // Choose uploader mode
  let uploader;
  if (fields.length > 0) {
    uploader = multerInstance.fields(fields); // multi-field
  } else if (multiple) {
    uploader = multerInstance.array(fieldName, maxCount); // multiple files (same field)
  } else {
    uploader = multerInstance.single(fieldName); // single file
  }

  return (req, res, next) => {
    uploader(req, res, (err) => {
      if (err instanceof multer.MulterError)
        return res.status(400).json({ error: err.message });
      if (err) return res.status(400).json({ error: err.message });

      // ---- Multi-field upload ----
      if (fields.length > 0 && req.files && !Array.isArray(req.files)) {
        for (const key in req.files) {
          req[key] = req.files[key].map(
            (file) => `/uploads/${directory}/${file.filename}`
          );
        }
        req.files = Object.values(req.files)
          .flat()
          .map((file) => `/uploads/${directory}/${file.filename}`);
      }
      // ---- Multiple files (same field) ----
      else if (Array.isArray(req.files)) {
        req.files = req.files.map(
          (file) => `/uploads/${directory}/${file.filename}`
        );
      }
      // ---- Single file ----
      else if (req.file) {
        const fileUrl = `/uploads/${directory}/${req.file.filename}`;
        req.files = [fileUrl];
        delete req.file;
      } else {
        req.files = [];
      }

      next();
    });
  };
};

export default dynamicUpload;
