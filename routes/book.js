import express from "express";
import joi from "joi";
import library from "../library.js";

const router = express.Router();

const scheme = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  pages: joi.number().required(),
  tags: joi.array().items(joi.string()).optional(),
});

const newObject = (body) => {
  const objectToPush = {
    ...body,
    id: library.length,
  };
  library.push(objectToPush);
  return objectToPush;
};

router.get("/", (req, res) => {
  res.send(library);
});

router.post("/", (req, res) => {
  const result = scheme.validate(req.body);
  if (result.error) {
    res.status(405).send("New book not valid");
  } else {
    const object = newObject(req.body);
    res.send(object);
  }
});

export default router;
