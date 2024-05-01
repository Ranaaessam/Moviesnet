import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

const Favourites = () => {
    const favs = JSON.parse(localStorage.getItem('favs')) || [];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
                {favs.map((movie) => (
                    <div
                        key={movie.id}
                        style={{
                            margin: '40px',
                            overflow: 'hidden',
                            position: 'relative',
                            
                            cursor: movie.title.length > 8 ? 'pointer' : 'default',
                            '&:hover': {
                                backgroundColor: movie.title.length > 8 ? '#FFEBEE' : 'inherit',
                            },

                        }}
                    >
                        <Card
                            sx={{
                                width: '350px',
                                height: '600px',
                                background: 'linear-gradient(to right, #616161, #212121)',
                                borderRadius: 10,
                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                            }}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {` ${movie.title[0]}`}
                                    </Avatar>
                                }
                            />

                            <CardMedia
                                component="img"
                                height="300"
                                width="700"
                                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                style={{ objectFit: 'contain', borderRadius: '20px' }}
                            />

                            <CardContent
                                sx={{
                                    textAlign: 'start',
                                    color: 'white',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                <Typography variant="h6" color="white" sx={{textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)', color: 'red', fontWeight: 'bold'}}>
                                    
                                    {movie.title}
                                </Typography>
                                <Typography variant="h6" color="white">
                                    Vote count: {movie.vote_count}
                                </Typography>
                                <Typography variant="h6" color="white">
                                    Adult friendly: {movie.adult ? true : false}
                                </Typography>
                                <Typography variant="h6" color="white">
                                    Language: {movie.original_language}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favourites;
