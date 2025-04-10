import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSurveyTemplates } from '@hvac/hooks/useSurveys';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Grid,
  CircularProgress,
  Checkbox
} from '@mui/material';
import TemplateExportButton from './TemplateExportButton';

interface SurveyTemplateListProps {
  showExport?: boolean;
}

const SurveyTemplateList: React.FC<SurveyTemplateListProps> = ({ 
  showExport = true 
}) => {
  const { data: templates = [], isLoading, error } = useSurveyTemplates();
  const [selectedTemplateIds, setSelectedTemplateIds] = useState<number[]>([]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading survey templates
        </Typography>
        <Typography>
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </Typography>
      </Box>
    );
  }

  if (templates.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          No survey templates found
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/surveys/templates/new"
        >
          Create New Template
        </Button>
      </Box>
    );
  }

  const handleCheckboxChange = (templateId: number, checked: boolean) => {
    if (checked) {
      setSelectedTemplateIds(prev => [...prev, templateId]);
    } else {
      setSelectedTemplateIds(prev => prev.filter(id => id !== templateId));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Survey Templates
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained"
            color="primary"
            component={Link} 
            to="/surveys/templates/new"
          >
            Create New Template
          </Button>
          
          {showExport && (
            <TemplateExportButton 
              selectedTemplateIds={selectedTemplateIds.length > 0 ? selectedTemplateIds : undefined}
              variant="outlined"
            />
          )}
        </Box>
      </Box>
      
      {showExport && selectedTemplateIds.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            {selectedTemplateIds.length} template(s) selected
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card sx={{ position: 'relative' }}>
              {showExport && (
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <Checkbox
                    checked={selectedTemplateIds.includes(template.id)}
                    onChange={(e) => {
                      handleCheckboxChange(template.id, e.target.checked);
                    }}
                  />
                </Box>
              )}
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {template.name}
                </Typography>
                {template.description && (
                  <Typography variant="body2" color="text.secondary">
                    {template.description}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {Object.keys(template.baseFields).length} base fields
                </Typography>
                <Typography variant="body2">
                  {Object.keys(template.specificFields).length} specific fields
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  component={Link} 
                  to={`/surveys/templates/${template.id}`}
                >
                  View Details
                </Button>
                <Button 
                  size="small" 
                  component={Link} 
                  to={`/surveys/templates/${template.id}/edit`}
                >
                  Edit
                </Button>
                {showExport && (
                  <TemplateExportButton
                    templateId={template.id}
                    variant="text"
                    size="small"
                  />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SurveyTemplateList;