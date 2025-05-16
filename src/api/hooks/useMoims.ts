import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { moimsAPI } from '../functions/moimsAPI';

export const useMoimsList = () => {
  return useQuery({
    queryKey: ['moims'],
    queryFn: moimsAPI.getMoimsList,
  });
};

export const useMoimDetail = (id: number) => {
  return useQuery({
    queryKey: ['moim', id],
    queryFn: () => moimsAPI.getMoimDetail(id),
  });
};

export const useDeleteMoim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => moimsAPI.deleteMoim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moims'] });
    },
  });
};
export const useApplyMoim = (id: number) => {
  return useMutation({
    mutationFn: (role: string) => moimsAPI.applyMoim(id, role),
  });
};
export const useLikeMoim = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => moimsAPI.likeMoim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moim', id] });
    },
  });
};

export const useDislikeMoim = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => moimsAPI.disLikeMoim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moim', id] });
    },
  });
};
