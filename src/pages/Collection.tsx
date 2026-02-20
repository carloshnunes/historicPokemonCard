import { Link } from 'react-router-dom'
import { Heart, Loader2, Trash2 } from 'lucide-react'
import { useCollection } from '@/contexts/CollectionContext'
import { useTCGdexCardsByIds } from '@/hooks/useTCGdexCards'
import PriceDisplay from '@/components/PriceDisplay'

export default function Collection() {
  const { collection, removeCard } = useCollection()
  const cardIds = collection.map(c => c.id)
  const { cards, isLoading, error } = useTCGdexCardsByIds(cardIds)

  if (collection.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Minha Coleção
          </h1>
          <p className="mt-2 text-gray-600">
            Salve suas cartas para acompanhar os preços em reais
          </p>
        </div>

        <div className="pokemon-card p-12 text-center">
          <Heart className="mx-auto h-16 w-16 text-gray-300" />
          <h2 className="mt-4 text-xl font-semibold text-gray-700">Sua coleção está vazia</h2>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Ao visualizar uma carta, clique em &quot;Adicionar à Coleção&quot; para salvá-la aqui e acompanhar os preços em tempo real.
          </p>
          <Link to="/search" className="btn-primary inline-flex items-center gap-2 mt-6">
            Buscar Cartas
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Heart className="h-8 w-8 text-red-500" />
          Minha Coleção
        </h1>
        <p className="mt-2 text-gray-600">
          {collection.length} {collection.length === 1 ? 'carta salva' : 'cartas salvas'} — preços convertidos para reais
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-pokemon-blue" />
        </div>
      ) : error ? (
        <div className="pokemon-card p-6 text-center text-red-600">
          Erro ao carregar cartas: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card: any) => {
            const imageUrl = card.image ? `${card.image}/high.webp` : 'https://via.placeholder.com/300x400?text=Pokemon'
            const tcgPrice = card.pricing?.tcgplayer?.holofoil?.marketPrice || card.pricing?.tcgplayer?.normal?.marketPrice
            const cardmarketPrice = card.pricing?.cardmarket?.avg
            const price = tcgPrice || cardmarketPrice || 0
            const currency = tcgPrice ? 'USD' : 'EUR'

            return (
              <div key={card.id} className="pokemon-card p-4 h-full flex flex-col group">
                <Link to={`/card/${card.id}`} className="flex-grow">
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
                  <h3 className="font-semibold text-gray-900 truncate">{card.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{card.set?.name || 'N/A'}</p>
                  <div className="mt-2">
                    {price > 0 ? (
                      <PriceDisplay value={price} currency={currency} showOriginal={false} size="sm" />
                    ) : (
                      <span className="text-gray-400 text-sm">Preço indisponível</span>
                    )}
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    removeCard(card.id)
                  }}
                  className="mt-3 flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 py-2 rounded-lg transition-colors text-sm"
                  title="Remover da coleção"
                >
                  <Trash2 className="h-4 w-4" />
                  Remover
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
