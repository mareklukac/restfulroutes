import express from "express";
import joi from "joi";
// import library from "../library.js";
import { Book, Tag } from "../seqDb.js";

const router = express.Router();

const scheme = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().required(),
  tags: joi.array().items(joi.string()).optional(),
});

// const newObject = (body) => {
//   const objectToPush = {
//     ...body,
//     id: library.length,
//   };
//   library.push(objectToPush);
//   return objectToPush;
// };

router.get("/", async (req, res) => {
  const books = await Book.findAll({ include: Tag }).catch((error) => {
    console.log(error);
  });
  if (!books) {
    res.send("No books found");
    return;
  }
  console.log(books);
  res.send(books);
  // res.send(library);
});

router.post("/", async (req, res) => {
  const result = scheme.validate(req.body);
  if (result.error) {
    res.status(405).send("New book not valid");
    return;
  }
  const book = await Book.create(req.body).catch((error) => {
    console.log(error);
  });
  const bookTags = req.body.tags;
  const tags = await Tag.bulkCreate([bookTags]).catch((error) => {
    console.log(error);
  });

  await book.addTag(tags, { through: "book_id" });

  res.send(book);
  console.log(book);
  // const object = newObject(req.body);
});

export default router;
