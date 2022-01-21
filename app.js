const express = require("express");
const res = require("express/lib/response");
const joi = require("joi");
const app = express();

app.use(express.json());

const library = [
  {
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
    pages: 300,
    tags: ["adventure", "history"],
    id: 0,
  },
  {
    title: "The Unbearable Lightness of Being",
    author: "Milan Kundera",
    pages: 250,
    tags: ["philosophical", "novel"],
    id: 1,
  },
  {
    title: "Nausea",
    author: "Jean-Paul Sartre",
    pages: 120,
    tags: ["philosophical", "existentialism", "novel"],
    id: 2,
  },
];

const libraryRouter = express.Router();

libraryRouter
  .route("/book")
  .get((req, res) => {
    res.send(library);
  })
  .post((req, res) => {
    const scheme = joi.object({
      title: joi.string().required(),
      author: joi.string().required(),
      pages: joi.number().required(),
      tags: joi.array().items(joi.string()).optional(),
    });
    const result = scheme.validate(req.body);
    if (result.error) {
      res.status(405).send("New book not valid");
    } else {
      index = library.length;
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        tags: req.body.tags,
        id: index,
      };
      library.push(newBook);
      res.send("successful operation");
    }
  });

libraryRouter.route("/book/tags").get((req, res) => {
  const bookTags = [];
  library.forEach((book) => {
    bookTags.push(book.tags);
  });
  res.send(bookTags);
});

libraryRouter
  .route("/book/:id")
  .get((req, res) => {
    let idFound = false;
    const parsedId = parseId(req.params.id);

    if (isNaN(parsedId)) {
      res.status(400).send("Invalid ID format supplied");
    }

    library.forEach((book) => {
      if (parsedId === book.id) {
        res.send(book);
        idFound = true;
      }
    });
    if (idFound === false) res.status(404).send("invalid ID");
  })
  .put((req, res) => {
    const parsedId = parseId(req.params.id);
    if (isNaN(parsedId)) {
      res.status(400).send("Invalid ID format supplied");
    }

    const book = library.find((bookToFind) => bookToFind.parsedId);
    if (!book) res.status(404).send("invalid ID");

    const scheme = joi.object({
      title: joi.string().required(),
      author: joi.string().required(),
      pages: joi.number().required(),
      tags: joi.array().items(joi.string()).optional(),
    });
    const result = scheme.validate(req.body);
    if (result.error) {
      res.status(405).send("New book not valid");
    } else {
      // index = library.map((x) => x.parsedId).indexOf(parsedId);
      library[parsedId] = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        tags: req.body.tags,
        id: parsedId,
      };
      res.send(library);
    }
  })
  .delete((req, res) => {
    res.send("im book DELETE");
  });

app.use(libraryRouter);

app.listen(3003, () => {
  console.log("Server running on port 3003");
});

const parseId = (id) => parseInt(id);
