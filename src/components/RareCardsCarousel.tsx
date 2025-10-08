import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTCGdxCards, formatPrice } from '@/hooks/useTCGdxCards'

// Configurações do Slider
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 transition-colors duration-200"
      aria-label="Próximo slide"
    >
      <ChevronRight className="h-5 w-5 text-gray-600" />
    </button>
  )
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-50 transition-colors duration-200"
      aria-label="Slide anterior"
    >
      <ChevronLeft className="h-5 w-5 text-gray-600" />
    </button>
  )
}

function CardItem({ card }: { card: any }) {
  return (
    <Link 
      to={`/card/${card.id}`}
      className="block p-1 group"
    >
      <div className="pokemon-card p-3 h-full border-l-4 border-purple-400">
        <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-2 overflow-hidden">
          <img
            src={card.image || card.images?.large || card.images?.small || 'https://via.placeholder.com/300x400?text=Pokemon'}
            alt={card.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
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
            <p className="truncate">{card.set?.name || 'Set desconhecido'}</p>
            <p className="font-medium text-purple-600">{card.rarity || 'Raridade desconhecida'}</p>
          </div>

          <div className="flex items-center justify-between text-xs">
            {card.hp && (
              <span className="text-gray-500">HP: {card.hp}</span>
            )}
            {card.types && card.types.length > 0 && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                {card.types[0]}
              </span>
            )}
          </div>

          {card.supertype && (
            <div className="text-xs text-gray-500">
              {card.supertype}
            </div>
          )}

          {/* Preços */}
          {card.pricing && (
            <div className="text-sm font-semibold text-green-600">
              {(() => {
                // Prioriza TCGPlayer (USD)
                if (card.pricing.tcgplayer) {
                  const price = card.pricing.tcgplayer.holo || card.pricing.tcgplayer.normal
                  if (price?.marketPrice) {
                    return `$${price.marketPrice.toFixed(2)}`
                  }
                }
                // Fallback para Cardmarket (EUR)
                if (card.pricing.cardmarket) {
                  const price = card.pricing.cardmarket['avg-holo'] || card.pricing.cardmarket.avg
                  if (price) {
                    return `€${price.toFixed(2)}`
                  }
                }
                return 'Preço N/A'
              })()}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function RareCardsCarousel() {
  const { cards, isLoading, error, loadTime } = useTCGdxCards(8)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">💎 Cartas Raras</h2>
          <p className="text-gray-600">Carregando cartas raras...</p>
        </div>
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1">
              <div className="pokemon-card p-3 animate-pulse border-l-4 border-purple-400">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-2"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const settings = {
    ...sliderSettings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  // Se não há cartas e não está carregando, mostra mensagem
  if (!isLoading && cards.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">💎 Cartas Raras</h2>
          <p className="text-gray-600">Cartas raras com preços atualizados</p>
          <p className="text-sm text-red-600 mt-1">
            ❌ Não foi possível carregar cartas da API
            {error && <span className="ml-2">({error})</span>}
          </p>
        </div>
        
        <div className="pokemon-card p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            API Indisponível
          </h3>
          <p className="text-gray-500 mb-4">
            Não foi possível conectar com a API do Pokémon TCG.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">💎 Cartas Raras</h2>
        <p className="text-gray-600">Cartas raras com preços atualizados</p>
        <p className="text-sm text-purple-600 mt-1">
          💎 {cards?.length || 0} cartas raras
          {loadTime > 0 && loadTime < 1000 && <span className="text-green-600 ml-2">({loadTime}ms)</span>}
          {loadTime > 1000 && <span className="text-orange-600 ml-2">({(loadTime/1000).toFixed(1)}s)</span>}
        </p>
      </div>
      
      <div className="relative">
        <Slider {...settings}>
          {cards.map((card: any) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Slider>
      </div>
    </div>
  )
}