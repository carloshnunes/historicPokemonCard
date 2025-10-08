import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

const useBaseReactQuery = <TQueryFnData, TError = unknown>(
  options: UseQueryOptions<TQueryFnData, TError>
): UseQueryResult<TQueryFnData, TError> => {
  return useQuery({
    ...options,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export default useBaseReactQuery;
