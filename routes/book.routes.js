const express = require("express");
const router = express.Router();
// const { BOOKS } = require("../models/books");
const controller = require("../controllers/book.controller");
// const { getAllBooks, getBookByID } = require("../controllers/book.controller");

//routes
router.get("/", controller.getAllBooks);

router.get("/:id", controller.getBookByID);

router.post("/", controller.createBook);

router.delete("/:id", controller.deleteBook);

module.exports = router;
