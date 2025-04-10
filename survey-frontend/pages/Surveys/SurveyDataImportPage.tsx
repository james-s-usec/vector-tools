import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  List, 
  ListItem, 
  ListItemText,
  Link
} from '@mui/material';
import { BulkDataImportForm } from '@hvac/ui';

/**
 * Page for importing survey data in bulk from Excel files
 */
const SurveyDataImportPage: React.FC = () => {
  const [importResult, setImportResult] = useState<any>(null);
  
  const handleImportSuccess = (result: any) => {
    setImportResult(result);
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Import Survey Data
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <BulkDataImportForm onSuccess={handleImportSuccess} />
          
          {importResult && importResult.success && (
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Import Summary
              </Typography>
              <Typography variant="body1">
                Successfully imported {importResult.count} survey submissions.
              </Typography>
            </Paper>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Template Options
            </Typography>
            <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
              Different templates for different needs:
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Data Import Template" 
                  secondary="For importing survey data"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="User-Friendly Template" 
                  secondary="For editing templates (fields as columns)"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Standard Template" 
                  secondary="For editing templates (fields as rows)"
                />
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Documentation
            </Typography>
            <List>
              <ListItem>
                <Link 
                  href="/docs/surveys/survey-data-import" 
                  target="_blank" 
                  rel="noopener"
                  underline="hover"
                >
                  Survey Data Import Guide
                </Link>
              </ListItem>
              <ListItem>
                <Link 
                  href="/docs/surveys/user-friendly-excel-templates" 
                  target="_blank" 
                  rel="noopener"
                  underline="hover"
                >
                  User-Friendly Excel Templates Guide
                </Link>
              </ListItem>
              <ListItem>
                <Link 
                  href="/docs/surveys/export-import-guide" 
                  target="_blank" 
                  rel="noopener"
                  underline="hover"
                >
                  Export/Import Guide
                </Link>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SurveyDataImportPage;