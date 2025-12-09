const booksTable = require("../models/book.model.js");
const authorsTable = require("../models/author.model.js");
const { sql } = require("drizzle-orm");
const db = require("../db/index.js");

const { eq, ilike } = require("drizzle-orm");

exports.getAllAuthors = async function (req, res) {
  const search = req.query.search;
  console.log("Search query param:", { search });

  if (search) {
    const authors = await db
      .select()
      .from(authorsTable)
      // .where(ilike(booksTable.title, `%${search}%`));
      .where(sql`to_tsvector('english', ${authorsTable.firstname}) @@ to_tsquery('english', ${search})`);
    return res.json(authors);
  }

  const authors = await db.select().from(authorsTable);
  return res.json(authors);
};

exports.getAuthorByID = async function (req, res) {
  const id = req.params.id;
  console.log("Parameter ID::::::" + id);

  const author = await db
    .select()
    .from(authorsTable)
    .where((table) => eq(table.id, id))
    .limit(1);

  if (author.length === 0) {
    return res.status(404).json({ message: `Author with id ${id} not found` });
  } else {
    return res.json(author);
  }
};

exports.createAuthor = async function (req, res) {
  console.log(req.headers);
  console.log(req.body);
  const { firstname, lastname, email } = req.body;

  const required = ["firstname", "lastname", "email"];

  for (let field of required) {
    if (!req.body[field] || req.body[field].trim() === "") {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  const [result] = await db.insert(authorsTable).values({ firstname, lastname, email }).returning({ id: authorsTable.id });

  return res.status(201).json({ message: "Author created succcesfuly", id: result.id });
};

exports.deleteAuthor = async function (req, res) {
  // const id = req.params.id;

  // await db.delete(authorsTable).where(eq(authorsTable.id, id));

  // return res.status(200).json({ message: `Author deleted` });

  const id = req.params.id;

  try {
    // 2) Ensure the author exists first -> if not found return 400 (per your request)
    const existing = await db.select().from(authorsTable).where(eq(authorsTable.id, id));

    if (!existing || existing.length === 0) {
      return res.status(400).json({ error: "author id not found" });
    }

    // 3) Delete
    await db.delete(authorsTable).where(eq(authorsTable.id, id));

    return res.status(200).json({ message: "Author deleted", id });
  } catch (err) {
    console.error("deleteAuthor error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getBooksByAuthorID = async function (req, res) {
  const books = await db.select().from(booksTable).where(eq(booksTable.authorId, req.params.id));
  return res.json(books);
};
