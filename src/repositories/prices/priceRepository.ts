import axios from 'axios'
import { PriceHistory, CardPrice } from '@/types/pokemon'

// Mock repository para preços - será substituído por uma API real
export class PriceRepository {
  private mockPrices: CardPrice[] = [
    {
      cardId: 'base1-4',
      currentPrice: 150.00,
      priceChange: 15.00,
      priceChangePercent: 11.11,
      lastUpdated: new Date().toISOString(),
      history: [
        { id: '1', cardId: 'base1-4', date: '2024-01-01', price: 120.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '2', cardId: 'base1-4', date: '2024-01-15', price: 135.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '3', cardId: 'base1-4', date: '2024-02-01', price: 140.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '4', cardId: 'base1-4', date: '2024-02-15', price: 145.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '5', cardId: 'base1-4', date: '2024-03-01', price: 150.00, source: 'Mercado Livre', condition: 'NM' },
      ]
    },
    {
      cardId: 'base1-17',
      currentPrice: 45.00,
      priceChange: -5.00,
      priceChangePercent: -10.00,
      lastUpdated: new Date().toISOString(),
      history: [
        { id: '6', cardId: 'base1-17', date: '2024-01-01', price: 50.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '7', cardId: 'base1-17', date: '2024-01-15', price: 48.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '8', cardId: 'base1-17', date: '2024-02-01', price: 47.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '9', cardId: 'base1-17', date: '2024-02-15', price: 46.00, source: 'Mercado Livre', condition: 'NM' },
        { id: '10', cardId: 'base1-17', date: '2024-03-01', price: 45.00, source: 'Mercado Livre', condition: 'NM' },
      ]
    }
  ]

  /**
   * Busca preço atual de uma carta
   */
  async getCardPrice(cardId: string): Promise<CardPrice | null> {
    try {
      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const price = this.mockPrices.find(p => p.cardId === cardId)
      return price || null
    } catch (error) {
      console.error('Erro ao buscar preço da carta:', error)
      throw new Error('Falha ao buscar preço')
    }
  }

  /**
   * Busca histórico de preços de uma carta
   */
  async getPriceHistory(cardId: string, days: number = 30): Promise<PriceHistory[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const cardPrice = this.mockPrices.find(p => p.cardId === cardId)
      if (!cardPrice) return []
      
      // Retorna histórico dos últimos X dias
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      
      return cardPrice.history.filter(entry => 
        new Date(entry.date) >= cutoffDate
      )
    } catch (error) {
      console.error('Erro ao buscar histórico de preços:', error)
      throw new Error('Falha ao buscar histórico')
    }
  }

  /**
   * Busca preços de múltiplas cartas
   */
  async getMultipleCardPrices(cardIds: string[]): Promise<CardPrice[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return this.mockPrices.filter(price => 
        cardIds.includes(price.cardId)
      )
    } catch (error) {
      console.error('Erro ao buscar preços múltiplos:', error)
      throw new Error('Falha ao buscar preços')
    }
  }

  /**
   * Busca cartas com maior valorização
   */
  async getTopGainers(limit: number = 10): Promise<CardPrice[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      
      return this.mockPrices
        .filter(price => price.priceChange > 0)
        .sort((a, b) => b.priceChangePercent - a.priceChangePercent)
        .slice(0, limit)
    } catch (error) {
      console.error('Erro ao buscar top gainers:', error)
      throw new Error('Falha ao buscar top gainers')
    }
  }

  /**
   * Busca cartas com maior desvalorização
   */
  async getTopLosers(limit: number = 10): Promise<CardPrice[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 400))
      
      return this.mockPrices
        .filter(price => price.priceChange < 0)
        .sort((a, b) => a.priceChangePercent - b.priceChangePercent)
        .slice(0, limit)
    } catch (error) {
      console.error('Erro ao buscar top losers:', error)
      throw new Error('Falha ao buscar top losers')
    }
  }
}
