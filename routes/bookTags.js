import express from "express";
import library from "../library.js";

const router = express.Router();

router.get("/", (req, res) => {
  const tagsArray = [];
  library.forEach((book) => {
    book.tags.forEach((tag) => {
      if (!tagsArray.includes(tag)) tagsArray.push(tag);
    });
  });
  res.send(tagsArray);
});

export default router;
