import { useState } from 'react'
import { Search, Filter, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTCGdexSearchCards } from '@/hooks/useTCGdexCards'

export default function CardSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const { cards, isLoading, error, loadTime } = useTCGdexSearchCards(searchTerm, 20)

  const CardItem = ({ card }: { card: any }) => {
    // TCGdex image format: card.image base URL + /high.webp
    const imageUrl = card.image ? `${card.image}/high.webp` : 'https://via.placeholder.com/300x400?text=Pokemon'
    
    return (
      <Link 
        to={`/card/${card.id}`}
        className="block group"
      >
        <div className="pokemon-card p-4 h-full hover:shadow-lg transition-shadow duration-200">
          <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 overflow-hidden">
            <img
              src={imageUrl}
              alt={card.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://via.placeholder.com/300x400?text=Pokemon'
              }}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {card.name}
            </h3>
            
            <div className="text-sm text-gray-600">
              <p className="truncate">ID: {card.localId || card.id}</p>
              {card.rarity && (
                <p className="font-medium text-purple-600">{card.rarity}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              {card.hp && (
                <span className="text-red-500">❤️ {card.hp}</span>
              )}
              {card.types && card.types.length > 0 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {card.types[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Buscar Cartas</h1>
        <p className="mt-2 text-gray-600">
          Encontre cartas Pokémon e acompanhe seus preços 
        </p>
      </div>

      {/* Search Bar */}
      <div className="pokemon-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Digite o nome da carta (ex: Pikachu, Charizard)..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pokemon-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Status da busca */}
        {isLoading && (
          <div className="mt-4 flex items-center space-x-2 text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Buscando cartas...</span>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            Erro ao buscar cartas: {error}
          </div>
        )}

        {cards.length > 0 && (
          <div className="mt-4 text-green-600">
            {cards.length} cartas encontradas
            {loadTime > 0 && <span className="text-gray-500 ml-2">({loadTime}ms)</span>}
          </div>
        )}
      </div>

      {/* Results */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card: any) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      ) : searchTerm.length >= 2 ? (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma carta encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tente buscar por outro nome ou verifique a ortografia
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Comece sua busca</h3>
          <p className="mt-1 text-sm text-gray-500">
            Digite o nome de uma carta para começar a busca
          </p>
          <div className="mt-4 text-sm text-gray-400">
            <p>Exemplos: Pikachu, Charizard, Blastoise, Mewtwo</p>
          </div>
        </div>
      )}
    </div>
  )
}
