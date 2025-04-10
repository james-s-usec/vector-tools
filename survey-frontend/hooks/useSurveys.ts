import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Survey, SurveyTemplate, SurveyFormData } from '@hvac/types';
import { useToast } from '@hvac/ui/components/common/ToastContext';
import {
  getSurveyTemplates,
  getSurveyTemplateById,
  createSurveyTemplate,
  updateSurveyTemplate,
  deleteSurveyTemplate,
  getSurveys,
  getSurveyById,
  getEquipmentSurveys,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  exportSurveyTemplateToExcel,
  exportMultipleSurveyTemplatesToExcel,
  importSurveyTemplatesFromExcel,
  getSurveyDataImportTemplate,
  importSurveyDataFromExcel
} from '@hvac/api/surveys';
import { queryKeys } from '@hvac/api/queryKeys';

// Survey Template Hooks
export function useSurveyTemplates() {
  return useQuery({
    queryKey: queryKeys.surveyTemplates.list(),
    queryFn: () => getSurveyTemplates()
  });
}

export function useSurveyTemplate(id: number) {
  return useQuery({
    queryKey: queryKeys.surveyTemplates.detail(id),
    queryFn: () => getSurveyTemplateById(id),
    enabled: !!id
  });
}

export function useCreateSurveyTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<SurveyTemplate>) => createSurveyTemplate(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.surveyTemplates.all });
    },
  });
}

export function useUpdateSurveyTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SurveyTemplate> }) => 
      updateSurveyTemplate(id, data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ 
        queryKey: queryKeys.surveyTemplates.detail(variables.id) 
      });
      void queryClient.invalidateQueries({ 
        queryKey: queryKeys.surveyTemplates.list() 
      });
    },
  });
}

export function useDeleteSurveyTemplate() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteSurveyTemplate(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.surveyTemplates.all });
    },
  });
}

// Survey Hooks
export function useSurveys() {
  return useQuery({
    queryKey: queryKeys.surveys.list(),
    queryFn: () => getSurveys()
  });
}

export function useSurvey(id: number) {
  return useQuery({
    queryKey: queryKeys.surveys.detail(id),
    queryFn: () => getSurveyById(id),
    enabled: !!id
  });
}

export function useEquipmentSurveys(equipmentId: number) {
  return useQuery({
    queryKey: queryKeys.surveys.equipment(equipmentId),
    queryFn: () => getEquipmentSurveys(equipmentId),
    enabled: !!equipmentId
  });
}

export function useCreateSurvey() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ equipmentId, data }: { equipmentId: number; data: SurveyFormData }) => 
      createSurvey(equipmentId, data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.surveys.all });
      void queryClient.invalidateQueries({ 
        queryKey: queryKeys.surveys.equipment(variables.equipmentId) 
      });
    },
  });
}

export function useUpdateSurvey() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SurveyFormData> }) => 
      updateSurvey(id, data),
    onSuccess: (survey) => {
      void queryClient.invalidateQueries({ 
        queryKey: queryKeys.surveys.detail(survey.id) 
      });
      void queryClient.invalidateQueries({ 
        queryKey: queryKeys.surveys.equipment(survey.equipmentId) 
      });
      void queryClient.invalidateQueries({ 
        queryKey: queryKeys.surveys.list() 
      });
    },
  });
}

export function useDeleteSurvey() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => deleteSurvey(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.surveys.all });
    },
  });
}

// Survey Template Export/Import Hooks
export function useExportSurveyTemplate() {
  const { showToast } = useToast();
  
  return useMutation({
    mutationFn: (id: number) => exportSurveyTemplateToExcel(id),
    onSuccess: (data, id) => {
      // Create a download link for the Excel file
      try {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `template_${String(id)}.xlsx`;
        document.body.appendChild(a);
        a.click();
        
        // Try to open the file in a new tab
        // Note: This may be blocked by browsers' popup blockers
        window.open(url, '_blank');
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      
  
        // Show toast notification
        showToast(`Template ${String(id)} downloaded successfully`, 'success');
      } catch (error) {
        console.error('Error handling file download:', error);
        showToast('Error downloading template', 'error');
      }
    },
  });
}

export function useExportMultipleSurveyTemplates() {
  const { showToast } = useToast();
  
  return useMutation({
    mutationFn: (ids?: number[]) => exportMultipleSurveyTemplatesToExcel(ids),
    onSuccess: (data) => {
      // Create a download link for the Excel file
      try {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'survey_templates.xlsx';
        document.body.appendChild(a);
        a.click();
        
        // Try to open the file in a new tab
        // Note: This may be blocked by browsers' popup blockers
        window.open(url, '_blank');
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      
  
        // Show toast notification
        showToast('Survey templates downloaded successfully', 'success');
      } catch (error) {
        console.error('Error handling file download:', error);
        showToast('Error downloading templates', 'error');
      }
    },
  });
}

export function useImportSurveyTemplates() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ file, updateExisting }: { file: File; updateExisting?: boolean }) => 
      importSurveyTemplatesFromExcel(file, updateExisting),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.surveyTemplates.all });
    },
  });
}

// Survey Data Import Hooks
export function useGetSurveyDataImportTemplate() {
  const { showToast } = useToast();
  
  return useMutation({
    mutationFn: () => getSurveyDataImportTemplate(),
    onSuccess: (data) => {
      // Create a download link for the Excel file
      try {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'survey-data-import-template.xlsx';
        document.body.appendChild(a);
        a.click();
        
        // Try to open the file in a new tab
        // Note: This may be blocked by browsers' popup blockers
        window.open(url, '_blank');
        
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      
  
        // Show toast notification
        showToast('Survey data import template downloaded successfully', 'success');
      } catch (error) {
        console.error('Error handling file download:', error);
        showToast('Error downloading template', 'error');
      }
    },
  });
}

export function useImportSurveyData() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (file: File) => importSurveyDataFromExcel(file),
    onSuccess: () => {
      // Invalidate surveys queries to refresh the data
      void queryClient.invalidateQueries({ queryKey: queryKeys.surveys.all });
      
      // Show success message or notification
      // This would typically be handled by the component using this hook
    },
    onError: (error) => {
      // Handle error
      console.error('Error importing survey data:', error);
      
      // Show error message or notification
      // This would typically be handled by the component using this hook
    },
  });
}