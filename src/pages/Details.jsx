import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/results/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(error.message);
            }
        };

        fetchMovieDetails();

    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Details of Movie {id}</h2>
            <p>Title: {movie.title}</p>
            <p>Adult: {movie.adult ? 'Yes' : 'No'}</p>
            <p>Backdrop Path: {movie.backdrop_path}</p>
            {/* Render other movie details as needed */}
        </div>
    );
}

export default Details;
