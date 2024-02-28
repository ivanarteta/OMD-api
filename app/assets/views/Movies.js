import React, {useState} from "react";

export const Movies = () => {
    const [movieData, setMovieData] = useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/ditto`);
            const data = await response.json();
            setMovieData(data);
        }
    }, []);

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