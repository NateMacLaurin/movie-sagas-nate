-- Required Base Questions
-- Add the SQL that does what is asked in each question.

-- 1. Select all movies with the 'Adventure' genre? Use the id.

SELECT * FROM "movies"
JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
JOIN "genres" ON "genres".id = "movies_genres".genre_id
WHERE "genres".name = 'Adventure';

-- 2. Get the count of movies that have each genre.  
--  Make sure you get back all the genres!

Example Result:
---------------------------------
| genre_name    | movie_count   |
---------------------------------
| Adventure     | 4             |
---------------------------------
| Comedy        | 1             |
---------------------------------
| Drama         | 5             |
---------------------------------
| Disaster      | 0             |
---------------------------------

SELECT "genres".name, COUNT("genres".id) AS "movie_count" FROM "movies"
JOIN "movies_genres" ON "movies_genres".movie_id = "movies".id
JOIN "genres" ON "genres".id = "movies_genres".genre_id
GROUP BY "genres".name;

-- 3. Add the genre "Superhero" to "Star Wars".


-- 4. Remove the "Comedy" genre from "Titanic"



-- Stretch

-- 1. How would you get all movies and all of their genres, but only one row per movie? (For example, on the list page we want to see all the movies and all of the movies' genres that apply)
-- There're a few ways to do this, research ARRAY_AGG or JSON_AGG


-- 2. Delete the movie "The Martian". It has associated genres data...
-- You may need to check out the ON DELETE CASCADE for the table columns...