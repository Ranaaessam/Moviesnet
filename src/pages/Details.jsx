import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

const Details = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/results/${id}`);
                setMovie(response.data);
                const favs = JSON.parse(localStorage.getItem('favs')) || [];
                setIsFavorite(favs.some(item => item.id === response.data.id));
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setError(error.message);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleFavorites = () => {
        const favs = JSON.parse(localStorage.getItem('favs')) || [];
    
        const existingIndex = favs.findIndex((item) => item.id === movie.id);
        if (existingIndex === -1) {
            favs.push(movie);
            localStorage.setItem('favs', JSON.stringify(favs));
            window.alert("Movie added to favorites successfully!✅");
            setIsFavorite(true); 
        } else {
            favs.splice(existingIndex, 1);
            localStorage.setItem('favs', JSON.stringify(favs));
            window.alert("Movie removed from favourites!");
            setIsFavorite(false); 
        }
    };
    

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:1000/results/${id}`);
            setDeleted(true);
            window.alert("Movie deleted successfully!, will be redirected to home shortly...")
            setTimeout(() => {
                navigate('/movies');
            }, 2000);
        } catch (error) {
            console.error('Error deleting movie:', error);
            setError(error.message);
        }
    };



    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '35px' }}>
            {/* //card itself */}
            <Card sx={{
                width: 'calc(100% - 520px)', 
                maxWidth: 500,
                background: 'linear-gradient(to right, #616161, #212121)',
                borderRadius: 8,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <CardMedia
                    component="img"
                    height="450"
                    width="400"
                    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    style={{ objectFit: 'contain', borderRadius: '20px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                    <IconButton aria-label="add to favorites" onClick={handleFavorites}>
                        <FavoriteIcon style={{ color: isFavorite ? 'red' : 'white' }} />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon style={{ color: 'white' }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon style={{ color: 'white' }} />
                    </IconButton>
                </div>
            </Card>
            <div style={{ maxWidth: 'calc(100% - 520px)', marginLeft: '20px', alignItems: 'flex-start' }}>

                <Typography variant="h3" color="white" gutterBottom sx={{ m: 3, textAlign: 'left' }}>
                    {movie.title}
                </Typography>
                <Typography variant="h6" color="white" gutterBottom sx={{ m: 3, textAlign: 'left' }}>
                    Number of votes: {movie.vote_count}
                </Typography>
                <Typography variant="h6" color="white" gutterBottom sx={{ m: 3, textAlign: 'left' }}>
                    Adult frie: {movie.adult ? true : false}
                </Typography>
                <Typography variant="h6" color="white" gutterBottom sx={{ m: 3, textAlign: 'left' }}>
                    Language: {movie.original_language}
                </Typography>
                <Typography sx={{ m: 3, textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)', color: 'red', fontWeight: 'bold', fontSize: '2.5rem', textAlign: 'left' }}>
                    Brief Description:
                </Typography>

                <Typography variant="body1" color="white" paragraph sx={{ m: 3, textAlign: 'left' }}>
                    {movie.overview}
                </Typography>

                
                {deleted && (
                    <Typography variant="body1" style={{ color: 'red' }}>
                        Movie deleted successfully!
                    </Typography>
                )}
            </div>
        </div>
    );
}

export default Details;
