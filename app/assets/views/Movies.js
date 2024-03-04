import React, {useState} from "react";
import axios from "axios";
import '../styles/Movies.scss';
import {CustomDataTable} from "../CustomDataTable";
import {toast} from "react-toastify";
import {useMovie} from "../hooks/useMovie";

export const Movies = () => {
    const tableColumns = [
        {Header: 'ID', accessor: 'id'},
        {Header: 'Title', accessor: 'title'},
        {Header: 'Year', accessor: 'year'}
    ];

    const [tableEntries, setTableEntries] = useState([]);
    const [movieData, setMovieData] = useState();
    const [inputText, setInputText] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { saveMovies } = useMovie();

    React.useEffect(() => {
        movieData && setTableEntries(movieData.map((movie, index) => {
            return {
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year,
                type: movie.Type,
            }
        }));
    }, [movieData]);

    const fetchSearchResults = async () => {
        try {
            const response = await axios.get('http://www.omdbapi.com', {
                params: {
                    apikey: '731e41f',
                    s: inputText
                }
            });
            setMovieData(response.data.Search);
        } catch (error) {
            toast.error("Error fetching data!")
        }
    };

    const saveMyMovies = async () => {
        setIsLoading(true);
        await saveMovies(
            movieData,
            () => {
                setIsLoading(false);
                setTableEntries([]);
                setInputText(undefined);
                toast.success("Movies saved!")
                window.location.href = "/";
            },
            () => {
                setIsLoading(false);
                toast.error("Error saving movies! Already you save it")
            }
        )
    }

    return (
        isLoading ? <p className={"loading"}>Saving...</p> : (
            <div>
                <div className={"search_wrapper"}>
                    <input
                        type="text"
                        placeholder={"Search your movies"}
                        onChange={(event) => setInputText(event.target.value)}
                        className={"movie_searcher"}
                    />
                    <button onClick={fetchSearchResults} className={"search_button"}>Search</button>
                </div>

                <div className={"favourite_movies"}>
                    {tableEntries.length > 0 && (
                        <div className={"movies_table"}>
                            <h2>Result </h2>
                            <CustomDataTable data={tableEntries} columns={tableColumns}/>
                            <div className={"save_movies_text"}>
                                <span>You can save this movies as favourites. Do you wan it?</span>
                                <button onClick={() => {saveMyMovies()}}>Save</button>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        )
    );
}