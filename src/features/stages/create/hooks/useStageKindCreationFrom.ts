import { useState } from 'react';
import { StageKind } from '../../types/types';
import { useCreateStageKindsMutation } from '../../api/stageKindsApi';

export const useStageKindCreation = (onSuccess?: () => void) => {
    const [createKind, { isLoading, error }] = useCreateStageKindsMutation();

  const createStageKind = async (data: StageKind) => {

    try {
        await createKind(data).unwrap();
      onSuccess?.();
    } catch (err) {
        console.error('Failed to create stage kind:', err);
    } 
  };

  return { 
    createStageKind, 
    isLoading, 
    error: error ? 'Произошла ошибка при создании' : null };
};