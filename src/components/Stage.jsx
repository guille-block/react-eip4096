import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

function Stage({ stages, activeStep, handleStep }) {
  return (
    <div>
      <h3>Stage</h3>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stages.map((label, index) => (
          <Step key={index} onClick={() => handleStep(index)} style={{ cursor: 'pointer' }}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default Stage;
