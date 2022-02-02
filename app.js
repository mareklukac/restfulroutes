import express from "express";
import booksRoutes from "./routes/book.js";
import bookIdRoutes from "./routes/bookId.js";
import bookTagsRoutes from "./routes/bookTags.js";
import { sequelize } from "./seqDb.js";

sequelize.sync().then(() => console.log("db is ready"));

const app = express();

app.use(express.json());

app.use("/book/tags", bookTagsRoutes);
app.use("/book", booksRoutes);
app.use("/book", bookIdRoutes);

app.get("/", (req, res) => {
  res.send("Hello from homepage.");
});

app.listen(3005, () => {
  console.log("Server running on port 3005");
});
