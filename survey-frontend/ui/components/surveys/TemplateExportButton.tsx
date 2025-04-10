import React, { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  CircularProgress,
  Tooltip
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useExportSurveyTemplate, useExportMultipleSurveyTemplates } from '@hvac/hooks/useSurveys';

interface TemplateExportButtonProps {
  templateId?: number;
  selectedTemplateIds?: number[];
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

/**
 * Button component for exporting survey templates to Excel
 * 
 * Can be used in two modes:
 * 1. Single template export (provide templateId)
 * 2. Multiple templates export (provide selectedTemplateIds)
 */
const TemplateExportButton: React.FC<TemplateExportButtonProps> = ({
  templateId,
  selectedTemplateIds,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const exportSingleMutation = useExportSurveyTemplate();
  const exportMultipleMutation = useExportMultipleSurveyTemplates();
  
  const isLoading = exportSingleMutation.isPending || exportMultipleMutation.isPending;
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleExportSingle = () => {
    if (templateId) {
      exportSingleMutation.mutate(templateId);
    }
    handleClose();
  };
  
  const handleExportMultiple = () => {
    exportMultipleMutation.mutate(selectedTemplateIds);
    handleClose();
  };
  
  const handleExportAll = () => {
    exportMultipleMutation.mutate(undefined);
    handleClose();
  };
  
  // If we have a single template ID, show a simple export button
  if (templateId && !selectedTemplateIds) {
    return (
      <Tooltip title="Export this template to Excel">
        <Button
          variant={variant}
          color={color}
          size={size}
          fullWidth={fullWidth}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
          onClick={handleExportSingle}
          disabled={isLoading}
        >
          Export
        </Button>
      </Tooltip>
    );
  }
  
  // If we have multiple template IDs or no IDs, show a dropdown
  return (
    <>
      <Button
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
        onClick={handleClick}
        disabled={isLoading}
        aria-controls={open ? 'export-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Export
      </Button>
      <Menu
        id="export-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { 'aria-labelledby': 'export-button' }
        }}
      >
        {selectedTemplateIds && selectedTemplateIds.length > 0 && (
          <MenuItem onClick={handleExportMultiple}>
            Export Selected ({selectedTemplateIds.length})
          </MenuItem>
        )}
        <MenuItem onClick={handleExportAll}>Export All Templates</MenuItem>
      </Menu>
    </>
  );
};

export default TemplateExportButton;