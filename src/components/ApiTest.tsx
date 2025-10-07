import { useState, useEffect } from 'react'
import { testPokemonAPIs } from '@/utils/apiTest'

export default function ApiTest() {
  const [testResults, setTestResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTests = async () => {
    setIsLoading(true)
    try {
      const results = await testPokemonAPIs()
      setTestResults(results)
    } catch (error) {
      console.error('Erro nos testes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    runTests()
  }, [])

  if (isLoading) {
    return (
      <div className="pokemon-card p-6">
        <h2 className="text-xl font-bold mb-4">🧪 Testando APIs...</h2>
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="pokemon-card p-6">
      <h2 className="text-xl font-bold mb-4">🧪 Teste de APIs do Pokémon</h2>
      
      <button 
        onClick={runTests}
        className="btn-primary mb-4"
        disabled={isLoading}
      >
        {isLoading ? 'Testando...' : 'Executar Testes'}
      </button>

      {testResults && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-green-600">✅ APIs Funcionando:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {testResults.officialTCG && (
                <li>API oficial Pokemon TCG - {testResults.officialTCG.data?.length || 0} cartas encontradas</li>
              )}
              {testResults.tcgPokemon && (
                <li>tcg.pokemon.com - Dados encontrados</li>
              )}
              {testResults.tcgdx && (
                <li>TCGdx API - {testResults.tcgdx.data?.length || 0} cartas encontradas</li>
              )}
            </ul>
          </div>

          {testResults.errors.length > 0 && (
            <div>
              <h3 className="font-semibold text-red-600">❌ Erros:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                {testResults.errors.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {testResults.officialTCG?.data && (
            <div>
              <h3 className="font-semibold">📋 Exemplo de Cartas da API Oficial:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {testResults.officialTCG.data.slice(0, 4).map((card: any) => (
                  <div key={card.id} className="border rounded p-2 text-xs">
                    <div className="font-medium">{card.name}</div>
                    <div className="text-gray-600">{card.set?.name}</div>
                    <div className="text-gray-500">{card.rarity}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
