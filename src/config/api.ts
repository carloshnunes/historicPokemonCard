// Configuração da API Pokémon TCG
export const POKEMON_API_CONFIG = {
  baseUrl: 'https://api.pokemontcg.io/v2',
  apiKey: import.meta.env.VITE_POKEMON_API_KEY || '', // Configure sua chave no .env
  headers: {
    'Content-Type': 'application/json',
  }
}

// Função para obter headers com API key
export const getApiHeaders = () => {
  const headers = { ...POKEMON_API_CONFIG.headers }
  
  if (POKEMON_API_CONFIG.apiKey) {
    headers['X-Api-Key'] = POKEMON_API_CONFIG.apiKey
  }
  
  return headers
}
