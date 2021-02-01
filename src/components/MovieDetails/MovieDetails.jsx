import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function MovieDetails(){

    const history = useHistory();
    const movieDetails = useSelector(store => store.movieDetail);
    //debug to show what we get back from our reducer after saga has run
    console.log(movieDetails);

    const returnToList = () => {
        console.log('Returning to Movie List');
        history.push('/');
    }

    return(
        <div className="detailView">
            <h3>{movieDetails[0]?.title}</h3>
            <img src={movieDetails[0]?.poster} alt={movieDetails[0]?.title} />
            <p>{movieDetails[0]?.description}</p>
            <ul>
                {movieDetails?.map(movieDetail => {return(<li key={movieDetail.genre_name}>{movieDetail.genre_name}</li>);})}
            </ul>
            <button onClick={returnToList}>Return to Movie List</button>
        </div>
    )
}

export default MovieDetails;