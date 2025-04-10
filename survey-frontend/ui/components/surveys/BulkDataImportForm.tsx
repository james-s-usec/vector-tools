import React, { useState, useRef } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Alert, 
  CircularProgress,
  Link
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { useImportSurveyData, useGetSurveyDataImportTemplate } from '@hvac/hooks/useSurveys';

interface BulkDataImportFormProps {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

/**
 * Form component for importing survey data in bulk from Excel
 */
const BulkDataImportForm: React.FC<BulkDataImportFormProps> = ({
  onSuccess,
  onError
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const importMutation = useImportSurveyData();
  const templateMutation = useGetSurveyDataImportTemplate();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;
    
    importMutation.mutate(file, {
      onSuccess: (result) => {
        // Clear the file input
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess(result);
        }
      },
      onError: (error) => {
        // Call the onError callback if provided
        if (onError) {
          onError(error);
        }
      }
    });
  };
  
  const handleDownloadTemplate = () => {
    templateMutation.mutate();
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Bulk Survey Data Import
      </Typography>
      
      <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
        Import multiple survey submissions from an Excel file. Download the template, fill in your data, and upload it back.
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={handleDownloadTemplate}
          disabled={templateMutation.isPending}
          sx={{ mr: 2 }}
        >
          {templateMutation.isPending ? 'Downloading...' : 'Download Template'}
        </Button>
        
        <Link 
          href="/docs/surveys/survey-data-import" 
          target="_blank" 
          rel="noopener"
          underline="hover"
        >
          View Documentation
        </Link>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="survey-data-file-input"
          />
          <label htmlFor="survey-data-file-input">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ py: 2, mb: 1 }}
            >
              Select Excel File
            </Button>
          </label>
          
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {file.name}
            </Typography>
          )}
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!file || importMutation.isPending}
          fullWidth
          sx={{ py: 1.5 }}
        >
          {importMutation.isPending ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Importing...
            </>
          ) : (
            'Import Data'
          )}
        </Button>
      </form>
      
      {importMutation.isSuccess && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Data imported successfully
        </Alert>
      )}
      
      {importMutation.isError && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {importMutation.error instanceof Error 
            ? importMutation.error.message 
            : 'An error occurred during import'}
        </Alert>
      )}
    </Paper>
  );
};

export default BulkDataImportForm;