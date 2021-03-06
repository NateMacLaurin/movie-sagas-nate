import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails);
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('POST_MOVIE', postNewMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all movies:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch(err) {
        console.log('get all error', err);
    }
        
}

function* fetchAllGenres() {
    //get all genres from the DB for the dropdown selector on add movie page
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all genres:', genres.data)
        yield put({type: 'SET_GENRES', payload: genres.data});
    } catch(err) {
        console.log(`ERROR in fetchAllGenres saga: ${err}`);
    }
}

function* fetchDetails(action) {
    //get details of the clicked movie from the DB by
    try {
        const movieDetail = yield axios.get(`/api/movie/${action.payload}`);
        console.log(movieDetail);
        yield put({ type: 'SET_MOVIE_DETAIL', payload: movieDetail.data });
    } catch(err) {
        console.log('Error in fetchDetails saga:', err);
    }
}

//saga to send data from AddMovieForm component to database POST request
function* postNewMovie(action) {
    try {
        //debug log
        console.log(`In postNewMovie: ${action.payload}`);
        //send new movie to the server
        yield axios.post(`/api/movie/`, action.payload);
        //now GET all movies after POST completes to populate the movies reducer with new data
        yield put({type: 'FETCH_MOVIES'});
    } catch(err) {
        console.log(`ERROR in postNewMovie: ${err}`);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store one movie for details page
const movieDetail = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAIL':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        movieDetail,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
