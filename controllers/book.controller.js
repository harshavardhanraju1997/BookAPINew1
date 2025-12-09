const booksTable = require("../models/book.model.js");
const authorsTable = require("../models/author.model.js");
const { sql } = require("drizzle-orm");
const db = require("../db");

const { eq, ilike } = require("drizzle-orm");

exports.getAllBooks = async function (req, res) {
  res.setHeader("x-harsha", "harshavardhan");
  //res.json(BOOKS);
  const search = req.query.search;
  console.log("Search query param:", { search });

  if (search) {
    const books = await db
      .select()
      .from(booksTable)
      // .where(ilike(booksTable.title, `%${search}%`));
      .where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`);
    return res.json(books);
  }

  const books = await db.select().from(booksTable);
  return res.json(books);
};

exports.getBookByID = async function (req, res) {
  const id = req.params.id;

  const book = await db
    .select()
    .from(booksTable)
    .where((table) => eq(table.id, id))
    .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
    .limit(1);

  if (!book) {
    return res.status(404).json({ message: `Book with id ${id} not found` });
  } else {
    return res.json(book);
  }
};

exports.createBook = async function (req, res) {
  console.log(req.headers);
  console.log(req.body);
  const { title, description, authorId } = req.body;

  if (!title || title === "") res.status(400).json({ error: "title is required" });

  const [result] = await db.insert(booksTable).values({ title, description, authorId }).returning({ id: booksTable.id });

  return res.status(201).json({ message: "Book crreated succcesfuly", id: result.id });
};

exports.deleteBook = async function (req, res) {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: `Book deleted` });
};
