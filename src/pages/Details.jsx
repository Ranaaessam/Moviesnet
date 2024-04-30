import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Details = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [deleted, setDeleted] = useState(false); // State to track deletion

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = () => {
        setDeleted(true);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(to bottom, #000000, #222222)',
        }}>
            <Card sx={{ maxWidth: 500, height: 680, width: '100%', background: 'linear-gradient(to right, #616161, #212121)', borderRadius: 8, boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {` ${movie.title[0]}`}
                        </Avatar>
                    }
                    title={
                        <Typography sx={{ color: 'white', fontSize: '30px', marginLeft: '-50px' }}>{` ${movie.title}`}</Typography>
                    }
                />

<CardMedia
    component="img"
    height="450"
    width="800"
    image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
    style={{ objectFit: 'contain' }}
   
/>


                <CardContent sx={{ textAlign: 'start', color: 'white' }}>
                    <Typography variant="h5" color="white">
                        Movies information:
                    </Typography>
                    <Typography variant="h6" color="white">
                        Vote: {movie.vote_count}
                    </Typography>
                    <Typography variant="h6" color="white">
                        Adult: {movie.adult ? 'Yes' : 'No'}
                    </Typography>
                    <Typography variant="h6" color="white">
                        Language: {movie.original_language}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon style={{ color: 'white' }} />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon style={{ color: 'white' }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon style={{ color: 'white' }} />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        color="white"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph color="white">Brief Description:</Typography>
                        <Typography paragraph color="white">
                           {movie.overview}
                        </Typography>
                        {/* Add more movie details here */}
                    </CardContent>
                </Collapse>

                {deleted && (
                    <Typography variant="body1" style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>
                        Movie deleted successfully!
                    </Typography>
                )}
            </Card>
        </div>
    );
}

export default Details;
