import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react'
import { usePopularPokemonCards, useRecentPokemonCards } from '@/hooks/usePokemonCards'
import { useBestPokemonCardsSource } from '@/hooks/usePokemonCardsAlternative'
import { useMultipleCardPrices } from '@/hooks/usePrices'
import { PokemonCard } from '@/types/pokemon'

interface CardCarouselProps {
  type: 'popular' | 'recent'
  title: string
  subtitle?: string
}

// Configurações do Slider
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 4000,
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

// Componente de seta personalizada
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

function CardItem({ card, price }: { card: PokemonCard; price?: any }) {
  return (
    <Link 
      to={`/card/${card.id}`}
      className="block p-2 group"
    >
      <div className="pokemon-card p-4 h-full">
        <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 overflow-hidden">
          <img
            src={card.imageUrl || card.imageUrlHiRes}
            alt={card.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={(e) => {
              // Fallback para imagem quebrada
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
            <p>{card.set}</p>
            <p>{card.rarity}</p>
          </div>

          {price && (
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg text-gray-900">
                R$ {price.currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center space-x-1 text-sm ${
                price.priceChange > 0 ? 'price-trend-up' : 
                price.priceChange < 0 ? 'price-trend-down' : 'price-trend-stable'
              }`}>
                {price.priceChange > 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : price.priceChange < 0 ? (
                  <TrendingDown className="h-4 w-4" />
                ) : null}
                <span>
                  {price.priceChange > 0 ? '+' : ''}
                  {price.priceChangePercent.toFixed(1)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default function CardCarousel({ type, title, subtitle }: CardCarouselProps) {
  // Tenta usar a fonte de dados que funcionar melhor
  const { data: cards, isLoading: cardsLoading, error: cardsError, source } = useBestPokemonCardsSource()
  
  const cardIds = cards?.map(card => card.id) || []
  const { data: prices } = useMultipleCardPrices(cardIds)

  console.log(`🎯 Carrossel usando fonte: ${source}`, { cards: cards?.length || 0 })

  if (cardsLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1">
              <div className="pokemon-card p-4 animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (cardsError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar cartas. Tente novamente mais tarde.</p>
      </div>
    )
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma carta encontrada.</p>
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
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      
      <div className="relative">
        <Slider {...settings}>
          {cards.map((card) => {
            const cardPrice = prices?.find(p => p.cardId === card.id)
            return (
              <CardItem 
                key={card.id} 
                card={card} 
                price={cardPrice}
              />
            )
          })}
        </Slider>
      </div>
    </div>
  )
}
