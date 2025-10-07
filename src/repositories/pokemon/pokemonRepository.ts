import axios from 'axios'
import { PokemonCard, PokemonSet, SearchParams, ApiResponse } from '@/types/pokemon'

// Configuração da API Pokemon TCG (gratuita, sem necessidade de chave)
const API_BASE_URL = 'https://api.pokemontcg.io/v2'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export class PokemonRepository {
  /**
   * Busca cartas Pokémon com filtros
   */
  async searchCards(params: SearchParams): Promise<ApiResponse<PokemonCard>> {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.name) queryParams.append('q', `name:"${params.name}"`)
      if (params.set) queryParams.append('q', `set.name:"${params.set}"`)
      if (params.type) queryParams.append('q', `types:"${params.type}"`)
      if (params.rarity) queryParams.append('q', `rarity:"${params.rarity}"`)
      if (params.page) queryParams.append('page', params.page.toString())
      if (params.pageSize) queryParams.append('pageSize', params.pageSize.toString())
      
      const response = await api.get(`/cards?${queryParams.toString()}`)
      
      return {
        data: response.data.data,
        page: response.data.page || 1,
        pageSize: response.data.pageSize || 20,
        count: response.data.data.length,
        totalCount: response.data.totalCount || 0,
      }
    } catch (error) {
      console.error('Erro ao buscar cartas:', error)
      throw new Error('Falha ao buscar cartas Pokémon')
    }
  }

  /**
   * Busca carta por ID
   */
  async getCardById(id: string): Promise<PokemonCard> {
    try {
      const response = await api.get(`/cards/${id}`)
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar carta por ID:', error)
      throw new Error('Falha ao buscar carta')
    }
  }

  /**
   * Busca cartas populares (mais buscadas)
   */
  async getPopularCards(limit: number = 12): Promise<PokemonCard[]> {
    try {
      // Busca cartas raras e holofoil que são geralmente mais populares
      const response = await api.get(`/cards?q=rarity:"Rare Holo" OR rarity:"Rare Ultra" OR rarity:"Rare"&pageSize=${limit}`)
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar cartas populares:', error)
      throw new Error('Falha ao buscar cartas populares')
    }
  }

  /**
   * Busca cartas por set
   */
  async getCardsBySet(setId: string, limit: number = 20): Promise<PokemonCard[]> {
    try {
      const response = await api.get(`/cards?q=set.id:"${setId}"&pageSize=${limit}`)
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar cartas por set:', error)
      throw new Error('Falha ao buscar cartas do set')
    }
  }

  /**
   * Busca todos os sets disponíveis
   */
  async getSets(): Promise<PokemonSet[]> {
    try {
      const response = await api.get('/sets')
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar sets:', error)
      throw new Error('Falha ao buscar sets')
    }
  }

  /**
   * Busca sets por série
   */
  async getSetsBySeries(series: string): Promise<PokemonSet[]> {
    try {
      const response = await api.get(`/sets?q=series:"${series}"`)
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar sets por série:', error)
      throw new Error('Falha ao buscar sets da série')
    }
  }

  /**
   * Busca cartas recém lançadas
   */
  async getRecentCards(limit: number = 12): Promise<PokemonCard[]> {
    try {
      // Busca cartas dos sets mais recentes
      const response = await api.get(`/cards?orderBy=-set.releaseDate&pageSize=${limit}`)
      return response.data.data
    } catch (error) {
      console.error('Erro ao buscar cartas recentes:', error)
      throw new Error('Falha ao buscar cartas recentes')
    }
  }
}
