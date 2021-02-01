import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../bootstrap.min.css';

function AddMovieForm(){
    //"title", "poster", "description","genre_id"
    //local state variables
    const [movieTitle, setMovieTitle] = useState('');
    const [moviePoster, setmoviePoster] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieGenre, setMovieGenre] = useState('');

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
      }, []);

    //redux hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);

    //submit data to the database
    const handleSubmit = () => {
        console.log(`Add movie clicked! Title: ${movieTitle} Poster: ${moviePoster} Description: ${movieDescription} Genre: ${movieGenre}`);
        //dispatch the form data to redux-saga POST request
        dispatch({type: 'POST_MOVIE', payload: {
            title: movieTitle,
            poster: moviePoster,
            description: movieDescription,
            genre_id: movieGenre
        }});
        //return us to the movie list
        history.push('/');
    }

    //cancel button returns us to the movie list without submitting
    const handleCancel = () => {
        console.log('Cancel Pushed, redirecting to MovieList');
        history.push('/');
    }

    return(
        <div className="container">
                <h2>Add A Movie</h2>
                <label htmlFor="titleInput">Title:</label>
                <input className="titleInput" 
                    type="text" 
                    onChange={(event) => setMovieTitle(event.target.value)} 
                    placeholder="Enter Movie Title" 
                    value={movieTitle}
                />
                <br />
                <label htmlFor="posterInput">Image URL:</label>
                <input className="posterInput" 
                    type="url" 
                    onChange={(event) => setmoviePoster(event.target.value)} 
                    placeholder="Enter Poster Image URL" 
                    value={moviePoster}
                />
                <br />
                <label htmlFor="descriptionInput">Description:</label>
                <textarea className="descriptionInput" 
                    rows="3"
                    onChange={(event) => setMovieDescription(event.target.value)}
                    placeholder="Enter Movie Description"
                    value ={movieDescription}
                />
                <br />
                <select
                name="Genre"
                onChange={(event) => setMovieGenre(event.target.value)}
                >
                {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
                </select>
                <button onClick={handleSubmit}>Add Movie</button>
                <button onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default AddMovieForm;