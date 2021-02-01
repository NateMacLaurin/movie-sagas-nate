import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
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