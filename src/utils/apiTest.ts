// Arquivo temporário para testar APIs do Pokémon
import axios from 'axios'

export async function testPokemonAPIs() {
  const results = {
    officialTCG: null as any,
    tcgPokemon: null as any,
    tcgdex: null as any,
    errors: [] as string[]
  }

  // Teste 1: API oficial Pokemon TCG
  try {
    console.log('Testando API oficial Pokemon TCG...')
    const response = await axios.get('https://api.pokemontcg.io/v2/cards?pageSize=5')
    results.officialTCG = response.data
    console.log('✅ API oficial funcionando:', response.data)
  } catch (error) {
    results.errors.push(`API oficial: ${error}`)
    console.error('❌ Erro na API oficial:', error)
  }

  // Teste 2: URL que você mencionou
  try {
    console.log('Testando tcg.pokemon.com...')
    const response = await axios.get('https://tcg.pokemon.com/assets/img/sv-expansions/destined-rivals/cards/cards.json')
    results.tcgPokemon = response.data
    console.log('✅ tcg.pokemon.com funcionando:', response.data)
  } catch (error) {
    results.errors.push(`tcg.pokemon.com: ${error}`)
    console.error('❌ Erro no tcg.pokemon.com:', error)
  }

  // Teste 3: TCGdx API
  try {
    console.log('Testando TCGdx API...')
    const response = await axios.get('https://api.tcgdx.net/v2/cards?pageSize=5')
    results.tcgdx = response.data
    console.log('✅ TCGdx funcionando:', response.data)
  } catch (error) {
    results.errors.push(`TCGdx: ${error}`)
    console.error('❌ Erro no TCGdx:', error)
  }

  return results
}
