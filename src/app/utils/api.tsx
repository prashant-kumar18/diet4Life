// utils/api.ts
import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';

const API_URL = '/api/patients';

/**
 * GET: Fetch patient list
 */
const getPatients = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch patients');
  }
  return response.json();
};

export const useScheduleGetPatients = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: getPatients,
    staleTime: 10000,         // don't refetch if data is < 10s old
    refetchInterval: 10000,   // re-poll every 10s
  });
};

/**
 * POST: Add a new patient
 */
const postPatient = async (patientData: any) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error('Failed to add patient');
  }

  return response.json();
};

export const usePostPatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postPatient,
    onSuccess: () => {
      // refetch patient list after adding
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

const postConsultation = async ({ patientId, consultationData,}: {patientId: string; consultationData: any;}) => {
  const response = await fetch(`${API_URL}/${patientId}/add-consultation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(consultationData),
  });

  if (!response.ok) {
    throw new Error('Failed to add consultation');
  }

  return response.json();
};

export const usePostConsultation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postConsultation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

const deletePatients = async (ids: string[]) => {
  let response: Response;
  console.log("server log", ids);
    response = await fetch('/api/patients', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: ids }),
    });

  if (!response.ok) {
    throw new Error('Failed to delete patient(s)');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePatients,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

const editPatient= async ({patientId,patientData}:{patientId:string;patientData:any})=>{

    const response =await fetch(`/api/patients/${patientId}`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(patientData),
    });

    if(!response.ok)
        throw new Error('Failed to Updated'); 

    return response.json();
}

export const useEditPatient=()=>{
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
}