import express from "express";
import auth from "../../controllers/expert/auth.js";
import multer from "multer";
import uploadDocuments from "../../controllers/expert/documents.controller.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});
const upload = multer({ storage: storage });

router.post("/register", auth.createAccount);
router.post("/login", auth.expertLogin);

router.post(
  "/upload/:userID",
  upload.fields([
    { name: "selfie_or_logo", maxCount: 1 },
    { name: "license_or_certificate", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
  ]),
  uploadDocuments
);

const expertRouter = router;

export default expertRouter;
