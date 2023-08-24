const express = require("express");
const multer = require("multer");

const db = require("../data/database");

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

router.get("/", async (req, res) => {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", (req, res) => {
  res.render("new-user");
});

// A note on below, what we are doing below is using middleware for a specific route therefore /profiles is the route that will use multer not any other
router.post("/profiles", upload.single("image"), async (req, res) => {
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection("users").insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
  });

  res.redirect("/");
});

module.exports = router;
