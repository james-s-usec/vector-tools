import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * A simple button that links to the equipment selection page for creating a survey
 */
const EquipmentSurveySelector: React.FC = () => {
  return (
    <Button 
      variant="contained" 
      color="primary" 
      component={Link} 
      to="/surveys/equipment"
    >
      Create New Survey
    </Button>
  );
};

export default EquipmentSurveySelector;