// Configuração da API Pokémon TCG
export const POKEMON_API_CONFIG = {
  baseUrl: 'https://api.pokemontcg.io/v2',
  apiKey: 'c2a8a24b-0d4f-4afd-b985-4a91788092bc', // Sua chave oficial
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

// Função para testar conectividade da API
export const testApiConnectivity = async () => {
  try {
    const response = await fetch('/api/pokemon/sets?pageSize=1', {
      method: 'GET',
      headers: getApiHeaders()
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('✅ API Pokemon TCG funcionando:', data)
      return true
    } else {
      console.log('❌ API Pokemon TCG erro:', response.status)
      return false
    }
  } catch (error) {
    console.log('❌ API Pokemon TCG erro de conectividade:', error)
    return false
  }
}
