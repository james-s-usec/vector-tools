/**
 * Dynamic Survey Form Component
 * 
 * This component renders a form based on a survey template definition.
 * It supports various field types including:
 * - text: Simple text input
 * - number: Numeric input
 * - date: Date picker
 * - select: Dropdown selection
 * - radio: Radio button selection
 * - textarea: Multi-line text input
 * - file: File upload
 * - object: Nested object with its own fields
 * - array: Collection of items with a defined template
 * 
 * IMPORTANT: For array fields to work properly, the SurveyField interface in
 * packages/types/survey.ts must include 'array' as a valid type and have the
 * itemTemplate property. If array fields (like surveyPhotos, surveyNotes, markups)
 * are not appearing in the form, verify that the SurveyField interface is properly
 * configured.
 * 
 * For more information, see:
 * - docs/surveys/array-fields-guide.md
 * - docs/surveys/SURVEY-Issues.md
 */
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Select, 
  MenuItem, 
  InputLabel,
  FormHelperText,
  Grid,
  Paper,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SurveyTemplate, SurveyFormData, SurveyField } from '@hvac/types';
import { useCreateSurvey } from '@hvac/hooks/useSurveys';

interface DynamicSurveyFormProps {
  template: SurveyTemplate;
  equipmentId: number;
  initialData?: SurveyFormData;
  onSuccess?: (data: any) => void;
}

const DynamicSurveyForm: React.FC<DynamicSurveyFormProps> = ({ 
  template, 
  equipmentId,
  initialData,
  onSuccess 
}) => {
  const defaultFormData = {
    preparedBy: '',
    surveyDate: new Date().toISOString().split('T')[0]
  };
  
  const [formData, setFormData] = useState<SurveyFormData>(initialData || defaultFormData);
  const [fileUploads, setFileUploads] = useState<Record<string, File[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  
  const createSurveyMutation = useCreateSurvey();

  // Handle changes to regular fields
  const handleChange = (fieldName: string, value: any): void => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when field is updated
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Handle file upload
  const handleFileUpload = (fieldName: string, files: FileList | null): void => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Store the file in state
    setFileUploads(prev => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), file]
    }));
    
    // Store the file name in formData
    handleChange(fieldName, file.name);
    
    // Clear error when field is updated
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };
  
  // Handle array item addition
  const handleAddArrayItem = (fieldName: string): void => {
    const currentArray = formData[fieldName] || [];
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...currentArray, {}]
    }));
  };
  
  // Handle array item removal
  const handleRemoveArrayItem = (fieldName: string, index: number): void => {
    const currentArray = formData[fieldName] || [];
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: currentArray.filter((_, i) => i !== index)
    }));
  };
  
  // Handle array item field change
  const handleArrayItemChange = (arrayFieldName: string, index: number, fieldName: string, value: any): void => {
    const currentArray = formData[arrayFieldName] || [];
    const updatedArray = [...currentArray];
    
    // Create or update the item
    updatedArray[index] = {
      ...(updatedArray[index] || {}),
      [fieldName]: value
    };
    
    setFormData(prev => ({
      ...prev,
      [arrayFieldName]: updatedArray
    }));
    
    // Clear error when field is updated
    const errorKey = `${arrayFieldName}[${index}].${fieldName}`;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };
  
  // Handle file upload for array items
  const handleArrayItemFileUpload = (arrayFieldName: string, index: number, fieldName: string, files: FileList | null): void => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const fileKey = `${arrayFieldName}[${index}].${fieldName}`;
    
    // Store the file in state
    setFileUploads(prev => ({
      ...prev,
      [fileKey]: [...(prev[fileKey] || []), file]
    }));
    
    // Update the array item with the file name
    handleArrayItemChange(arrayFieldName, index, fieldName, file.name);
  };

  // Handle nested field changes for object type fields
  const handleNestedChange = (parentField: string, childField: string, value: any): void => {
    // Create the nested structure if it doesn't exist
    const currentParentValue = formData[parentField] || {};
    
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...currentParentValue,
        [childField]: value
      }
    }));
    
    // Clear error for this nested field if it exists
    const errorKey = parentField + "." + childField;
    if (errors[errorKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };

  // Validate the form before submission
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    console.log("Validating form data:", formData);
  
    // Validate base fields
    Object.entries(template.baseFields).forEach(([fieldName, fieldConfig]) => {
      const field = fieldConfig as SurveyField;
      
      // Handle the date/surveyDate field name mismatch
      const actualFieldName = fieldName === 'date' ? 'surveyDate' : fieldName;
      const fieldValue = formData[actualFieldName];
      
      // Skip validation for array fields - we'll validate their items separately
      if (field.type === 'array') {
        const arrayValue = fieldValue as any[] || [];
        
        // Validate each item in the array if required
        if (field.validation.required && arrayValue.length === 0) {
          console.log(`Validation error: ${fieldName} array is required but empty`);
          newErrors[actualFieldName] = 'At least one item is required';
        }
        
        // Validate each item's fields
        arrayValue.forEach((item, index) => {
          if (field.itemTemplate) {
            Object.entries(field.itemTemplate).forEach(([itemFieldName, itemFieldConfig]) => {
              const itemField = itemFieldConfig as SurveyField;
              const itemValue = item[itemFieldName];
              
              if (itemField.validation.required && !itemValue) {
                console.log(`Validation error: ${fieldName}[${index}].${itemFieldName} is required`);
                newErrors[`${actualFieldName}[${index}].${itemFieldName}`] = 'This field is required';
              }
            });
          }
        });
      }
      else if (field.validation.required && !fieldValue) {
        console.log(`Validation error: ${fieldName} (mapped to ${actualFieldName}) is required`);
        newErrors[actualFieldName] = 'This field is required';
      }
    });
    
    // Validate specific fields
    Object.entries(template.specificFields).forEach(([fieldName, fieldConfig]) => {
      const field = fieldConfig as SurveyField;
      
      // Handle object type fields with nested fields
      if (field.type === 'object' && field.fields) {
        Object.entries(field.fields).forEach(([nestedFieldName, nestedFieldConfig]) => {
          const nestedField = nestedFieldConfig as SurveyField;
          const nestedValue = formData[fieldName]?.[nestedFieldName];
          
          if (nestedField.validation.required && !nestedValue) {
            console.log(`Validation error: ${fieldName}.${nestedFieldName} is required`);
            newErrors[`${fieldName}.${nestedFieldName}`] = 'This field is required';
          }
        });
      }
      // Handle regular fields
      else if (field.validation.required && !formData[fieldName]) {
        console.log(`Validation error: ${fieldName} is required`);
        newErrors[fieldName] = 'This field is required';
      }
    });
    
    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("%c === SURVEY FORM SUBMISSION DEBUG ===", "background: #3f51b5; color: white; font-weight: bold; padding: 4px;");
    console.log("Form submission started with equipmentId:", equipmentId);
    
    if (!validateForm()) {
      console.log("%c Form validation failed", "color: red; font-weight: bold;");
      console.log("Validation errors:", errors);
      return;
    }
    
    try {
      console.log("%c Form validation passed", "color: green; font-weight: bold;");
      // Extract base fields that should be at the top level
      const { preparedBy, surveyDate, ...otherFields } = formData;
      
      // Prepare data for submission
      // IMPORTANT: equipmentId must be included in the data object for the backend validation to pass
      const data: SurveyFormData = {
        preparedBy,
        surveyDate, // Keep as string, backend will convert
        templateId: template.id,
        surveyData: otherFields,
        equipmentId, // Include equipmentId in the data object
        files: fileUploads // Include file uploads
      };
      
      console.log("Submitting data to API:", { 
        endpoint: `/api/surveys/equipment/${equipmentId}`,
        method: 'POST',
        equipmentId, 
        data: JSON.stringify(data, null, 2)
      });
      
      await createSurveyMutation.mutateAsync({ equipmentId, data });
      
      console.log("%c Survey submitted successfully!", "background: green; color: white; font-weight: bold; padding: 4px;");
      console.log("%c === END SURVEY FORM SUBMISSION DEBUG ===", "background: #3f51b5; color: white; font-weight: bold; padding: 4px;");
      
      if (onSuccess) {
        onSuccess(formData);
      }
      
      // Show success toast
      setSnackbar({
        open: true,
        message: 'Survey submitted successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
      
      console.log("%c Survey submission failed", "background: red; color: white; font-weight: bold; padding: 4px;");
      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        if ('cause' in error) {
          console.error('Error cause:', error.cause);
        }
        
        // If it's an Axios error, log the response
        if (error.name === 'AxiosError' && 'response' in error) {
          console.error('API Response:', error.response);
          
          // @ts-ignore
          if (error.response?.data) {
            // @ts-ignore
            const responseData = error.response.data;
            console.error('Response data:', responseData);
            
            // Log validation errors in detail
            if (responseData.errors && Array.isArray(responseData.errors)) {
              console.error('Validation errors:');
              responseData.errors.forEach((err: any, index: number) => {
                console.error(`Error ${index + 1}:`, err);
              });
            }
          }
        }
      }
      console.log("%c === END SURVEY FORM SUBMISSION DEBUG ===", "background: #3f51b5; color: white; font-weight: bold; padding: 4px;");
      
      // Show error toast
      setSnackbar({
        open: true,
        message: 'Failed to submit survey. Please try again.',
        severity: 'error'
      });
    }
  };
  
  // Function to directly submit without validation
  const handleDirectSubmit = async () => {
    try {
      console.log("%c === DIRECT SUBMISSION DEBUG ===", "background: #ff9800; color: white; font-weight: bold; padding: 4px;");
      console.log("Direct submission started with equipmentId:", equipmentId);
      
      // Create minimal valid data
      // IMPORTANT: equipmentId must be included in the data object for the backend validation to pass
      const data: SurveyFormData = {
        preparedBy: formData.preparedBy || 'Test User',
        surveyDate: formData.surveyDate || new Date().toISOString().split('T')[0],
        templateId: template.id,
        surveyData: { test: 'Direct submission test' },
        equipmentId // Include equipmentId in the data object
      };
      
      console.log("Submitting minimal data to API:", { 
        endpoint: `/api/surveys/equipment/${equipmentId}`,
        method: 'POST',
        equipmentId, 
        data: JSON.stringify(data, null, 2)
      });
      
      await createSurveyMutation.mutateAsync({ equipmentId, data });
      
      console.log("%c Direct submission successful!", "background: green; color: white; font-weight: bold; padding: 4px;");
      console.log("%c === END DIRECT SUBMISSION DEBUG ===", "background: #ff9800; color: white; font-weight: bold; padding: 4px;");
      
      setSnackbar({
        open: true,
        message: 'Direct submission successful!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error in direct submission:', error);
      
      console.log("%c Direct submission failed", "background: red; color: white; font-weight: bold; padding: 4px;");
      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        if ('cause' in error) {
          console.error('Error cause:', error.cause);
        }
        
        // If it's an Axios error, log the response
        if (error.name === 'AxiosError' && 'response' in error) {
          console.error('API Response:', error.response);
          
          // @ts-ignore
          if (error.response?.data) {
            // @ts-ignore
            const responseData = error.response.data;
            console.error('Response data:', responseData);
            
            // Log validation errors in detail
            if (responseData.errors && Array.isArray(responseData.errors)) {
              console.error('Validation errors:');
              responseData.errors.forEach((err: any, index: number) => {
                console.error(`Error ${index + 1}:`, err);
              });
            }
          }
        }
      }
      console.log("%c === END DIRECT SUBMISSION DEBUG ===", "background: #ff9800; color: white; font-weight: bold; padding: 4px;");
      
      setSnackbar({
        open: true,
        message: 'Direct submission failed. See console for details.',
        severity: 'error'
      });
    }
  };
  
  // Handle closing the snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  const renderField = (fieldName: string, fieldConfig: SurveyField) => {
    const { type, label, validation, options } = fieldConfig;
    const value = formData[fieldName] || '';
    const error = !!errors[fieldName];
    const helperText = errors[fieldName];
    
    switch (type) {
      // Text input field
      case 'text':
        return (
          <TextField
            fullWidth
            label={label}
            value={value}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required={validation.required}
            error={error}
            helperText={helperText}
            margin="normal"
          />
        );
        
      // Number input field
      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={label}
            value={value}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required={validation.required}
            error={error}
            helperText={helperText}
            margin="normal"
          />
        );
        
      // Date input field
      case 'date':
        return (
          <TextField
            fullWidth
            type="date"
            label={label}
            value={value}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required={validation.required}
            error={error}
            helperText={helperText}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        );
        
      // Multi-line text input field
      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={label}
            value={value}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            required={validation.required}
            error={error}
            helperText={helperText}
            margin="normal"
          />
        );
        
      // Dropdown selection field
      case 'select':
        return (
          <FormControl 
            fullWidth 
            margin="normal" 
            error={error} 
            required={validation.required}
          >
            <InputLabel>{label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              label={label}
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
        
      // Radio button selection field
      case 'radio':
        return (
          <FormControl 
            component="fieldset" 
            margin="normal" 
            error={error} 
            required={validation.required}
          >
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              value={value}
              onChange={(e) => handleChange(fieldName, e.target.value)}
            >
              {options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {error && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      // File upload field
      case 'file':
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl 
              fullWidth 
              margin="normal" 
              error={error} 
              required={validation.required}
            >
              <FormLabel component="legend">{label}</FormLabel>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 1 }}
              >
                {value ? 'Change File' : 'Upload File'}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileUpload(fieldName, e.target.files)}
                />
              </Button>
              {value && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected file: {value}
                </Typography>
              )}
              {error && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
          </Box>
        );

      /**
       * Array field - renders a collection of items with a defined template
       * 
       * IMPORTANT: For this to work, the SurveyField interface in packages/types/survey.ts
       * must include 'array' as a valid type and have the itemTemplate property.
       * 
       * This case handles array fields like:
       * - surveyPhotos: Collection of photos with descriptions and locations
       * - surveyNotes: Collection of notes with categories and priorities
       * - markups: Collection of markup files with titles and descriptions
       */
      case 'array':
        // For array type fields with item templates
        if (!fieldConfig.itemTemplate) {
          return null;
        }
        
        // Initialize the array if it doesn't exist
        const arrayValue = formData[fieldName] as any[] || [];
        if (!formData[fieldName]) {
          handleChange(fieldName, []);
        }
        
        return (
          <Box sx={{ mt: 3, mb: 3 }}>
            <Typography variant="h6">{label}</Typography>
            
            {arrayValue.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                No items added yet. Click the button below to add an item.
              </Typography>
            ) : (
              arrayValue.map((item, index) => (
                <Card key={index} sx={{ mb: 2, mt: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1">
                        {label} Item #{index + 1}
                      </Typography>
                      <IconButton 
                        color="error" 
                        onClick={() => handleRemoveArrayItem(fieldName, index)}
                        aria-label="remove item"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    
                    {Object.entries(fieldConfig.itemTemplate).map(([itemFieldName, itemFieldConfig]) => {
                      const itemField = itemFieldConfig as SurveyField;
                      const itemValue = item[itemFieldName] || '';
                      const itemErrorKey = `${fieldName}[${index}].${itemFieldName}`;
                      const itemError = !!errors[itemErrorKey];
                      const itemHelperText = errors[itemErrorKey];
                      
                      // Render different field types within array items
                      switch (itemField.type) {
                        case 'text':
                          return (
                            <TextField
                              key={itemFieldName}
                              fullWidth
                              label={itemField.label}
                              value={itemValue}
                              onChange={(e) => handleArrayItemChange(fieldName, index, itemFieldName, e.target.value)}
                              required={itemField.validation.required}
                              error={itemError}
                              helperText={itemHelperText}
                              margin="normal"
                            />
                          );
                          
                        case 'textarea':
                          return (
                            <TextField
                              key={itemFieldName}
                              fullWidth
                              multiline
                              rows={4}
                              label={itemField.label}
                              value={itemValue}
                              onChange={(e) => handleArrayItemChange(fieldName, index, itemFieldName, e.target.value)}
                              required={itemField.validation.required}
                              error={itemError}
                              helperText={itemHelperText}
                              margin="normal"
                            />
                          );
                          
                        case 'select':
                          return (
                            <FormControl 
                              key={itemFieldName}
                              fullWidth 
                              margin="normal" 
                              error={itemError} 
                              required={itemField.validation.required}
                            >
                              <InputLabel>{itemField.label}</InputLabel>
                              <Select
                                value={itemValue}
                                onChange={(e) => handleArrayItemChange(fieldName, index, itemFieldName, e.target.value)}
                                label={itemField.label}
                              >
                                {itemField.options?.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                              {itemError && <FormHelperText>{itemHelperText}</FormHelperText>}
                            </FormControl>
                          );
                          
                        case 'file':
                          return (
                            <Box key={itemFieldName} sx={{ mt: 2 }}>
                              <FormControl 
                                fullWidth 
                                margin="normal" 
                                error={itemError} 
                                required={itemField.validation.required}
                              >
                                <FormLabel component="legend">{itemField.label}</FormLabel>
                                <Button
                                  variant="outlined"
                                  component="label"
                                  startIcon={<CloudUploadIcon />}
                                  sx={{ mt: 1 }}
                                >
                                  {itemValue ? 'Change File' : 'Upload File'}
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleArrayItemFileUpload(fieldName, index, itemFieldName, e.target.files)}
                                  />
                                </Button>
                                {itemValue && (
                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                    Selected file: {itemValue}
                                  </Typography>
                                )}
                                {itemError && <FormHelperText>{itemHelperText}</FormHelperText>}
                              </FormControl>
                            </Box>
                          );
                          
                        default:
                          return null;
                      }
                    })}
                  </CardContent>
                </Card>
              ))
            )}
            
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => handleAddArrayItem(fieldName)}
              sx={{ mt: 1 }}
            >
              Add {label} Item
            </Button>
          </Box>
        );

      // Object field - renders a nested object with its own fields
      case 'object':
        // For object type fields with nested fields
        if (!fieldConfig.fields) {
          return null;
        }
        
        // Initialize the parent object if it doesn't exist
        if (!formData[fieldName]) {
          handleChange(fieldName, {});
        }
        
        return (
          <Accordion defaultExpanded={false} sx={{ mt: 2 }}>
            <AccordionSummary 
              expandIcon={<span>▼</span>}
              aria-controls={`${fieldName}-content`}
              id={`${fieldName}-header`}
            >
              <Typography>{label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {Object.entries(fieldConfig.fields).map(([nestedFieldName, nestedFieldConfig]) => {
                  const nestedField = nestedFieldConfig as SurveyField;
                  const nestedValue = formData[fieldName]?.[nestedFieldName] || '';
                  const nestedError = !!errors[`${fieldName}.${nestedFieldName}`];
                  const nestedHelperText = errors[`${fieldName}.${nestedFieldName}`];
                  
                  return (
                    <div className="grid-item" key={`${fieldName}.${nestedFieldName}`}>
                      {nestedField.type === 'select' && (
                        <FormControl 
                          fullWidth 
                          margin="normal" 
                          error={nestedError} 
                          required={nestedField.validation.required}
                        >
                          <InputLabel>{nestedField.label}</InputLabel>
                          <Select
                            value={nestedValue}
                            onChange={(e) => handleNestedChange(fieldName, nestedFieldName, e.target.value)}
                            label={nestedField.label}
                          >
                            {nestedField.options?.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          {nestedError && <FormHelperText>{nestedHelperText}</FormHelperText>}
                        </FormControl>
                      )}
                      
                      {nestedField.type === 'text' && (
                        <TextField
                          fullWidth
                          label={nestedField.label}
                          value={nestedValue}
                          onChange={(e) => handleNestedChange(fieldName, nestedFieldName, e.target.value)}
                          required={nestedField.validation.required}
                          error={nestedError}
                          helperText={nestedHelperText}
                          margin="normal"
                        />
                      )}
                      
                      {/* Add support for other field types as needed */}
                    </div>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          General Information
        </Typography>
        <Grid container spacing={2}>
          <div className="grid-item">
            <TextField
              id="preparedBy"
              fullWidth
              label="Prepared By"
              value={formData.preparedBy}
              onChange={(e) => handleChange('preparedBy', e.target.value)}
              required
              error={!!errors.preparedBy}
              helperText={errors.preparedBy}
              margin="normal"
            />
          </div>
          <div className="grid-item">
            <TextField
              id="surveyDate"
              fullWidth
              type="date"
              label="Survey Date"
              value={formData.surveyDate}
              onChange={(e) => handleChange('surveyDate', e.target.value)}
              required
              error={!!errors.surveyDate}
              helperText={errors.surveyDate}
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </Grid>
        
        {/* Base Fields */}
        {Object.entries(template.baseFields).map(([fieldName, fieldConfig]) => {
          // Skip preparedBy and surveyDate as they're handled separately
          if (fieldName === 'preparedBy' || fieldName === 'date' || fieldName === 'surveyDate') {
            return null;
          }
          
          return (
            <Box key={fieldName}>
              {renderField(fieldName, fieldConfig as SurveyField)}
            </Box>
          );
        })}
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Equipment-Specific Information
        </Typography>
        
        {/* Specific Fields */}
        {Object.entries(template.specificFields).map(([fieldName, fieldConfig]) => (
          <Box key={fieldName}>
            {renderField(fieldName, fieldConfig as SurveyField)}
          </Box>
        ))}
      </Paper>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          onClick={() => console.log("Button clicked directly")}
          variant="contained"
          color="primary"
          disabled={createSurveyMutation.isPending}
        >
          {createSurveyMutation.isPending ? 'Submitting...' : 'Submit Survey'}
        </Button>
      </Box>
      
      {/* Debug button for direct submission */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="button"
          onClick={handleDirectSubmit}
          variant="outlined"
          color="secondary"
          disabled={createSurveyMutation.isPending}
        >
          Debug: Direct Submit
        </Button>
      </Box>
      
      {/* Toast Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DynamicSurveyForm;