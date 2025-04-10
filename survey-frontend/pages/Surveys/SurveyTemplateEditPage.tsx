import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material';
import { useSurveyTemplate } from '@hvac/hooks/useSurveys';
import { SurveyTemplate as ApiSurveyTemplate } from '@hvac/types/survey';
import { UseQueryResult } from '@tanstack/react-query';

// Enhanced type that matches the actual structure used in the component
interface EnhancedSurveyTemplate extends ApiSurveyTemplate {
  baseFields: Record<string, FieldConfig>;
  specificFields: Record<string, FieldConfig>;
}

// Define types for field configuration
interface FieldConfig {
  label: string;
  type: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  [key: string]: any;
}

// Type for the query result from useSurveyTemplate
type SurveyTemplateQueryResult = UseQueryResult<EnhancedSurveyTemplate>;
const SurveyTemplateEditPage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const parsedTemplateId = surveyId ? parseInt(surveyId, 10) : 0;

  // Use the hook with proper typing
  // We need to cast the result because the hook's return type doesn't match our enhanced type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const surveyTemplateQuery = useSurveyTemplate(parsedTemplateId) as SurveyTemplateQueryResult;
  
  const {
    data: template,
    isLoading,
    error
  } = surveyTemplateQuery;

  if (!surveyId || isNaN(parsedTemplateId)) {
    return (
      <Box>
        <Typography variant="h6" color="error" gutterBottom>
          Invalid template ID
        </Typography>
        <Button component={Link} to="/surveys/templates" variant="contained">
          Back to Templates
        </Button>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !template) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading survey template
        </Typography>
        <Typography>
          {error instanceof Error ? error.message : 'Template not found or an unknown error occurred'}
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/surveys/templates"
          sx={{ mt: 2 }}
        >
          Back to Templates
        </Button>
      </Box>
    );
  }

  // At this point, template is guaranteed to be defined
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Survey Template
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Template Information
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Name:
          </Typography>
          <Typography variant="body1">
            {template.name}
          </Typography>
        </Box>
        {template.description && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Description:
            </Typography>
            <Typography variant="body1">
              {template.description}
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button 
            component={Link} 
            to={`/surveys/templates/${surveyId}`}
            variant="outlined"
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
      
      <Typography variant="h6" gutterBottom>
        Template Editor
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Note: The full template editor would be implemented here. This is a placeholder.
      </Typography>
    </Box>
  );
};

export default SurveyTemplateEditPage;