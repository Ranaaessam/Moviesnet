import React, { createContext, useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from "uuid";

export const MoviesContext = createContext();

const MoviesContextProvider = ({ children }) => {
    const [moviesArr, setMoviesArr] = useState([]);
    console.log("before add movies");
    console.log(moviesArr);

    const addMovie = useCallback((data) => {
        console.log("Entered the addmovie fun");

        setMoviesArr(moviesArr => [...moviesArr, { ...data, id: uuid() }]);
    }, [moviesArr]); 

    console.log("after add movies");
    console.log(moviesArr);


    const contextValue = useMemo(() => ({
        moviesArr,
        addMovie,
        setMoviesArr
    }), [moviesArr, addMovie]);

    return (
        <MoviesContext.Provider value={contextValue}>
            {children}
        </MoviesContext.Provider>
    );
}

export default MoviesContextProvider;
