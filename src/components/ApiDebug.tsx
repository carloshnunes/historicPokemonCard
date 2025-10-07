import { useBestPokemonCardsSource } from '@/hooks/usePokemonCardsAlternative'
import { usePopularPokemonCards } from '@/hooks/usePokemonCards'

export default function ApiDebug() {
  const bestSource = useBestPokemonCardsSource()
  const officialSource = usePopularPokemonCards(5)

  return (
    <div className="pokemon-card p-4 bg-yellow-50 border-l-4 border-yellow-400">
      <h3 className="font-bold text-yellow-800 mb-2">🔍 Debug das APIs</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Melhor fonte disponível:</span> 
          <span className={`ml-2 px-2 py-1 rounded text-xs ${
            bestSource.source === 'official' ? 'bg-green-100 text-green-800' :
            bestSource.source === 'alternative' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {bestSource.source}
          </span>
        </div>
        
        <div>
          <span className="font-medium">Cartas encontradas:</span> 
          <span className="ml-2 font-bold">{bestSource.data?.length || 0}</span>
        </div>
        
        <div>
          <span className="font-medium">API oficial:</span> 
          <span className={`ml-2 px-2 py-1 rounded text-xs ${
            officialSource.data?.length ? 'bg-green-100 text-green-800' :
            officialSource.isLoading ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {officialSource.data?.length ? `${officialSource.data.length} cartas` :
             officialSource.isLoading ? 'Carregando...' : 'Erro'}
          </span>
        </div>

        {bestSource.data && bestSource.data.length > 0 && (
          <div>
            <span className="font-medium">Primeira carta:</span> 
            <span className="ml-2 text-gray-600">
              {bestSource.data[0].name} ({bestSource.data[0].set})
            </span>
          </div>
        )}

        {(bestSource.isError || officialSource.isError) && (
          <div className="text-red-600 text-xs">
            ⚠️ Algumas APIs podem estar indisponíveis. Verifique o console para mais detalhes.
          </div>
        )}
      </div>
    </div>
  )
}
