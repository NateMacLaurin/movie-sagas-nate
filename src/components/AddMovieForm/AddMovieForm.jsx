import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function AddMovieForm(){

    //local state variables
    const [movieTitle, setMovieTitle] = useState('');
    const [moviePoster, setmoviePoster] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieGenre, setMovieGenre] = useState('');

    //redux hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const genres = useSelector(store => store.genres);

    //submit data to the database
    const handleSubmit = () => {
        //dispatch the form data to redux-saga POST request
        dispatch({type: 'POST_MOVIE', payload: {
            title: movieTitle,
            poster: moviePoster,
            description: movieDescription,
            genre: movieGenre
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
        <>
            <input type="text" 
                onChange={(event) => setMovieTitle(event.target.value)} 
                placeholder="Enter Movie Title" 
                value={movieTitle}
            />
            <br />
            <input type="url" 
                onChange={(event) => setmoviePoster(event.target.value)} 
                placeholder="Enter Movie Poster Image URL" 
                value={moviePoster}
            />
            <br />
            <input type="textarea" 
                onChange={(event) => setMovieDescription(event.target.value)}
                placeholder="Enter Movie Description"
                value ={movieDescription}
            />
            <br />
            <select
            name="Genre"
            onChange={(event) => setMovieGenre(event.target.value)}
            >
            {genres.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
            </select>
            <button type="submit" onClick={handleSubmit}>Add Movie</button>
            <button onClick={handleCancel}>Cancel</button>
        </>
    )
}

export default AddMovieForm;