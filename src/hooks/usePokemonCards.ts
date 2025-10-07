import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { PokemonRepository } from '@/repositories/pokemon/pokemonRepository'
import { SearchParams } from '@/types/pokemon'

const pokemonRepository = new PokemonRepository()

// Query keys
export const pokemonKeys = {
  all: ['pokemon'] as const,
  cards: () => [...pokemonKeys.all, 'cards'] as const,
  card: (id: string) => [...pokemonKeys.cards(), id] as const,
  search: (params: SearchParams) => [...pokemonKeys.cards(), 'search', params] as const,
  popular: (limit: number) => [...pokemonKeys.cards(), 'popular', limit] as const,
  recent: (limit: number) => [...pokemonKeys.cards(), 'recent', limit] as const,
  bySet: (setId: string, limit: number) => [...pokemonKeys.cards(), 'set', setId, limit] as const,
  sets: () => [...pokemonKeys.all, 'sets'] as const,
  setsBySeries: (series: string) => [...pokemonKeys.sets(), 'series', series] as const,
}

/**
 * Hook para buscar cartas Pokémon com filtros
 */
export function usePokemonCards(params: SearchParams) {
  return useQuery({
    queryKey: pokemonKeys.search(params),
    queryFn: () => pokemonRepository.searchCards(params),
    enabled: !!(params.name || params.set || params.type || params.rarity),
  })
}

/**
 * Hook para busca infinita de cartas (paginação)
 */
export function useInfinitePokemonCards(params: Omit<SearchParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: pokemonKeys.search(params),
    queryFn: ({ pageParam = 1 }) => 
      pokemonRepository.searchCards({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.totalCount / lastPage.pageSize)
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined
    },
    initialPageParam: 1,
    enabled: !!(params.name || params.set || params.type || params.rarity),
  })
}

/**
 * Hook para buscar carta por ID
 */
export function usePokemonCard(id: string) {
  return useQuery({
    queryKey: pokemonKeys.card(id),
    queryFn: () => pokemonRepository.getCardById(id),
    enabled: !!id,
  })
}

/**
 * Hook para buscar cartas populares
 */
export function usePopularPokemonCards(limit: number = 12) {
  return useQuery({
    queryKey: pokemonKeys.popular(limit),
    queryFn: () => pokemonRepository.getPopularCards(limit),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}

/**
 * Hook para buscar cartas recentes
 */
export function useRecentPokemonCards(limit: number = 12) {
  return useQuery({
    queryKey: pokemonKeys.recent(limit),
    queryFn: () => pokemonRepository.getRecentCards(limit),
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

/**
 * Hook para buscar cartas por set
 */
export function usePokemonCardsBySet(setId: string, limit: number = 20) {
  return useQuery({
    queryKey: pokemonKeys.bySet(setId, limit),
    queryFn: () => pokemonRepository.getCardsBySet(setId, limit),
    enabled: !!setId,
    staleTime: 1000 * 60 * 15, // 15 minutos
  })
}

/**
 * Hook para buscar todos os sets
 */
export function usePokemonSets() {
  return useQuery({
    queryKey: pokemonKeys.sets(),
    queryFn: () => pokemonRepository.getSets(),
    staleTime: 1000 * 60 * 30, // 30 minutos (sets não mudam frequentemente)
  })
}

/**
 * Hook para buscar sets por série
 */
export function usePokemonSetsBySeries(series: string) {
  return useQuery({
    queryKey: pokemonKeys.setsBySeries(series),
    queryFn: () => pokemonRepository.getSetsBySeries(series),
    enabled: !!series,
    staleTime: 1000 * 60 * 30, // 30 minutos
  })
}
