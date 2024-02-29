import React, {useState} from "react";
import axios from "axios";

export const Movies = () => {
    const [movieData, setMovieData] = useState();

    React.useEffect( () => {
        fetchSearchResults().then(r => console.log(r));
    }, []);

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get('http://www.omdbapi.com', {
                params: {
                    apikey: '731e41f',
                    s: 'harry+potter'
                }
            });
           console.log('Response:', response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <h1>Movie Data</h1>
            {movieData && (
                <div>
                    <h2>Title: {movieData.Title}</h2>
                    <p>Year: {movieData.Year}</p>
                    <p>Plot: {movieData.Plot}</p>
                </div>
            )}
        </div>
    );
}