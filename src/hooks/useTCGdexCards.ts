import { useState, useEffect } from 'react'

// Hook para buscar cartas do TCGdex com detalhes completos
export function useTCGdexCards(limit: number = 12) {
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
        
        console.log(`🔄 Buscando ${limit} cartas completas do TCGdex...`)
        
        // Lista de sets populares
        const popularSets = ['swsh1', 'swsh9', 'sv01', 'sv02', 'sv03', 'base1', 'swsh10', 'swsh11']
        const randomSet = popularSets[Math.floor(Math.random() * popularSets.length)]
        
        console.log(`📦 Buscando cartas do set ${randomSet}...`)
        
        // 1. Busca o set para ter a lista de IDs
        const setResponse = await fetch(`https://api.tcgdex.net/v2/en/sets/${randomSet}`)
        if (!setResponse.ok) {
          throw new Error(`Erro HTTP: ${setResponse.status}`)
        }
        
        const setData = await setResponse.json()
        const allCards = setData.cards || []
        
        // 2. Embaralha e pega alguns IDs aleatórios
        const shuffled = allCards.sort(() => 0.5 - Math.random())
        const selectedCardIds = shuffled.slice(0, limit)
        
        console.log(`🔄 Buscando detalhes completos de ${selectedCardIds.length} cartas...`)
        
        // 3. Busca detalhes completos de cada carta em paralelo
        const cardPromises = selectedCardIds.map((card: any) => 
          fetch(`https://api.tcgdex.net/v2/en/cards/${card.id}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null)
        )
        
        const detailedCards = await Promise.all(cardPromises)
        
        // Filtra cartas que falharam
        const validCards = detailedCards.filter(card => card !== null)
        
        const endTime = Date.now()
        setLoadTime(endTime - startTime)
        
        console.log(`✅ ${validCards.length} cartas completas carregadas (${endTime - startTime}ms)`)
        setCards(validCards)
        
      } catch (err) {
        console.error('❌ Erro ao buscar cartas do TCGdex:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setCards([])
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
    loadTime
  }
}

// Hook para buscar detalhes completos de uma carta
export function useTCGdexCardById(cardId: string) {
  const [card, setCard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number>(0)

  useEffect(() => {
    if (!cardId) return

    const fetchCard = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const startTime = Date.now()
        
        console.log(`🔄 Buscando carta ${cardId} do TCGdex...`)
        
        // Endpoint para carta específica: /v2/{lang}/cards/{id}
        const response = await fetch(`https://api.tcgdex.net/v2/en/cards/${cardId}`)
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`)
        }
        
        const data = await response.json()
        const endTime = Date.now()
        setLoadTime(endTime - startTime)
        
        console.log(`✅ Carta ${cardId} carregada do TCGdex`)
        setCard(data)
        
      } catch (err) {
        console.error('❌ Erro ao buscar carta do TCGdex:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCard()
  }, [cardId])

  return {
    card,
    isLoading,
    error,
    loadTime
  }
}

// Hook para buscar cartas por set com detalhes completos
export function useTCGdexCardsBySet(setId: string, limit: number = 12) {
  const [cards, setCards] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadTime, setLoadTime] = useState<number>(0)

  useEffect(() => {
    if (!setId) return

    const fetchCards = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const startTime = Date.now()
        
        console.log(`🔄 Buscando cartas do set ${setId} no TCGdex...`)
        
        // 1. Busca o set para ter a lista de IDs
        const setResponse = await fetch(`https://api.tcgdex.net/v2/en/sets/${setId}`)
        
        if (!setResponse.ok) {
          throw new Error(`Erro HTTP: ${setResponse.status}`)
        }
        
        const setData = await setResponse.json()
        const allCards = setData.cards || []
        
        // 2. Embaralha e pega alguns IDs
        const shuffled = allCards.sort(() => 0.5 - Math.random())
        const selectedCardIds = shuffled.slice(0, limit)
        
        console.log(`🔄 Buscando detalhes de ${selectedCardIds.length} cartas do set ${setData.name}...`)
        
        // 3. Busca detalhes completos em paralelo
        const cardPromises = selectedCardIds.map((card: any) => 
          fetch(`https://api.tcgdex.net/v2/en/cards/${card.id}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null)
        )
        
        const detailedCards = await Promise.all(cardPromises)
        
        // Filtra cartas que falharam
        const validCards = detailedCards.filter(card => card !== null)
        
        const endTime = Date.now()
        setLoadTime(endTime - startTime)
        
        console.log(`✅ ${validCards.length} cartas do set ${setData.name} carregadas (${endTime - startTime}ms)`)
        setCards(validCards)
        
      } catch (err) {
        console.error('❌ Erro ao buscar cartas do set:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setCards([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCards()
  }, [setId, limit])

  return {
    cards,
    isLoading,
    error,
    loadTime
  }
}

// Hook para buscar cartas com filtro de nome
export function useTCGdexSearchCards(query: string, limit: number = 20) {
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
        
        console.log(`🔄 Buscando "${query}" no TCGdex...`)
        
        // Primeiro busca todas as cartas
        const response = await fetch(`https://api.tcgdex.net/v2/en/cards`)
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Filtra localmente por nome
        const filtered = data.filter((card: any) => 
          card.name?.toLowerCase().includes(query.toLowerCase())
        ).slice(0, limit)
        
        const endTime = Date.now()
        setLoadTime(endTime - startTime)
        
        console.log(`✅ ${filtered.length} cartas encontradas para "${query}"`)
        setCards(filtered)
        
      } catch (err) {
        console.error('❌ Erro ao buscar cartas:', err)
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
        setCards([])
      } finally {
        setIsLoading(false)
      }
    }

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

