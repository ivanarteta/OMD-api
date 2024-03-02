import React, {useState} from "react";
import axios from "axios";
import {CustomDataTable} from "../CustomDataTable";
import '../styles/MyMovies.scss';

export const MyMovies = () => {
    const tableColumns = [
        {Header: 'ID', accessor: 'omdId'},
        {Header: 'Title', accessor: 'title'},
        {Header: 'Year', accessor: 'year'},
        {Header: 'Valuation', accessor: 'valuation'}
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [tableEntries, setTableEntries] = useState([]);
    const [myMoviesData, setMyMoviesData] = useState();

    React.useEffect(() => {
        getMyMovies();
    }, []);

    React.useEffect(() => {
        myMoviesData && setTableEntries(myMoviesData.map((movie, index) => {
            return {
                id: movie.id,
                omdId: movie.omdId,
                title: movie.title,
                year: movie.year,
                valuation: movie.valuation
            }
        }));
    }, [myMoviesData]);

    const getMyMovies = () => {
        try {
             axios.get('/movies').then(response => {
                 setIsLoading(false);
                 setMyMoviesData(response.data.data.movies);
             });
        } catch (error) {
            alert('Error fetching data');
        }
    };

    return (
        <div>
            <div className={"favourite_movies"}>
                {isLoading ?
                    <p className={"loading"}>Loading...</p> :
                    (
                        tableEntries.length > 0 && (
                            <div className={"movies_table"}>
                                <CustomDataTable data={tableEntries} columns={tableColumns}/>
                            </div>
                        )
                    )
                }
            </div>
        </div>

    );
}