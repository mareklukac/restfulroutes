import express from "express";
import library from "../library.js";
import { Tag } from "../seqDb.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // const tagsArray = [];
  // library.forEach((book) => {
  //   book.tags.forEach((tag) => {
  //     if (!tagsArray.includes(tag)) tagsArray.push(tag);
  //   });
  // });
  // res.send(tagsArray);
  const tags = await Tag.findAll();
  res.send(tags);
});

export default router;
