import React from "react";
import { useSelector } from "react-redux";

import LoginPage from "../LoginPage/LoginPage" ;
import ContentPage from "../ContentPage/ContentPage" ;

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

export default function MainPage() {
   let isAuth = useSelector ( state=>state.isAuth ) ;
   
    const components = {
        loginPage: <LoginPage/> ,
        contentPage : <ContentPage /> ,
    } ;

    return (
        <Router>
                <Routes>
                    <Route path="/" element={components[`${isAuth}`]}  />
                </Routes>
        </Router >
    )
}