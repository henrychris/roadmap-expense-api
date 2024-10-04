# Expense API

A simple REST API for tracking expenses. Built with NestJs, TypeORM and Node. The database used is Postgres. Ensure you specify a Postgres connection in the env file.

## Project setup

```bash
npm install
```

Add a `.env` file to the repository root with the following keys:

```properties
PORT
DATABASE_NAME
DATABASE_HOST
DATABASE_PORT
DATABASE_USERNAME
DATABASE_PASSWORD
JWT_SECRET
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
