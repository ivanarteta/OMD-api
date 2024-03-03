import React, {useState} from "react";
import axios from "axios";
import {CustomDataTable} from "../CustomDataTable";
import '../styles/MyMovies.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Dialog } from 'primereact/dialog';
import {Button} from "primereact/button";


export const MyMovies = () => {
    const tableColumns = [
        {Header: 'ID', accessor: 'omdId'},
        {Header: 'Title', accessor: 'title'},
        {Header: 'Year', accessor: 'year'},
        {Header: 'Valuation', accessor: 'valuation'},
        {Header: '', accessor: 'edit'},
        {Header: '', accessor: 'delete'},
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [isDialogLoading, setIsDialogLoading] = useState(false);
    const [tableEntries, setTableEntries] = useState([]);
    const [myMoviesData, setMyMoviesData] = useState();
    const [showEditValuationDialog, setShowEditValuationDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState();
    const [valuationInputValue, setValuationInputValue] = useState(0);

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
                valuation: movie.valuation,
                edit: <div className={"edit_valuation_button"} onClick={() => {
                    setSelectedMovieId(movie.id);
                    setShowEditValuationDialog(true);
                }}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </div>,
                delete: <div className={"delete_button"} onClick={() => {
                    setSelectedMovieId(movie.id);
                    setShowDeleteDialog(true);
                }}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            }
        }));
    }, [myMoviesData]);

    const editDialogFooterContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowEditValuationDialog(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => {
                if (valuationInputValue < 0 || valuationInputValue > 10) {
                    alert('Valuation must be between 0 and 10');
                    return;
                }

                setIsLoading(true);
                setShowEditValuationDialog(false);

                try {
                    axios.put(`/movie/${selectedMovieId}`, {
                        valuation: valuationInputValue
                    }).then(response => {
                        getMyMovies();
                        setValuationInputValue(0);
                        setShowEditValuationDialog(false);
                    });
                } catch (error) {
                    setIsLoading(false);
                    setShowEditValuationDialog(true);
                    alert('Error saving valuation');
                }
            }} />
        </div>
    );

    const deleteDialogFooterContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowDeleteDialog(false)} className="p-button-text" />
            <Button label="Delete" icon="pi pi-check" onClick={() => {
                setIsLoading(true);
                setShowDeleteDialog(false);
                try {
                    axios.delete(`/movie/${selectedMovieId}`).then(response => {
                        getMyMovies();
                        setShowDeleteDialog(false);
                    });
                } catch (error) {
                    setIsLoading(false);
                    setShowDeleteDialog(true);
                    alert('Error deleting movie');
                }
            }} />
        </div>
    )

    const editMovieValuationDialog = () => {
        return (
            <Dialog
                header="Save valuation"
                visible={showEditValuationDialog}
                style={{ width: '50vw' }}
                onHide={() => setShowEditValuationDialog(false)}
                footer={editDialogFooterContent}
                loading={isDialogLoading}
            >
                <div className={'valuation_wrapper'}>
                    <p>Select your evaluation for this movie. Rate this from 0 to 10.</p>
                    <input type="number" min={0} max={10} onChange={(e) => setValuationInputValue(e.target.value)}/>
                </div>
            </Dialog>
        )
    }

    const deleteMovieDialog = () => {
        return (
            <Dialog
                header="Delete movie"
                visible={showDeleteDialog}
                style={{ width: '50vw' }}
                onHide={() => setShowDeleteDialog(false)}
                footer={deleteDialogFooterContent}
                loading={isDialogLoading}
            >
                <p>You are going to delete this movie as favourite. Are you sure?</p>
            </Dialog>
        )
    }

    const getMyMovies = () => {
        setIsLoading(true);
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
            {editMovieValuationDialog()}
            {deleteMovieDialog()}
        </div>

    );
}