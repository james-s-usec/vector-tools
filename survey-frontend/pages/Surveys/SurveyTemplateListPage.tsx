import React, { useState } from 'react';
import { Box, Typography, Grid, Tabs, Tab } from '@mui/material';
import { SurveyTemplateList, TemplateImportForm } from '@hvac/ui';

const SurveyTemplateListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Survey Templates
      </Typography>
      
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        sx={{ mb: 3 }}
      >
        <Tab label="Templates" />
        <Tab label="Import Templates" />
      </Tabs>
      
      {activeTab === 0 && (
        <SurveyTemplateList />
      )}
      
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TemplateImportForm />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SurveyTemplateListPage;