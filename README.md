# Tech Stack

1. Deno
2. Typescript
3. PostgreSQL

# Requirements

1. [**Deno**](https://deno.land/) installed
2. A [**PostgreSQL**](https://www.postgresql.org/) database

# Instructions

1. Create a database for this app
2. Rename `.env.example` to `.env`
3. Open `.env` and fill in your database info
4. Open the project folder in your terminal
5. Run `deno run --allow-net --allow-read --allow-env src/db/build-schema.ts` to build the database schema
6. Run `deno run --allow-net --allow-read --allow-env src/server.ts` to start the server

# Test Instructions

1. Create a test database for this app
2. Add the test database to `.env`
3. Open the project folder in your terminal
4. Run `deno run --allow-net --allow-read --allow-env src/db/build-schema.ts test` to build the test database schema
5. Run `deno run --allow-net --allow-read --allow-env src/server.ts test` to start the server in test mode
6. Run `deno test --allow-net` to run tests

# Endpoints

Base api url is http://localhost:4000/api

| METHOD | ENDPOINT     | Description                              |
| ------ | ------------ | ---------------------------------------- |
| GET    | /authors     | Returns all authors                      |
| GET    | /authors/:id | Returns a single author                  |
| POST   | /authors     | Creates and returns an author            |
| PUT    | /authors/:id | Updates and returns an author            |
| DELETE | /authors/:id | Deletes an author and the author's books |

| METHOD | ENDPOINT   | Description                                |
| ------ | ---------- | ------------------------------------------ |
| GET    | /books     | Returns all books or all books from author |
| GET    | /books/:id | Returns a single book                      |
| POST   | /books     | Creates and returns a book                 |
| PUT    | /books/:id | Updates and returns a book                 |
| DELETE | /books/:id | Deletes a book                             |

# Seeder

I created a small seeder to get the api going\
To use it, run `deno run --allow-net --allow-read --allow-env src/db/seeder.ts`

# Todo

1. Serve data with relations (send author with the list of books for that author and book with the author data)
2. More tests
