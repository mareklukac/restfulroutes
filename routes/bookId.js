import express from "express";
import joi from "joi";
import library from "../library.js";

const router = express.Router();

const parseId = (id) => parseInt(id);

const scheme = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().required(),
  tags: joi.array().items(joi.string()).optional(),
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  if (!parseId(id)) {
    res.status(400).send("Invalid ID format supplied");
    return;
  }
  const foundBook = library.find((book) => book.id == id);
  if (!foundBook) {
    res.status(404).send("Book not found");
    return;
  }
  res.send(foundBook);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!parseId(id)) {
    res.status(400).send("Invalid ID format supplied");
    return;
  }
  const foundBook = library.find((book) => book.id == id);
  const foundBookId = library.indexOf(foundBook);
  if (foundBookId) {
    library.splice(foundBookId, 1);
    res.send(foundBook);
  } else {
    res.status(404).send("Book not found");
    return;
  }
  // library = library.filter((book) => book.id != id);
  // res.send(foundBook);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!parseId(id)) {
    res.status(400).send("Invalid ID format supplied");
    return;
  }
  const result = scheme.validate(req.body);
  const foundBook = library.find((book) => book.id == id);
  const foundBookId = library.indexOf(foundBook);
  if (result.error) {
    res.status(405).send("New book not valid");
    return;
  }
  if (!foundBook) {
    res.status(404).send("Book not found");
    return;
  }
  library[foundBookId] = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    tags: req.body.pages,
    id: foundBookId,
  };
  res.send(library[foundBookId]);
});
export default router;
