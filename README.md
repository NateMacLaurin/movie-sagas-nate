# Nate's Movie Sagas

## Description

Given a list of movies with some information about each movie, I was tasked with displaying that information on the DOM. 

This full-stack application uses JavaScript React, Redux, and Redux-Sagas to handle DOM scripting. React-Boostrap for styling. Axios for HTTP client, Express for HTTP server, and postgres SQL for the database.

The application uses two main databases with a many<->many relationship, and a junction table.
This application features redux sagas to unify all client HTTP requests through axios in one location at index.js.

## Installation/Setup

Create a `pizza_parlor` database in PostgreSQL. Import `database.sql` in PostgreSQL to create and fill tables with starter data.

```
npm install
npm run server
```
```
npm run client
```
