import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from '../contexts/MoviesContextProvider';

const AddMoviee = () => {
    const { addMovie, moviesArr } = useContext(MoviesContext);
    const navigate = useNavigate();
    const [movie, setMovie] = useState({ name: "", description: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value });
        console.log("changes in input");
    }

    const handleSubmit = (movie) => {
        movie.preventDefault();
        addMovie(movie);
        setMovie({ name: "", description: "" });
        navigate('/movies');
        console.log("Added successfully!");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title: </label>
                <input type='text' name="name" value={movie.name} onChange={handleChange} />
                <br />
                <label>Description: </label>
                <input type='text' name="description" value={movie.description} onChange={handleChange} />
                <br />
                <input type='submit' value="Add Movie" />
            </form>
   
            <div>
                {console.log("updated movies")}
                {console.log(moviesArr)}

                <ul>
                    {moviesArr.map(movie => (
                        <li key={movie.id}>{movie.name}</li>
                   


                    ))}
                         {console.log(moviesArr)}
                </ul>
            </div>
        </div>
    );
}

export default AddMoviee;
