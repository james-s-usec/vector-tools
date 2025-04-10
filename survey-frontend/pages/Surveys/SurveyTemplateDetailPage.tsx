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

const SurveyTemplateDetailPage: React.FC = () => {
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Survey Template Details
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            component={Link} 
            to={`/surveys/templates/${surveyId}/edit`}
            sx={{ mr: 1 }}
          >
            Edit Template
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Name:
            </Typography>
            <Typography variant="body1">
              {template.name}
            </Typography>
          </Box>
          {template.description && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Description:
              </Typography>
              <Typography variant="body1">
                {template.description}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Base Fields
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(template.baseFields).map(([key, field]) => {
            // Use the field directly since our type definition already handles it
            const typedField = field;
            return (
              <Box 
                key={key} 
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  p: 2, 
                  borderRadius: 1,
                  width: 'calc(50% - 8px)'
                }}
              >
                <Typography variant="subtitle2">{typedField.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {typedField.type}
                </Typography>
                {typedField.required && (
                  <Typography variant="body2" color="error">
                    Required
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Equipment-Specific Fields
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {Object.entries(template.specificFields).map(([key, field]) => {
            // Use the field directly since our type definition already handles it
            const typedField = field;
            return (
              <Box 
                key={key} 
                sx={{ 
                  border: '1px solid #e0e0e0', 
                  p: 2, 
                  borderRadius: 1,
                  width: 'calc(50% - 8px)'
                }}
              >
                <Typography variant="subtitle2">{typedField.label}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Type: {typedField.type}
                </Typography>
                {typedField.required && (
                  <Typography variant="body2" color="error">
                    Required
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};

export default SurveyTemplateDetailPage;