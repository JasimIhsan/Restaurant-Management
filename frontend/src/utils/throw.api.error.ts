import type { ApiError } from '@/types/api.erro.ts';

export const throwApiError = (error: unknown) => {
   const apiError = error as ApiError;
   throw new Error(apiError.response?.data?.message || 'Something went wrong');
};
