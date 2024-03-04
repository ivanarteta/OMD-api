import React, {useState} from "react";
import axios from "axios";
import {CustomDataTable} from "../CustomDataTable";
import '../styles/MyMovies.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Dialog } from 'primereact/dialog';
import {Button} from "primereact/button";
import {toast} from "react-toastify";
import {useMovie} from "../hooks/useMovie";


export const MyMovies = () => {
    const tableColumns = [
        {Header: 'ID', accessor: 'omdId'},
        {Header: 'Title', accessor: 'title'},
        {Header: 'Year', accessor: 'year'},
        {Header: 'Valuation', accessor: 'valuation'},
        {Header: '', accessor: 'edit'},
        {Header: '', accessor: 'delete'},
    ];

    const {movies, editMovie, getMovies, deleteMovie} = useMovie();

    const [isLoading, setIsLoading] = useState(true);
    const [isDialogLoading, setIsDialogLoading] = useState(false);
    const [tableEntries, setTableEntries] = useState([]);
    const [showEditValuationDialog, setShowEditValuationDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState();
    const [valuationInputValue, setValuationInputValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState();
    const [filteredTableEntries, setFilteredTableEntries] = useState([]);

    React.useEffect(() => {
        getMyMovies();
    }, []);

    React.useEffect(() => {
        if (!searchTerm) {
            setFilteredTableEntries(tableEntries);
        } else {
            const filteredData = tableEntries.filter(entry =>
                entry.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTableEntries(filteredData);
        }
    }, [searchTerm, tableEntries]);

    React.useEffect(() => {
        movies && setTableEntries(movies.map((movie, index) => {
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
    }, [movies]);

    const editDialogFooterContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowEditValuationDialog(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-check" onClick={() => {
                if (valuationInputValue < 0 || valuationInputValue > 5) {
                    toast.warn("Valuation must be between 0 and 10")
                    return;
                }

                setIsLoading(true);
                setShowEditValuationDialog(false);

                editMovie(
                    selectedMovieId,
                    valuationInputValue,
                    () => {
                        getMyMovies();
                        setValuationInputValue(0);
                        setShowEditValuationDialog(false);
                        toast.success("Movie successfully edited")
                    },
                    () => {
                        setIsLoading(false);
                        setShowEditValuationDialog(true);
                        toast.error("Error saving valuation!")
                    }
                )
            }} />
        </div>
    );

    const deleteDialogFooterContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setShowDeleteDialog(false)} className="p-button-text" />
            <Button label="Delete" icon="pi pi-check" onClick={() => {
                setIsLoading(true);
                setShowDeleteDialog(false);
                deleteMovie(
                    selectedMovieId,
                    () => {
                        getMyMovies();
                        setShowDeleteDialog(false);
                        toast.success("Movie successfully deleted!")
                    },
                    () => {
                        setIsLoading(false);
                        setShowDeleteDialog(true);
                        toast.error("Error deleting movie")
                    }

                );
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
                    <p>Select your evaluation for this movie. Rate this from 0 to 5.</p>
                    <input type="number" min={0} max={5} onChange={(e) => setValuationInputValue(e.target.value)}/>
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
        getMovies(
            () => {
                setIsLoading(false);
            },
            () => {
                setIsLoading(false);
                toast.error("Error fetching data")
             }
        )
    };

    return (
        <div>
            <div className={"favourite_movies"}>
                {isLoading ?
                    <p className={"loading"}>Loading...</p> :
                    (
                        tableEntries.length > 0 && (
                            <div className={"movies_table"}>
                                <input
                                    type="text"
                                    placeholder="Filter by title..."
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <CustomDataTable data={filteredTableEntries} columns={tableColumns}/>
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