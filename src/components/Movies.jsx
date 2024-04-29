import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./Moviesapicss.css";
import AddMoviee from './AddMoviee';

const Movies = () => {
    const [moviesArr, setMoviesArr] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:1000/results");
                setMoviesArr(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="movies-container">
            {moviesArr.map(movie => (
                // <AddMoviee></AddMoviee>
                <Movie
                    key={movie.id}
                    id={movie.id}

                    name={movie.title}
                    vote_count={movie.vote_count}
                    imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
            ))}
        </div>
    );
}

export default Movies;
