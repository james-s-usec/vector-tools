import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSurvey, useDeleteSurvey } from '@hvac/hooks/useSurveys';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
  ,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Chip,
  Alert
} from '@mui/material';

interface SurveyDetailProps {
  surveyId: number;
}

const SurveyDetail: React.FC<SurveyDetailProps> = ({ surveyId }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const { 
    data: survey, 
    isLoading, 
    error 
  } = useSurvey(surveyId);
  
  const deleteSurveyMutation = useDeleteSurvey();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !survey) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          Error loading survey
        </Typography>
        <Typography>
          {error instanceof Error ? error.message : 'Survey not found or an unknown error occurred'}
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/surveys"
          sx={{ mt: 2 }}
        >
          Back to Surveys
        </Button>
      </Box>
    );
  }

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteSurveyMutation.mutateAsync(surveyId);
      setDeleteDialogOpen(false);
      navigate(`/equipment/${survey.equipmentId}/surveys`);
    } catch (error) {
      console.error('Error deleting survey:', error);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  // Format the date
  const surveyDate = new Date(survey.surveyDate);
  const formattedDate = surveyDate.toLocaleDateString();

  // Debug logging to help diagnose issues
  console.log('Survey data:', survey);
  console.log('Template data:', survey.template);
  console.log('Survey data fields:', survey.surveyData);
  
  // Check if surveyData exists
  if (!survey.surveyData) {
    console.error('Survey data is missing or undefined');
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Survey data is missing or malformed. Please check the database record.</Alert>
      </Box>
    );
  }

  // Get base and specific fields from survey data
  const baseFields = Object.entries(survey.surveyData || {}).filter(
    ([key]) => survey.template?.baseFields && survey.template.baseFields[key]
  );
  
  const specificFields = Object.entries(survey.surveyData || {}).filter(
    ([key]) => survey.template?.specificFields && survey.template.specificFields[key]
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Survey Details
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            component={Link} 
            to={`/surveys/${surveyId}/edit`}
            sx={{ mr: 1 }}
          >
            Edit Survey
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleDeleteClick}
          >
            Delete Survey
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Equipment:
            </Typography>
            <Typography variant="body1">
              {survey.equipment?.equipmentTag || 'Unknown Equipment'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Template:
            </Typography>
            <Typography variant="body1">
              {survey.template?.name || 'Unknown Template'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Survey Date:
            </Typography>
            <Typography variant="body1">
              {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Prepared By:
            </Typography>
            <Typography variant="body1">
              {survey.preparedBy}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {baseFields.length === 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No base fields found for this survey. The template structure might have changed.
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Base Fields
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              {baseFields.map(([key, value]) => {
                const fieldConfig = survey.template?.baseFields ? survey.template.baseFields[key] : null;
                if (!fieldConfig) return null;
                
                // Skip preparedBy and date as they're shown above
                if (key === 'preparedBy' || key === 'surveyDate') return null;
                
                // Format the value based on field type
                let displayValue = value;
                
                // Handle case where value is an array
                if (Array.isArray(value)) {
                  console.log(`Field ${key} has array value:`, value);
                  return (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%', verticalAlign: 'top' }}>
                        {fieldConfig.label}
                      </TableCell>
                      <TableCell>
                        <List dense sx={{ p: 0 }}>
                          {value.map((item, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <Card variant="outlined" sx={{ width: '100%' }}>
                                <CardContent sx={{ pb: '8px !important' }}>
                                  {typeof item === 'object' && item !== null ? (
                                    Object.entries(item).map(([itemKey, itemValue]) => (
                                      <Box key={itemKey} sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                          {itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}:
                                        </Typography>
                                        <Typography variant="body2">{String(itemValue)}</Typography>
                                      </Box>
                                    ))
                                  ) : (
                                    <Typography>{String(item)}</Typography>
                                  )}
                                </CardContent>
                              </Card>
                            </ListItem>
                          ))}
                        </List>
                      </TableCell>
                    </TableRow>
                  );
                } else if (typeof value === 'object' && value !== null) {
                  console.log(`Field ${key} has object value:`, value);
                  displayValue = Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ');
                }
                
                if (fieldConfig.type === 'select' || fieldConfig.type === 'radio') {
                  // Safely access options array
                  const option = (fieldConfig.options || []).find(opt => opt.value === displayValue);
                  displayValue = option?.label || displayValue;
                }
                
                return (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>
                      {fieldConfig.label}
                    </TableCell>
                    <TableCell>{displayValue}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {specificFields.length === 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No equipment-specific fields found for this survey. The template structure might have changed.
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Equipment-Specific Fields
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              {specificFields.map(([key, value]) => {
                const fieldConfig = survey.template?.specificFields ? survey.template.specificFields[key] : null;
                if (!fieldConfig) return null;
                
                // Format the value based on field type
                let displayValue = value;
                
                // Handle case where value is an array
                if (Array.isArray(value)) {
                  console.log(`Field ${key} has array value:`, value);
                  return (
                    <TableRow key={key}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%', verticalAlign: 'top' }}>
                        {fieldConfig.label}
                      </TableCell>
                      <TableCell>
                        <List dense sx={{ p: 0 }}>
                          {value.map((item, index) => (
                            <ListItem key={index} sx={{ px: 0 }}>
                              <Card variant="outlined" sx={{ width: '100%' }}>
                                <CardContent sx={{ pb: '8px !important' }}>
                                  {typeof item === 'object' && item !== null ? (
                                    Object.entries(item).map(([itemKey, itemValue]) => (
                                      <Box key={itemKey} sx={{ mb: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                          {itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}:
                                        </Typography>
                                        <Typography variant="body2">{String(itemValue)}</Typography>
                                      </Box>
                                    ))
                                  ) : (
                                    <Typography>{String(item)}</Typography>
                                  )}
                                </CardContent>
                              </Card>
                            </ListItem>
                          ))}
                        </List>
                      </TableCell>
                    </TableRow>
                  );
                } else if (typeof value === 'object' && value !== null) {
                  console.log(`Field ${key} has object value:`, value);
                  displayValue = Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ');
                }
                
                if (fieldConfig.type === 'select' || fieldConfig.type === 'radio') {
                  // Safely access options array
                  const option = fieldConfig.options?.find(opt => opt.value === displayValue);
                  displayValue = option?.label || value;
                }
                
                return (
                  <TableRow key={key}>
                    <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', width: '30%' }}>
                      {fieldConfig.label}
                    </TableCell>
                    <TableCell>{displayValue}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this survey? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SurveyDetail;