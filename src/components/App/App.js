import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
import { useDispatch } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';

function App() {
  const dispatch = useDispatch();
  
  return (
    <div className="App">
      <Navbar sticky="top" bg="dark" variant="dark">
      <Navbar.Brand>Nate's Movie Sagas</Navbar.Brand>
      <Nav.Link href="#/">Home</Nav.Link>
      <Nav.Link href="#/add">Add Movie</Nav.Link>
      <Navbar.Toggle />
      </Navbar>
      {/* Main List Page*/}
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>     
        {/* Details page */}
        <Route path="/details">
          <MovieDetails />
        </Route>
        {/* Add Movie page */}
        <Route path="/add">
          <AddMovieForm />
        </Route>
      </Router>
    </div>
  );
}

export default App;