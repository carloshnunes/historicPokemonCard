import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTCGdexCardsBySet } from '@/hooks/useTCGdexCards'

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

interface SetCarouselProps {
  setId: string
  setName: string
  limit?: number
  borderColor?: string
}

export default function SetCarousel({ setId, setName, limit = 12, borderColor = 'border-blue-400' }: SetCarouselProps) {
  const { cards, isLoading, error } = useTCGdexCardsBySet(setId, limit)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📦 {setName}</h2>
          <p className="text-gray-600">Carregando cartas...</p>
        </div>
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1">
              <div className={`pokemon-card p-3 animate-pulse border-l-4 ${borderColor}`}>
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

  if (error || cards.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📦 {setName}</h2>
          <p className="text-gray-600 text-sm text-red-600">
            ❌ Erro ao carregar cartas deste set
          </p>
        </div>
      </div>
    )
  }

  const settings = {
    ...sliderSettings,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">📦 {setName}</h2>
        <p className="text-gray-600">{cards.length} cartas disponíveis</p>
      </div>
      
      <div className="relative">
        <Slider {...settings}>
          {cards.map((card: any) => {
            const imageUrl = card.image ? `${card.image}/high.webp` : 'https://via.placeholder.com/300x400?text=Pokemon'
            const tcgPrice = card.pricing?.tcgplayer?.holofoil?.marketPrice || card.pricing?.tcgplayer?.normal?.marketPrice
            const cardmarketPrice = card.pricing?.cardmarket?.avg

            return (
              <Link 
                key={card.id}
                to={`/card/${card.id}`}
                className="block p-1 group"
              >
                <div className={`pokemon-card p-3 border-l-4 ${borderColor} h-full flex flex-col`}>
                  <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-2 overflow-hidden flex-shrink-0">
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
                  
                  <div className="space-y-1 flex-grow flex flex-col">
                    <h3 className="font-semibold text-gray-900 truncate text-sm">
                      {card.name}
                    </h3>
                    
                    <div className="text-xs text-gray-600">
                      <p className="truncate">ID: {card.localId}</p>
                      {card.rarity && (
                        <p className="font-medium text-purple-600 truncate">{card.rarity}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      {card.hp && (
                        <span className="text-red-500">❤️ {card.hp}</span>
                      )}
                      {card.types && card.types.length > 0 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs truncate">
                          {card.types[0]}
                        </span>
                      )}
                    </div>

                    <div className="flex-grow"></div>

                    {/* Preços */}
                    <div className="mt-auto pt-2 border-t border-gray-200">
                      {tcgPrice ? (
                        <p className="text-sm font-semibold text-green-600">
                          💵 ${tcgPrice.toFixed(2)} USD
                        </p>
                      ) : cardmarketPrice ? (
                        <p className="text-sm font-semibold text-blue-600">
                          💶 €{cardmarketPrice.toFixed(2)} EUR
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400">
                          Preço indisponível
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

