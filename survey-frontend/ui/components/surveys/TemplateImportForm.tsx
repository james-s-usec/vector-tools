import React, { useState, useRef } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  Alert, 
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useImportSurveyTemplates } from '@hvac/hooks/useSurveys';

interface TemplateImportFormProps {
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

/**
 * Form component for importing survey templates from Excel
 */
const TemplateImportForm: React.FC<TemplateImportFormProps> = ({
  onSuccess,
  onError
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [updateExisting, setUpdateExisting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const importMutation = useImportSurveyTemplates();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;
    
    importMutation.mutate({ file, updateExisting }, {
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
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Import Survey Templates
      </Typography>
      
      <Typography variant="body2" color="text.secondary" component="p" sx={{ mb: 2 }}>
        Import survey templates from an Excel file. You can create new templates or update existing ones.
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="survey-template-file-input"
          />
          <label htmlFor="survey-template-file-input">
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
        
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={updateExisting}
                onChange={(e) => {
                  setUpdateExisting(e.target.checked);
                }}
                name="updateExisting"
              />
            }
            label="Update existing templates"
          />
          <Typography variant="caption" color="text.secondary" component="p">
            If checked, existing templates with the same ID will be updated. Otherwise, only new templates will be imported.
          </Typography>
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
            'Import Templates'
          )}
        </Button>
      </form>
      
      {importMutation.isSuccess && (
        <Alert severity="success" sx={{ mt: 3 }}>
          Templates imported successfully
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

export default TemplateImportForm;