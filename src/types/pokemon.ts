export interface PokemonCard {
  id: string
  name: string
  imageUrl: string
  imageUrlHiRes: string
  set: string
  number: string
  rarity: string
  types?: string[]
  hp?: string
  attacks?: Attack[]
  weaknesses?: Weakness[]
  resistances?: Resistance[]
  retreatCost?: string[]
  convertedRetreatCost?: number
}

export interface Attack {
  name: string
  cost: string[]
  convertedEnergyCost: number
  damage: string
  text: string
}

export interface Weakness {
  type: string
  value: string
}

export interface Resistance {
  type: string
  value: string
}

export interface PokemonSet {
  id: string
  name: string
  series: string
  printedTotal: number
  total: number
  releaseDate: string
  images: {
    symbol: string
    logo: string
  }
}

export interface SearchParams {
  name?: string
  set?: string
  type?: string
  rarity?: string
  page?: number
  pageSize?: number
}

export interface ApiResponse<T> {
  data: T[]
  page: number
  pageSize: number
  count: number
  totalCount: number
}

export interface PriceHistory {
  id: string
  cardId: string
  date: string
  price: number
  source: string
  condition: 'NM' | 'LP' | 'MP' | 'HP' | 'DMG'
}

export interface CardPrice {
  cardId: string
  currentPrice: number
  priceChange: number
  priceChangePercent: number
  lastUpdated: string
  history: PriceHistory[]
}
