import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  FormControl, 
  InputLabel,
  Select, 
  MenuItem, 
  Paper,
  SelectChangeEvent
} from '@mui/material';
import { useSurveyTemplates } from '@hvac/hooks/useSurveys';
import { DynamicSurveyForm } from '@hvac/ui';

const CreateSurveyPage: React.FC = () => {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const parsedEquipmentId = equipmentId ? parseInt(equipmentId, 10) : 0;
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | ''>('');
  
  const { 
    data: templates = [], 
    isLoading, 
    error 
  } = useSurveyTemplates();

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

  if (!equipmentId || isNaN(parsedEquipmentId)) {
    return (
      <Box>
        <Typography variant="h6" color="error" gutterBottom>
          Invalid equipment ID
        </Typography>
        <Button component={Link} to="/equipment" variant="contained">
          Back to Equipment
        </Button>
      </Box>
    );
  }

  if (templates.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          No survey templates available
        </Typography>
        <Typography paragraph>
          You need to create a survey template before you can create a survey.
        </Typography>
        <Button 
          component={Link} 
          to="/surveys/templates/new" 
          variant="contained"
        >
          Create Survey Template
        </Button>
      </Box>
    );
  }

  const handleTemplateChange = (event: SelectChangeEvent<number | string>) => {
    setSelectedTemplateId(event.target.value as number);
  };

  const handleSurveySuccess = () => {
    // Navigate back to the equipment surveys page
    navigate(`/equipment/${parsedEquipmentId}/surveys`);
  };

  const selectedTemplate = templates.find(template => template.id === selectedTemplateId);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Survey
 for Equipment {equipmentId}
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Please select a survey template from the dropdown below, then fill out the survey form.
        Once you've completed the form, click the "Submit Survey" button to save your survey.
        You'll be redirected back to the equipment surveys page after successful submission.
        If you need to cancel, click the "Back to Equipment" button.
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="template-select-label">Select Survey Template</InputLabel>
          <Select
            labelId="template-select-label"
            id="template-select"
            value={selectedTemplateId}
            onChange={handleTemplateChange}
            label="Select Survey Template"
          >
            {templates.map((template) => (
              <MenuItem key={template.id} value={template.id}>
                {template.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <Box sx={{ mt: 2 }}>
          <Button 
            component={Link} 
            to={`/equipment/${parsedEquipmentId}/surveys`}
          >
            Back to Equipment Surveys
          </Button>
        </Box>
      </Paper>
      
      {selectedTemplate && (
        <DynamicSurveyForm 
          template={selectedTemplate} 
          equipmentId={parsedEquipmentId}
          onSuccess={handleSurveySuccess}
        />
      )}
    </Box>
  );
};

export default CreateSurveyPage;