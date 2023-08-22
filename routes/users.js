const express = require("express");
const multer = require("multer");

// This is needed for a more controlled configuration of multer, cb - callback function that multer calls.
// Plus adding some randomization to the original filename.
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storageConfig,
});
const router = express.Router();

router.get("/", (req, res) => {
  res.render("profiles");
});

router.get("/new-user", (req, res) => {
  res.render("new-user");
});

// A note on below, what we are doing below is using middleware for a specific route therefore /profiles is the route that will use multer not any other
router.post("/profiles", upload.single("image"), (req, res) => {
  const uploadedImageFile = req.file;
  const userData = req.body;

  console.log(uploadedImageFile);
  console.log(userData);

  res.redirect("/");
});

module.exports = router;
