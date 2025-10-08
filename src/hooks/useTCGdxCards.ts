import { getApiHeaders } from '@/config/api'
import { useState, useEffect } from 'react'

// Hook principal para cartas usando Pokémon TCG API oficial
export function useTCGdxCards(limit: number = 8) {
  const [cards, setCards] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number>(0)

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const startTime = Date.now()
        
        // Tenta apenas APIs reais de cartas Pokémon
        const apis = [
          {
            name: 'TCGdx',
            url: 'https://api.tcgdx.net/v2/en/cards',
            processor: (data: any[]) => data.filter((card: any) => 
              card.rarity === 'Rare Holo' || card.rarity === 'Rare Ultra'
            ).slice(0, limit)
          },
          {
            name: 'Pokemon TCG (via proxy)',
            url: '/api/pokemon/cards?pageSize=' + limit + '&q=rarity:"Rare Holo"',
            processor: (data: any) => (data.data || []).slice(0, limit)
          }
        ]

        let lastError = null
        
        for (const api of apis) {
          try {
            console.log(`🔄 Tentando ${api.name}...`)
            
            const response = await fetch(api.url, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok) {
              throw new Error(`HTTP ${response.status}`)
            }

            const data = await response.json()
            console.log(`✅ ${api.name} funcionou!`, data)
            
            const processedCards = api.processor(data)
            
            if (processedCards && processedCards.length > 0) {
              const endTime = Date.now()
              setLoadTime(endTime - startTime)
              setCards(processedCards)
              console.log(`🎉 ${processedCards.length} cartas carregadas via ${api.name}`)
              return // Sucesso!
            }
            
          } catch (err) {
            console.log(`❌ ${api.name} falhou:`, err)
            lastError = err
            continue // Tenta próxima API
          }
        }
        
        // Se chegou aqui, todas as APIs falharam
        throw lastError || new Error('Todas as APIs falharam')
        
      } catch (err) {
        console.error('❌ Todas as APIs falharam:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setCards([]) // Sem fallback - só mostra se API funcionar
      } finally {
        setIsLoading(false)
      }
    }

    fetchCards()
  }, [limit])

  return {
    cards,
    isLoading,
    error,
    loadTime,
    refresh: () => {
      setIsLoading(true)
      setError(null)
      // Re-executar o useEffect
      window.location.reload()
    }
  }
}

// Hook para buscar uma carta específica na TCGdx
export function useTCGdxCardById(id: string) {
  const [card, setCard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number>(0)

  useEffect(() => {
    if (!id) return

    const fetchCard = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const startTime = Date.now()
        
        // TCGdx API - busca carta específica
        const response = await fetch(`https://api.tcgdx.net/v2/en/cards/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })

        const endTime = Date.now()
        setLoadTime(endTime - startTime)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        console.log('🚀 TCGdx Card Response:', data)
        setCard(data)
        
      } catch (err) {
        console.error('❌ TCGdx Card Error:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCard()
  }, [id])

  return {
    card,
    isLoading,
    error,
    loadTime
  }
}

// Hook para busca na TCGdx
export function useTCGdxSearch(query: string, limit: number = 20) {
  const [cards, setCards] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number>(0)

  useEffect(() => {
    if (!query || query.length < 2) {
      setCards([])
      return
    }

    const searchCards = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const startTime = Date.now()
        
        // TCGdx API - busca por nome
        const response = await fetch(`https://api.tcgdx.net/v2/en/cards?name=${encodeURIComponent(query)}&limit=${limit}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })

        const endTime = Date.now()
        setLoadTime(endTime - startTime)

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        console.log('🚀 TCGdx Search Response:', data)
        setCards(data || [])
        
      } catch (err) {
        console.error('❌ TCGdx Search Error:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setCards([])
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce para evitar muitas requisições
    const timeoutId = setTimeout(searchCards, 300)
    
    return () => clearTimeout(timeoutId)
  }, [query, limit])

  return {
    cards,
    isLoading,
    error,
    loadTime
  }
}

// Função utilitária para formatar preços
export function formatPrice(pricing: any, variant: 'normal' | 'holo' | 'reverse' = 'normal') {
  if (!pricing) return null

  // TCGPlayer (USD)
  if (pricing.tcgplayer) {
    const tcgData = pricing.tcgplayer[variant] || pricing.tcgplayer.normal
    if (tcgData) {
      return {
        currency: 'USD',
        market: tcgData.marketPrice,
        low: tcgData.lowPrice,
        high: tcgData.highPrice,
        mid: tcgData.midPrice,
        direct: tcgData.directLowPrice,
        updated: pricing.tcgplayer.updated
      }
    }
  }

  // Cardmarket (EUR)
  if (pricing.cardmarket) {
    const cmData = pricing.cardmarket
    return {
      currency: 'EUR',
      market: variant === 'holo' ? cmData['avg-holo'] : cmData.avg,
      low: variant === 'holo' ? cmData['low-holo'] : cmData.low,
      trend: variant === 'holo' ? cmData['trend-holo'] : cmData.trend,
      avg7: variant === 'holo' ? cmData['avg7-holo'] : cmData.avg7,
      avg30: variant === 'holo' ? cmData['avg30-holo'] : cmData.avg30,
      updated: cmData.updated
    }
  }

  return null
}