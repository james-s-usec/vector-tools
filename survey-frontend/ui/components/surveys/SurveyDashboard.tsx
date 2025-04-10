import React from 'react';
import { Link } from 'react-router-dom';
import { useSurveys } from '@hvac/hooks/useSurveys';
import EquipmentSurveySelector from './EquipmentSurveySelector';
import { 
  Box, 
  Typography, 
  Paper, 
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider
} from '@mui/material';

const SurveyDashboard: React.FC = () => {
  const { 
    data: surveys = [], 
    isLoading, 
    error 
  } = useSurveys();

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
          Error loading survey data
        </Typography>
        <Typography>
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </Typography>
      </Box>
    );
  }

  // Group surveys by equipment
  const surveysByEquipment = surveys.reduce((acc, survey) => {
    const equipmentId = survey.equipmentId;
    if (!acc[equipmentId]) {
      acc[equipmentId] = [];
    }
    acc[equipmentId].push(survey);
    return acc;
  }, {} as Record<number, typeof surveys>);

  // Calculate statistics
  const totalSurveys = surveys.length;
  const totalEquipmentSurveyed = Object.keys(surveysByEquipment).length;
  
  // Get surveys from the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentSurveys = surveys.filter(survey => 
    new Date(survey.surveyDate) >= thirtyDaysAgo
  );

  // Group surveys by template
  const surveysByTemplate = surveys.reduce((acc, survey) => {
    const templateId = survey.templateId;
    const templateName = survey.template?.name || 'Unknown Template';
    if (!acc[templateName]) {
      acc[templateName] = 0;
    }
    acc[templateName]++;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Survey Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <EquipmentSurveySelector 
/>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/surveys/templates"
          >
            Manage Templates
          </Button>
        </Box>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        To create a new survey, click "Create New Survey" above and select the equipment you want to survey.
      </Typography>

      {/* Summary Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="primary">
              {totalSurveys}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Surveys
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="primary">
              {totalEquipmentSurveyed}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Equipment Surveyed
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="primary">
              {recentSurveys.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Surveys in Last 30 Days
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" color="primary">
              {Object.keys(surveysByTemplate).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Survey Templates Used
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Surveys */}
      <Typography variant="h6" gutterBottom>
        Recent Surveys
      </Typography>
      {recentSurveys.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No surveys in the last 30 days
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {recentSurveys.slice(0, 4).map(survey => {
            const surveyDate = new Date(survey.surveyDate);
            const formattedDate = surveyDate.toLocaleDateString();
            
            return (
              <Grid item xs={12} sm={6} md={3} key={survey.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" noWrap>
                      {survey.equipment?.equipmentTag || 'Unknown Equipment'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {survey.template?.name || 'Unknown Template'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2">
                        {formattedDate}
                      </Typography>
                      <Typography variant="body2">
                        {survey.preparedBy}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/surveys/${survey.id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Survey Templates Distribution */}
      <Typography variant="h6" gutterBottom>
        Survey Templates Distribution
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          {Object.entries(surveysByTemplate).map(([templateName, count]) => (
            <Grid item key={templateName}>
              <Chip 
                label={`${templateName}: ${count}`} 
                color="primary" 
                variant="outlined" 
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Equipment with Most Surveys */}
      <Typography variant="h6" gutterBottom>
        Equipment with Most Surveys
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(surveysByEquipment)
          .sort((a, b) => b[1].length - a[1].length)
          .slice(0, 4)
          .map(([equipmentId, equipmentSurveys]) => {
            const equipment = equipmentSurveys[0]?.equipment;
            
            return (
              <Grid item xs={12} sm={6} md={3} key={equipmentId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="h3" noWrap>
                      {equipment?.equipmentTag || 'Unknown Equipment'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {equipment?.category?.name || 'Unknown Category'}
                    </Typography>
                    <Typography variant="body1">
                      {equipmentSurveys.length} Surveys
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last: {new Date(equipmentSurveys[0].surveyDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={Link} 
                      to={`/equipment/${equipmentId}/surveys`}
                    >
                      View Surveys
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default SurveyDashboard;