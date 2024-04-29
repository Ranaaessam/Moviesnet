import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./Moviesapicss.css";

const Moviesapi = () => {
    const [moviesArr, setMoviesArr] = useState([]);

    useEffect(() => {
        const jsonURL ="http://localhost:1000/results";

        axios.get(jsonURL)
            .then(res => {
           
                setMoviesArr(res.data || []); 
            })
            .catch(err => {
                console.error('An error occurred while fetching movie data:', err);
                setMoviesArr([]);
            });
    }, []); 

    return (
        <div className="movies-container">
            {moviesArr.map(movie => (
                <Movie
                    key={movie.id}
                    name={movie.title}
                    vote_count={movie.vote_count}
                    original_language={movie.original_language}
                    imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
            ))}
        </div>
    );
};

export default Moviesapi;
