import React from 'react';
import { Box, Typography } from '@mui/material';
import { SurveyDashboard } from '@hvac/ui';

const SurveyDashboardPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Survey Dashboard
      </Typography>
      <SurveyDashboard />
    </Box>
  );
};

export default SurveyDashboardPage;