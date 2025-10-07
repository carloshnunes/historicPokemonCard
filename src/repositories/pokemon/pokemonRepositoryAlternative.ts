import axios from 'axios'
import { PokemonCard } from '@/types/pokemon'

// Repositório alternativo para testar diferentes APIs
export class PokemonRepositoryAlternative {
  /**
   * Testa a URL específica que você mencionou
   */
  async testTCGPokemonCards(): Promise<any> {
    try {
      const response = await axios.get('https://tcg.pokemon.com/assets/img/sv-expansions/destined-rivals/cards/cards.json')
      return response.data
    } catch (error) {
      console.error('Erro ao acessar tcg.pokemon.com:', error)
      throw new Error('Falha ao acessar dados do tcg.pokemon.com')
    }
  }

  /**
   * Testa TCGdx API (multilíngue)
   */
  async testTCGdxCards(): Promise<any> {
    try {
      const response = await axios.get('https://api.tcgdx.net/v2/cards?pageSize=10')
      return response.data
    } catch (error) {
      console.error('Erro ao acessar TCGdx:', error)
      throw new Error('Falha ao acessar TCGdx')
    }
  }

  /**
   * Converte dados da API alternativa para formato padrão
   */
  convertToStandardFormat(data: any): PokemonCard[] {
    if (!data || !Array.isArray(data)) return []

    return data.map((item: any) => ({
      id: item.id || item.cardId || Math.random().toString(),
      name: item.name || 'Carta Desconhecida',
      imageUrl: item.image || item.imageUrl || item.smallImage || '',
      imageUrlHiRes: item.imageHiRes || item.imageUrlHiRes || item.largeImage || '',
      set: item.set?.name || item.setName || 'Set Desconhecido',
      number: item.number || item.cardNumber || '',
      rarity: item.rarity || 'Desconhecida',
      types: item.types || [],
      hp: item.hp || '',
      attacks: item.attacks || [],
      weaknesses: item.weaknesses || [],
      resistances: item.resistances || [],
      retreatCost: item.retreatCost || [],
      convertedRetreatCost: item.convertedRetreatCost || 0,
    }))
  }

  /**
   * Busca cartas de qualquer fonte disponível
   */
  async getCardsFromAnySource(): Promise<PokemonCard[]> {
    // Tenta diferentes fontes em ordem de preferência
    const sources = [
      () => this.testTCGPokemonCards(),
      () => this.testTCGdxCards(),
    ]

    for (const source of sources) {
      try {
        const data = await source()
        const cards = this.convertToStandardFormat(data)
        if (cards.length > 0) {
          console.log(`✅ Cartas carregadas de: ${source.name}`)
          return cards
        }
      } catch (error) {
        console.warn(`⚠️ Fonte ${source.name} falhou:`, error)
        continue
      }
    }

    // Se todas as fontes falharem, retorna array vazio
    console.error('❌ Todas as fontes de dados falharam')
    return []
  }
}
