import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const useMovie = () => {
    const [movies, setMovies] = useState();

    const saveMovies = async (movieData, successFunction, errorFunction) => {
        try {
            await axios.post('/movies', {
                movies: JSON.stringify(movieData)
            }).then(() => {
                successFunction();
            });
        } catch (error) {
            errorFunction();
        }
    }

    const editMovie = async (movieId, valuation, successFunction, errorFunction) => {
        try {
            await axios.put(`/movie/${movieId}`, {
                valuation: valuation
            }).then(response => {
                successFunction();
            });
        } catch (error) {
            errorFunction();
        }
    }

    const getMovies = async (successFunction, errorFunction) => {
        try {
            await axios.get('/movies').then(response => {
                setMovies(response.data.data.movies);
                successFunction();
            });
        } catch (error) {
            errorFunction();
        }
    }

    const deleteMovie = async (movieId, successFunction, errorFunction) => {
        try {
            await axios.delete(`/movie/${movieId}`).then(response => {
                successFunction();
            });
        } catch (error) {
            errorFunction();
        }
    }

    return  {
        saveMovies,
        editMovie,
        getMovies,
        deleteMovie,
        movies,
        setMovies
    }
}