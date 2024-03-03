import './styles/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Movies} from "./views/Movies";
import {Topbar} from "./Layout/Topbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MyMovies} from "./views/MyMovies";
import {PrimeReactProvider, PrimeReactContext} from 'primereact/api';

ReactDOM.render(
    <PrimeReactProvider>
        <BrowserRouter basename={"/"}>
            <Topbar/>
            <Routes>
                <Route path={"/"} element={<MyMovies/>}/>
                <Route path={"/search"} element={<Movies/>}/>
            </Routes>
        </BrowserRouter>
    </PrimeReactProvider>,
document.getElementById('root')
)
;