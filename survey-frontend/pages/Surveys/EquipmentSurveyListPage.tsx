import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { SurveyList } from '@hvac/ui';
import { useSurveyTemplates } from '@hvac/hooks/useSurveys';

const EquipmentSurveyListPage: React.FC = () => {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const parsedEquipmentId = equipmentId ? parseInt(equipmentId, 10) : 0;
  
  // We need to fetch templates to check if there are any available
  const { data: templates = [], isLoading } = useSurveyTemplates();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Equipment Surveys
      </Typography>
      
      {templates.length === 0 ? (
        <Box sx={{ p: 3 }}>
          <Typography variant="body1" gutterBottom>
            No survey templates available. Please create a template first.
          </Typography>
          <Button 
            component={Link} 
            to="/surveys/templates/new" 
            variant="contained"
          >
            Create Survey Template
          </Button>
        </Box>
      ) : (
        <SurveyList equipmentId={parsedEquipmentId} />
      )}
    </Box>
  );
};

export default EquipmentSurveyListPage;