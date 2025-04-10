import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { SurveyDetail } from '@hvac/ui';

const SurveyDetailPage: React.FC = () => {
  const { surveyId } = useParams();
  const parsedSurveyId = surveyId ? parseInt(surveyId, 10) : 0;

  if (!surveyId || isNaN(parsedSurveyId)) {
    return (
      <Box>
        <Typography variant="h6" color="error" gutterBottom>
          Invalid survey ID
        </Typography>
        <Button component={Link} to="/surveys" variant="contained">
          Back to Surveys
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Survey Details
      </Typography>
      <SurveyDetail surveyId={parsedSurveyId} />
    </Box>
  );
};

export default SurveyDetailPage;