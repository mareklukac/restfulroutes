import express from "express";
import joi from "joi";
import { Book } from "../seqDb.js";

const router = express.Router();

const parseId = (id) => parseInt(id);

const scheme = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().required(),
  tags: joi.array().items(joi.string()).optional(),
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!parseId(id)) {
    res.status(400).send("Invalid ID format supplied");
    return;
  }
  const foundBook = await Book.findOne({ where: { id: id } });
  if (!foundBook) {
    res.status(404).send("Book not found");
    return;
  }
  res.send(foundBook);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!parseId(id)) {
    res.status(400).send("Invalid ID format supplied");
    return;
  }
  const foundBook = await Book.findOne({ where: { id: id } });
  if (!foundBook) {
    res.status(404).send("Book not found");
    return;
  }
  Book.destroy({ where: { id: id } });
  res.send(foundBook);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!parseId(id)) {
    res.status(400).send("Invalid ID format supplied");
    return;
  }
  const result = scheme.validate(req.body);
  if (result.error) {
    res.status(405).send("New book not valid");
    return;
  }
  const foundBook = await Book.findOne({ where: { id: id } });
  if (!foundBook) {
    res.status(404).send("Book not found");
    return;
  }
  const updatedBook = await Book.update(req.body, { where: { id: id } });
  res.send(updatedBook);
});
export default router;
