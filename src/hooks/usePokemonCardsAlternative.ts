import { useQuery } from '@tanstack/react-query'
import { PokemonRepositoryAlternative } from '@/repositories/pokemon/pokemonRepositoryAlternative'
import { PokemonCard } from '@/types/pokemon'

const alternativeRepo = new PokemonRepositoryAlternative()

// Query keys para APIs alternativas
export const alternativeKeys = {
  all: ['pokemon-alternative'] as const,
  cards: () => [...alternativeKeys.all, 'cards'] as const,
  fromAnySource: () => [...alternativeKeys.cards(), 'any-source'] as const,
  tcgPokemon: () => [...alternativeKeys.cards(), 'tcg-pokemon'] as const,
  tcgdx: () => [...alternativeKeys.cards(), 'tcgdx'] as const,
}

/**
 * Hook que tenta buscar cartas de qualquer fonte disponível
 */
export function usePokemonCardsFromAnySource() {
  return useQuery({
    queryKey: alternativeKeys.fromAnySource(),
    queryFn: () => alternativeRepo.getCardsFromAnySource(),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 2, // Tenta 2 vezes antes de falhar
  })
}

/**
 * Hook para testar especificamente a URL do tcg.pokemon.com
 */
export function useTCGPokemonCards() {
  return useQuery({
    queryKey: alternativeKeys.tcgPokemon(),
    queryFn: () => alternativeRepo.testTCGPokemonCards(),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}

/**
 * Hook para testar a API TCGdx
 */
export function useTCGdxCards() {
  return useQuery({
    queryKey: alternativeKeys.tcgdx(),
    queryFn: () => alternativeRepo.testTCGdxCards(),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}

/**
 * Hook combinado que usa a fonte que funcionar melhor
 */
export function useBestPokemonCardsSource() {
  // Primeiro tenta a API oficial
  const officialQuery = useQuery({
    queryKey: ['pokemon', 'official'],
    queryFn: async () => {
      const response = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=12&q=rarity:"Rare"')
      const data = await response.json()
      return data.data || []
    },
    staleTime: 1000 * 60 * 5,
  })

  // Se a oficial falhar, tenta fontes alternativas
  const alternativeQuery = usePokemonCardsFromAnySource()

  // Retorna a primeira que funcionar
  if (officialQuery.data && officialQuery.data.length > 0) {
    return {
      ...officialQuery,
      source: 'official'
    }
  }

  if (alternativeQuery.data && alternativeQuery.data.length > 0) {
    return {
      ...alternativeQuery,
      source: 'alternative'
    }
  }

  // Se nenhuma funcionar, retorna o estado de loading/error
  return {
    data: [],
    isLoading: officialQuery.isLoading || alternativeQuery.isLoading,
    isError: officialQuery.isError && alternativeQuery.isError,
    error: officialQuery.error || alternativeQuery.error,
    source: 'none'
  }
}
