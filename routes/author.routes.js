const express = require("express");
const router = express.Router();
const authorcontroller = require("../controllers/author.controller");

router.get("/", authorcontroller.getAllAuthors);

router.get("/:id", authorcontroller.getAuthorByID);

router.post("/", authorcontroller.createAuthor);

router.delete("/:id", authorcontroller.deleteAuthor);


 router.get("/:id/books", authorcontroller.getBooksByAuthorID);

module.exports = router;
