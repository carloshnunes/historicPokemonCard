import { useState } from 'react'

// Dados de exemplo para quando a API não estiver disponível
const fallbackCards = [
  {
    id: 'fallback-1',
    name: 'Pikachu',
    images: {
      small: 'https://images.pokemontcg.io/base1/58_hires.png',
      large: 'https://images.pokemontcg.io/base1/58_hires.png'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Common',
    hp: '40',
    types: ['Lightning'],
    supertype: 'Pokémon'
  },
  {
    id: 'fallback-2',
    name: 'Charizard',
    images: {
      small: 'https://images.pokemontcg.io/base1/4_hires.png',
      large: 'https://images.pokemontcg.io/base1/4_hires.png'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Rare Holo',
    hp: '120',
    types: ['Fire'],
    supertype: 'Pokémon'
  },
  {
    id: 'fallback-3',
    name: 'Blastoise',
    images: {
      small: 'https://images.pokemontcg.io/base1/2_hires.png',
      large: 'https://images.pokemontcg.io/base1/2_hires.png'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Rare Holo',
    hp: '100',
    types: ['Water'],
    supertype: 'Pokémon'
  },
  {
    id: 'fallback-4',
    name: 'Venusaur',
    images: {
      small: 'https://images.pokemontcg.io/base1/15_hires.png',
      large: 'https://images.pokemontcg.io/base1/15_hires.png'
    },
    set: {
      name: 'Base Set',
      series: 'Base'
    },
    rarity: 'Rare Holo',
    hp: '100',
    types: ['Grass'],
    supertype: 'Pokémon'
  }
]

export default function FallbackCardsCarousel() {
  const [showFallback, setShowFallback] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🎴 Cartas de Exemplo</h2>
          <p className="text-gray-600">Dados de demonstração quando a API não está disponível</p>
        </div>
        <button
          onClick={() => setShowFallback(!showFallback)}
          className="btn-secondary text-sm"
        >
          {showFallback ? 'Ocultar' : 'Mostrar'} Cartas de Exemplo
        </button>
      </div>
      
      {showFallback && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fallbackCards.map((card) => (
            <div key={card.id} className="pokemon-card p-3 border-l-4 border-blue-400">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-2 overflow-hidden">
                <img
                  src={card.images.large}
                  alt={card.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://via.placeholder.com/300x400?text=Pokemon'
                  }}
                />
              </div>
              
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900 truncate text-sm">
                  {card.name}
                </h3>
                
                <div className="text-xs text-gray-600">
                  <p className="truncate">{card.set.name}</p>
                  <p className="font-medium text-blue-600">{card.rarity}</p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">HP: {card.hp}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {card.types[0]}
                  </span>
                </div>

                <div className="text-xs text-gray-500">
                  {card.supertype}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">ℹ️ Modo Offline</h3>
        <p className="text-sm text-yellow-700">
          Quando a API do Pokémon TCG não está disponível, este componente mostra cartas de exemplo 
          para demonstrar a funcionalidade da aplicação. Os dados reais serão carregados assim que 
          a conectividade for restaurada.
        </p>
      </div>
    </div>
  )
}
