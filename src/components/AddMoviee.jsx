import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', 
    },
  },
});

const AddMoviee = () => {
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    posterPath: '',
    releaseDate: '',
    adult: false,
    language: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData
      };

      await axios.post('http://localhost:1000/results', updatedFormData);

      setFormData({
        title: '',
        overview: '',
        releaseDate: '',
        adult: false,
        language: '',
        poster_path:'',
      });

      alert('Movie added successfully!');
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie. Please try again later.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          backgroundImage: 'url("https://th.bing.com/th/id/OIP.sSUqagGnbIniewZI6oVb4gHaEs?rs=1&pid=ImgDetMain")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              maxHeight:'750px'
            }}
          >
            <Typography component="h1" variant="h5" align="center" mb={2}>
              Add your movie here
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <TextField
                margin="normal"
                required
                id="title"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                id="overview"
                label="Overview"
                name="overview"
                value={formData.overview}
                onChange={handleChange}
                multiline
                rows={4}
              />
              {/* <TextField
                margin="normal"
                required
                id="posterPath"
                label="Poster Path (Image Link)"
                name="posterPath"
                value={formData.posterPath}
                onChange={handleChange}
              /> */}
              <TextField
                margin="normal"
                required
                id="releaseDate"
                label="Release Date"
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Adult"
                name="adult"
                checked={formData.adult}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                id="language"
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Movie
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AddMoviee;
