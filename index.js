const express = require("express");
require("dotenv/config");

const app = express();
const PORT = 8000;

const bookRouter = require("./routes/book.routes.js");
const { loggerMiddleware } = require("./middleware/logger.js");

const authorsRouter = require("./routes/author.routes.js");

//Middleware (Plugins)
app.use(express.json());

app.use(loggerMiddleware);

app.use("/books", bookRouter);
app.use("/authors", authorsRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT 8000`);
});
