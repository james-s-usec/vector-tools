import React from 'react';
import { Link } from 'react-router-dom';
import { useEquipmentSurveys } from '@hvac/hooks/useSurveys';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

interface SurveyListProps {
  equipmentId: number;
}

const SurveyList: React.FC<SurveyListProps> = ({ equipmentId }) => {
  const { 
    data: surveys = [], 
    isLoading, 
    error 
  } = useEquipmentSurveys(equipmentId);

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
          Error loading surveys
        </Typography>
        <Typography>
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </Typography>
      </Box>
    );
  }

  if (surveys.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          No surveys found for this equipment
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to={`/equipment/${equipmentId}/surveys/new`}
        >
          Create New Survey
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Equipment Surveys
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to={`/equipment/${equipmentId}/surveys/new`}
        >
          Create New Survey
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Template</TableCell>
              <TableCell>Prepared By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {surveys.map((survey) => {
              // Format the date
              const surveyDate = new Date(survey.surveyDate);
              const formattedDate = surveyDate.toLocaleDateString();
              
              return (
                <TableRow key={survey.id}>
                  <TableCell>{formattedDate}</TableCell>
                  <TableCell>{survey.template?.name || 'Unknown Template'}</TableCell>
                  <TableCell>{survey.preparedBy}</TableCell>
                  <TableCell>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/surveys/${survey.id}`}
                    >
                      View
                    </Button>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/surveys/${survey.id}/edit`}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SurveyList;