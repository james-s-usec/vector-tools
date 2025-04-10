import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Paper,
  Alert
} from '@mui/material';
import { useSurvey, useSurveyTemplate, useUpdateSurvey } from '@hvac/hooks/useSurveys';
import { DynamicSurveyForm } from '@hvac/ui';
import { SurveyFormData } from '@hvac/types';

const SurveyEditPage: React.FC = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const parsedSurveyId = surveyId ? parseInt(surveyId, 10) : 0;
  const [initialFormData, setInitialFormData] = useState<SurveyFormData | null>(null);
  
  // Fetch the survey data
  const { 
    data: survey, 
    isLoading: isSurveyLoading, 
    error: surveyError 
  } = useSurvey(parsedSurveyId);
  
  // Fetch the template data once we have the survey
  const { 
    data: template, 
    isLoading: isTemplateLoading, 
    error: templateError 
  } = useSurveyTemplate(survey?.templateId || 0);
  
  const updateSurveyMutation = useUpdateSurvey();
  
  // Prepare the initial form data from the survey data
  useEffect(() => {
    if (survey) {
      // Extract the survey data
      const { preparedBy, surveyDate, surveyData } = survey;
      
      // Combine the data for the form
      setInitialFormData({
        preparedBy,
        surveyDate: new Date(surveyDate).toISOString().split('T')[0],
        ...surveyData
      });
    }
  }, [survey]);
  
  if (isSurveyLoading || isTemplateLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (surveyError || !survey) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading survey
        </Typography>
        <Typography>
          {surveyError instanceof Error ? surveyError.message : 'Survey not found or an unknown error occurred'}
        </Typography>
        <Button 
          component={Link} 
          to="/surveys"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Surveys
        </Button>
      </Box>
    );
  }
  
  if (templateError || !template) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading survey template
        </Typography>
        <Typography>
          {templateError instanceof Error ? templateError.message : 'Template not found or an unknown error occurred'}
        </Typography>
        <Button 
          component={Link} 
          to={`/surveys/${String(surveyId)}`}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Back to Survey Details
        </Button>
      </Box>
    );
  }
  
  if (!initialFormData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  const handleSurveySuccess = () => {
    // Navigate back to the survey details page
    navigate(`/surveys/${String(parsedSurveyId)}`);
  };
  
  // Custom onSuccess handler for the DynamicSurveyForm
  const handleFormSuccess = (formData: SurveyFormData) => {
    // Extract base fields that should be at the top level
    const { preparedBy, surveyDate, ...otherFields } = formData;
    
    // Prepare data for submission
    const data: Partial<SurveyFormData> = {
      preparedBy,
      surveyDate,
      surveyData: otherFields,
      equipmentId: survey.equipmentId,
      templateId: template.id
    };
    
    // Update the survey
    updateSurveyMutation.mutate({ 
      id: parsedSurveyId, 
      data 
    }, {
      onSuccess: () => {
        handleSurveySuccess();
      }
    });
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Survey
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Survey Information
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          Equipment: {survey.equipment?.equipmentTag || 'Unknown Equipment'}
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          Template: {template.name}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            component={Link} 
            to={`/surveys/${String(parsedSurveyId)}`}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
      
      {updateSurveyMutation.isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {updateSurveyMutation.error instanceof Error 
            ? updateSurveyMutation.error.message 
            : 'An error occurred while updating the survey'}
        </Alert>
      )}
      
      <DynamicSurveyForm 
        template={template} 
        equipmentId={survey.equipmentId}
        initialData={initialFormData}
        onSuccess={handleFormSuccess}
      />
    </Box>
  );
};

export default SurveyEditPage;