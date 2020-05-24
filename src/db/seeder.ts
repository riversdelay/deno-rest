import { client } from "./client.ts";
import { IAuthor, IBook } from "../types.ts";

await client.connect();

const authors: Omit<IAuthor, "id">[] = [
  {
    name: "George R. R. Martin"
  },
  {
    name: "J. K. Rowling"
  },
  {
    name: "J. R. R. Tolkien"
  }
];

const insertAuthorSQL = "INSERT INTO authors(name) VALUES($1) RETURNING id;";

const insertAuthorsResult = await client.multiQuery(
  authors.map(author => ({
    text: insertAuthorSQL,
    args: Object.values(author)
  }))
);

const [firstAuthorId, secondAuthorId, thirdAuthorId] = insertAuthorsResult.map(
  result => result.rows[0][0]
);

const books: Omit<IBook, "id">[] = [
  {
    authorId: firstAuthorId,
    title: "A Game of Thrones",
    year: 1996,
    pages: 694,
    genre: "Fantasy",
    language: "English",
    edition: "US first edition",
    isbn: "0553103547"
  },
  {
    authorId: firstAuthorId,
    title: "A Clash of Kings",
    year: 1999,
    pages: 761,
    genre: "Fantasy",
    language: "English",
    edition: "US first edition",
    isbn: "0553108034"
  },
  {
    authorId: firstAuthorId,
    title: "A Storm of Swords",
    year: 2000,
    pages: 973,
    genre: "Fantasy",
    language: "English",
    edition: "US first edition",
    isbn: "0553106635"
  },
  {
    authorId: firstAuthorId,
    title: "A Feast for Crows",
    year: 2005,
    pages: 753,
    genre: "Fantasy",
    language: "English",
    edition: "US first edition",
    isbn: "0553801503"
  },
  {
    authorId: firstAuthorId,
    title: "A Dance with Dragons",
    year: 2011,
    pages: 1016,
    genre: "Fantasy",
    language: "English",
    edition: "US first edition",
    isbn: "9780553801477"
  },
  {
    authorId: secondAuthorId,
    title: "Harry Potter and the Philosopher's Stone",
    year: 1997,
    pages: 223,
    genre: "Fantasy",
    language: "English",
    edition: "UK edition",
    isbn: "0747532699"
  },
  {
    authorId: secondAuthorId,
    title: "Harry Potter and the Chamber of Secrets",
    year: 1998,
    pages: 251,
    genre: "Fantasy",
    language: "English",
    edition: "UK edition",
    isbn: "0747538492"
  },
  {
    authorId: secondAuthorId,
    title: "Harry Potter and the Prisoner of Azkaban",
    year: 1999,
    pages: 317,
    genre: "Fantasy",
    language: "English",
    edition: "UK edition",
    isbn: "0747542155"
  },
  {
    authorId: secondAuthorId,
    title: "Harry Potter and the Goblet of Fire",
    year: 2000,
    pages: 640,
    genre: "Fantasy",
    language: "English",
    edition: "UK edition",
    isbn: "0747550999"
  },
  {
    authorId: secondAuthorId,
    title: "Harry Potter and the Order of the Phoenix",
    year: 2003,
    pages: 766,
    genre: "Fantasy",
    language: "English",
    edition: "Original UK edition",
    isbn: "0747551006"
  },
  {
    authorId: secondAuthorId,
    title: "Harry Potter and the Half-Blood Prince",
    year: 2005,
    pages: 607,
    genre: "Fantasy",
    language: "English",
    edition: "Original UK edition",
    isbn: "0747581088"
  },
  {
    authorId: secondAuthorId,
    title: "Harry Potter and the Deathly Hallows",
    year: 2007,
    pages: 607,
    genre: "Fantasy",
    language: "English",
    edition: "Original UK edition",
    isbn: "0545010225"
  },
  {
    authorId: thirdAuthorId,
    title: "The Fellowship of the Ring",
    year: 1986,
    pages: 458,
    genre: "Fantasy",
    language: "English",
    edition: "Turtleback School & Library ed.",
    isbn: "0808520768"
  },
  {
    authorId: thirdAuthorId,
    title: "The Two Towers",
    year: 1986,
    pages: 398,
    genre: "Fantasy",
    language: "English",
    edition: "Turtleback Scho",
    isbn: "0812417852"
  },
  {
    authorId: thirdAuthorId,
    title: "The Return of the King",
    year: 1986,
    pages: 491,
    genre: "Fantasy",
    language: "English",
    edition: "Perfection Learning edition",
    isbn: "0812417674"
  }
];

const insertBookSQL = `
  INSERT INTO
    books
      (authorId, title, year, pages, genre, language, edition, isbn)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8);
`;

await client.multiQuery(
  books.map(book => ({
    text: insertBookSQL,
    args: Object.values(book)
  }))
);

await client.end();
