# Tech Stack

1. Deno
2. Typescript
3. PostgreSQL

# Requirements

1. [**Deno**](https://deno.land/) installed
2. A [**PostgreSQL**](https://www.postgresql.org/) database

# Instructions

1. Create your database for this app
2. Rename `.env.example` to `.env`
3. Open `.env` and fill in your database info
4. Open the project folder in your terminal
5. Run `deno run --allow-net --allow-read --allow-env src/server.ts` to start the server

# Test Instructions

1. Create a test database for this app
2. Run `deno run --allow-net --allow-read --allow-env src/server.ts test` to start the server in test mode
3. Run `deno test --allow-net` to run tests

# Endpoints

1. http://localhost:4000/api/authors
2. http://localhost:4000/api/authors/:id
3. http://localhost:4000/api/books
4. http://localhost:4000/api/books/:id

GET request to http://localhost:4000/api/authors returns all authors\
GET request to http://localhost:4000/api/authors/:id returns a single author\
POST request to http://localhost:4000/api/authors creates and returns an author\
PUT request to http://localhost:4000/api/authors/:id updates and returns an author\
DELETE request to http://localhost:4000/api/authors/:id deletes an author and the author's books

GET request to http://localhost:4000/api/books returns all books\
GET request to http://localhost:4000/api/books/:id returns a single book\
POST request to http://localhost:4000/api/books creates and returns a book\
PUT request to http://localhost:4000/api/books/:id updates and returns a book\
DELETE request to http://localhost:4000/api/books/:id deletes a book

# Todo

1. Serve data with relations (send author with the list of books for that author and book with the author data)
