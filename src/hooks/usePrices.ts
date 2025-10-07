import { useQuery } from '@tanstack/react-query'
import { PriceRepository } from '@/repositories/prices/priceRepository'
import { CardPrice, PriceHistory } from '@/types/pokemon'

const priceRepository = new PriceRepository()

// Query keys
export const priceKeys = {
  all: ['prices'] as const,
  card: (cardId: string) => [...priceKeys.all, 'card', cardId] as const,
  history: (cardId: string, days: number) => [...priceKeys.all, 'history', cardId, days] as const,
  multiple: (cardIds: string[]) => [...priceKeys.all, 'multiple', cardIds.sort()] as const,
  topGainers: (limit: number) => [...priceKeys.all, 'topGainers', limit] as const,
  topLosers: (limit: number) => [...priceKeys.all, 'topLosers', limit] as const,
}

/**
 * Hook para buscar preço atual de uma carta
 */
export function useCardPrice(cardId: string) {
  return useQuery({
    queryKey: priceKeys.card(cardId),
    queryFn: () => priceRepository.getCardPrice(cardId),
    enabled: !!cardId,
    staleTime: 1000 * 60 * 2, // 2 minutos (preços mudam frequentemente)
  })
}

/**
 * Hook para buscar histórico de preços de uma carta
 */
export function usePriceHistory(cardId: string, days: number = 30) {
  return useQuery({
    queryKey: priceKeys.history(cardId, days),
    queryFn: () => priceRepository.getPriceHistory(cardId, days),
    enabled: !!cardId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

/**
 * Hook para buscar preços de múltiplas cartas
 */
export function useMultipleCardPrices(cardIds: string[]) {
  return useQuery({
    queryKey: priceKeys.multiple(cardIds),
    queryFn: () => priceRepository.getMultipleCardPrices(cardIds),
    enabled: cardIds.length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutos
  })
}

/**
 * Hook para buscar cartas com maior valorização
 */
export function useTopGainers(limit: number = 10) {
  return useQuery({
    queryKey: priceKeys.topGainers(limit),
    queryFn: () => priceRepository.getTopGainers(limit),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}

/**
 * Hook para buscar cartas com maior desvalorização
 */
export function useTopLosers(limit: number = 10) {
  return useQuery({
    queryKey: priceKeys.topLosers(limit),
    queryFn: () => priceRepository.getTopLosers(limit),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}

/**
 * Hook combinado para buscar carta com preço
 */
export function useCardWithPrice(cardId: string) {
  const cardQuery = useQuery({
    queryKey: ['pokemon', 'cards', cardId],
    queryFn: () => {
      // Aqui você pode combinar as duas APIs
      // Por enquanto retorna dados mock
      return {
        id: cardId,
        name: 'Charizard',
        imageUrl: 'https://images.pokemontcg.io/base1/4_hires.png',
        set: 'Base Set',
        rarity: 'Rare Holo',
      }
    },
    enabled: !!cardId,
  })

  const priceQuery = useCardPrice(cardId)

  return {
    card: cardQuery.data,
    price: priceQuery.data,
    isLoading: cardQuery.isLoading || priceQuery.isLoading,
    isError: cardQuery.isError || priceQuery.isError,
    error: cardQuery.error || priceQuery.error,
  }
}
