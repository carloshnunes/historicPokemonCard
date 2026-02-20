import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTCGdexCardsBySet } from '@/hooks/useTCGdexCards'
import PriceDisplay from '@/components/PriceDisplay'

// Configurações do Slider
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
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
          <h2 className="text-lg font-semibold text-gray-900">{setName}</h2>
          <p className="text-sm text-gray-500">Carregando cartas...</p>
        </div>
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-1">
              <div className={`pokemon-card p-2 animate-pulse border-l-2 ${borderColor}`}>
                <div className="aspect-[3/4] rounded-md mb-2 bg-gray-200"></div>
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
          <h2 className="text-lg font-semibold text-gray-900">{setName}</h2>
          <p className="text-sm text-red-600">
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
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{setName}</h2>
        <span className="text-sm text-gray-500">{cards.length} cartas</span>
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
                <div className={`pokemon-card p-2 border-l-2 ${borderColor} flex flex-col`}>
                  <div className="aspect-[3/4] mb-2 overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
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
                  
                  <div className="space-y-0.5 flex-grow flex flex-col">
                    <h3 className="font-medium text-gray-900 truncate text-xs">
                      {card.name}
                    </h3>
                    
                    <div className="text-[11px] text-gray-500">
                      <p className="truncate">ID: {card.localId}</p>
                      {card.rarity && (
                        <p className="font-medium text-gray-600 truncate">{card.rarity}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      {card.hp && (
                        <span className="text-red-500">❤️ {card.hp}</span>
                      )}
                      {card.types && card.types.length > 0 && (
                        <span className="rounded bg-gray-100 px-1 py-0.5 text-gray-600 truncate">
                          {card.types[0]}
                        </span>
                      )}
                    </div>

                    <div className="flex-grow"></div>

                    {/* Preços */}
                    <div className="mt-auto pt-1.5 border-t border-gray-200">
                      {tcgPrice ? (
                        <PriceDisplay value={tcgPrice} currency="USD" showOriginal={false} size="sm" />
                      ) : cardmarketPrice ? (
                        <PriceDisplay value={cardmarketPrice} currency="EUR" showOriginal={false} size="sm" />
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

