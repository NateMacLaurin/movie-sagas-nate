import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'
import { Card, Button } from 'react-bootstrap';

function MovieList() {

    //redux hooks
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const history = useHistory();

    //on load fetch the movie list via redux-saga
    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const showDetails = (id) => {
        //dispatch the movie ID to redux-saga for database query
        dispatch({type: 'FETCH_DETAILS', payload: id});
        //redirect user to MovieDetails component page
        history.push('/details');
    }

    const toAddMovie = () => {
        //debug console log
        console.log('Add Movie Clicked!');
        //redirect user to the AddMovieForm component page
        history.push('/add');
    }

    return (
        <main>
            <h1>MovieList</h1>
            <button onClick={toAddMovie}>Add Movie</button>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <Card key={movie.id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={movie.poster} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Button variant="primary" onClick={() => {showDetails(movie.id)}}>Details</Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;