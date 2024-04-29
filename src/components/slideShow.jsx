import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Skyfall',
    imgPath:
      'https://th.bing.com/th/id/R.307140408c91b0a50f25a5d428135105?rik=vKI3IIYUfasqOg&pid=ImgRaw&r=0',
  },
  {
    label: 'Avatar',
    imgPath:
      'https://i.ytimg.com/vi/GUVUASeqB6I/maxresdefault.jpg',
  },
  {
    label: 'Stranger Things',
    imgPath:
      'https://i.pinimg.com/564x/98/1d/82/981d82183ea1ae61b19a532c56a22d3a.jpg',
  },
];

function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ alignSelf: 'center', marginLeft: '8px' }}>
        <Paper
          square
          sx={{
            height: 50,
            display: 'flex',
            alignItems: 'center',
            marginLeft: 2,
            pl: 2,
            bgcolor: 'transparent',
          }}
        >
          <Typography variant="h2" sx={{ color: 'white' }}>
            {images[activeStep].label}
          </Typography>
        </Paper>
      </Box>
      <Box sx={{ }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          // Add transition effect
          transitionDuration={500} // Set the duration of the transition

        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 600, // Increase height for larger image
                    width: 'auto', // Allow width to adjust accordingly
                    maxWidth: '100%', // Ensure image doesn't exceed container width
                    objectFit: 'cover',
                    display: 'block',
                    margin: 'auto',
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Box>
    </Box>
  );
}

export default SwipeableTextMobileStepper;
