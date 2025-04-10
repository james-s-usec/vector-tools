import { useState, useEffect } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface Survey {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other survey properties as needed
}

interface SurveyFormData {
  preparedBy: string;
  surveyDate: string;
  templateId?: number;
  surveyData?: any;
  equipmentId?: number;
  files?: Record<string, File[]>;
  [key: string]: any;
}

export const useSurveys = () => {
  const [data, setData] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSurveys = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/surveys');
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch surveys'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const refetch = () => {
    fetchSurveys();
  };

  return { data, isLoading, error, refetch };
};

// Create survey mutation hook
export const useCreateSurvey = () => {
  return useMutation({
    mutationFn: async ({ equipmentId, data }: { equipmentId: number, data: SurveyFormData }) => {
      const response = await axios.post(`/api/surveys/equipment/${equipmentId}`, data);
      return response.data;
    }
  });
};