import React from 'react';
import { Outlet } from 'react-router-dom';


const MoviesModule = () => {
    return (
        <div>
             {/* <h1>Movies Module</h1> */}
            <Outlet></Outlet>
        </div>
    );
}

export default MoviesModule;
