import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';

function MovieDetails(){
    //redux hooks
    const history = useHistory();
    const movieDetails = useSelector(store => store.movieDetail);
    //debug to show what we get back from our reducer after saga has run
    console.log(movieDetails);

    const returnToList = () => {
        console.log('Returning to Movie List');
        history.push('/');
    }

    return(

        <Card key={movieDetails[0]?.title} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={movieDetails[0]?.poster} />
            <Card.Body>
            <Card.Title>{movieDetails[0]?.title}</Card.Title>
            <Card.Text>
                {movieDetails[0]?.description}
                <ListGroup variant="flush">
                        {movieDetails?.map(
                                movieDetail => {
                                    return(
                                        <ListGroup.Item key={movieDetail.genre_name}>{movieDetail.genre_name}</ListGroup.Item>
                                    );
                                }
                            )
                        }
                </ListGroup>
            </Card.Text>
            <Button variant="primary" onClick={returnToList}>Return to Movie List</Button>
            </Card.Body>
        </Card>
    )
}

export default MovieDetails;