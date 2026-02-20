import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
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
        <div className="pokemon-card p-2 flex flex-col">
          <div className="aspect-[3/4] overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
            <img
              src={imageUrl}
              alt={card.name}
              className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'https://via.placeholder.com/300x400?text=Pokemon'
              }}
            />
          </div>
          
          <div className="space-y-1 pt-1.5">
            <h3 className="font-medium text-gray-900 truncate text-sm">
              {card.name}
            </h3>
            
            <div className="text-xs text-gray-500">
              <p className="truncate">ID: {card.localId || card.id}</p>
              {card.rarity && (
                <p className="font-medium text-gray-600">{card.rarity}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              {card.hp && (
                <span className="text-red-500">❤️ {card.hp}</span>
              )}
              {card.types && card.types.length > 0 && (
                <span className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600">
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
        <h1 className="text-2xl font-bold text-gray-900">Buscar Cartas</h1>
        <p className="mt-1 text-gray-600 text-sm">
          Encontre cartas Pokémon e acompanhe seus preços
        </p>
      </div>

      {/* Search Bar */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Digite o nome da carta (ex: Pikachu, Charizard)..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Status da busca */}
        {isLoading && (
          <div className="mt-4 flex items-center gap-2 text-gray-600">
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
          <div className="mt-4 text-gray-600 text-sm">
            {cards.length} cartas encontradas
            {loadTime > 0 && <span className="text-gray-400 ml-2">({loadTime}ms)</span>}
          </div>
        )}
      </div>

      {/* Results */}
      {cards.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 items-start">
          {cards.map((card: any) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
      ) : searchTerm.length >= 2 ? (
        <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">
          <Search className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma carta encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Tente outro nome ou verifique a ortografia
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">
          <Search className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Comece sua busca</h3>
          <p className="mt-1 text-sm text-gray-500">
            Digite o nome de uma carta para começar
          </p>
          <p className="mt-3 text-xs text-gray-400">
            Ex: Pikachu, Charizard, Blastoise, Mewtwo
          </p>
        </div>
      )}
    </div>
  )
}
