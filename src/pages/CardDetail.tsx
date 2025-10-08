import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, ExternalLink } from 'lucide-react'
import { useTCGdexCardById } from '@/hooks/useTCGdexCards'

export default function CardDetail() {
  const { id } = useParams()
  const { card, isLoading, error, loadTime } = useTCGdexCardById(id || '')

  if (isLoading) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="pokemon-card p-6">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="pokemon-card p-6">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>
        
        <div className="pokemon-card p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erro ao carregar carta</h2>
          <p className="text-gray-600 mb-4">{error}</p>
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

  if (!card) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>
        
        <div className="pokemon-card p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Carta não encontrada</h2>
          <p className="text-gray-500 mb-4">A carta com ID "{id}" não foi encontrada.</p>
          <Link to="/" className="btn-primary">
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  // Dados de preço do TCGdex
  const tcgplayerPrice = card.pricing?.tcgplayer?.holofoil?.marketPrice || card.pricing?.tcgplayer?.normal?.marketPrice
  const cardmarketPrice = card.pricing?.cardmarket?.avg
  
  const currentPrice = tcgplayerPrice || cardmarketPrice || 0
  const priceCurrency = tcgplayerPrice ? 'USD' : 'EUR'

  const priceChange = 0 // Mock - seria calculado com histórico real
  const priceChangePercent = 0 // Mock
  
  // URL da imagem do TCGdex
  const imageUrl = card.image ? `${card.image}/high.webp` : null

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Voltar</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card Image */}
        <div className="pokemon-card p-6">
          <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={card.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/300x400?text=Pokemon'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Imagem não disponível
              </div>
            )}
          </div>
        </div>

        {/* Card Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{card.name}</h1>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600">
                <span className="font-medium">Set:</span> {card.set?.name || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Raridade:</span> {card.rarity || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Tipo:</span> {card.types?.join(', ') || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">HP:</span> {card.hp || 'N/A'}
              </p>
              {card.category && (
                <p className="text-gray-600">
                  <span className="font-medium">Categoria:</span> {card.category}
                </p>
              )}
              {card.stage && (
                <p className="text-gray-600">
                  <span className="font-medium">Estágio:</span> {card.stage}
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">Número:</span> {card.localId || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Artista:</span> {card.illustrator || 'N/A'}
              </p>
              {card.dexId && card.dexId.length > 0 && (
                <p className="text-gray-600">
                  <span className="font-medium">Pokédex:</span> #{card.dexId[0]}
                </p>
              )}
              {card.regulationMark && (
                <p className="text-gray-600">
                  <span className="font-medium">Marca de Regulação:</span> {card.regulationMark}
                </p>
              )}
            </div>
          </div>

          {/* Current Price */}
          <div className="pokemon-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preço Atual</h2>
            {currentPrice > 0 ? (
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-gray-900">
                  {priceCurrency === 'USD' ? '$' : '€'}{currentPrice.toFixed(2)}
                </span>
                <div className={`flex items-center space-x-1 ${
                  priceChange > 0 ? 'price-trend-up' : 
                  priceChange < 0 ? 'price-trend-down' : 'price-trend-stable'
                }`}>
                  {priceChange > 0 ? <TrendingUp className="h-4 w-4" /> :
                   priceChange < 0 ? <TrendingDown className="h-4 w-4" /> :
                   <Minus className="h-4 w-4" />}
                  <span>
                    {priceChange > 0 ? '+' : ''}{priceCurrency === 'USD' ? '$' : '€'}{priceChange.toFixed(2)} ({priceChangePercent}%)
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Preço não disponível</p>
            )}
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Fonte:</span> {tcgplayerPrice ? 'TCGPlayer' : cardmarketPrice ? 'Cardmarket' : 'N/A'}
              </p>
              {card.pricing?.tcgplayer?.updated && (
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Última atualização:</span> {new Date(card.pricing.tcgplayer.updated).toLocaleDateString('pt-BR')}
                </p>
              )}
              {card.pricing?.cardmarket?.updated && !tcgplayerPrice && (
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Última atualização:</span> {new Date(card.pricing.cardmarket.updated).toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
            
            {/* Preços adicionais do TCGdex */}
            {card.pricing && (
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {card.pricing.tcgplayer?.holofoil?.lowPrice && (
                  <p className="text-gray-600">
                    <span className="font-medium">Menor preço:</span> ${card.pricing.tcgplayer.holofoil.lowPrice}
                  </p>
                )}
                {card.pricing.tcgplayer?.holofoil?.highPrice && (
                  <p className="text-gray-600">
                    <span className="font-medium">Maior preço:</span> ${card.pricing.tcgplayer.holofoil.highPrice}
                  </p>
                )}
                {card.pricing.cardmarket?.low && (
                  <p className="text-gray-600">
                    <span className="font-medium">Menor preço:</span> €{card.pricing.cardmarket.low}
                  </p>
                )}
                {card.pricing.cardmarket?.trend && (
                  <p className="text-gray-600">
                    <span className="font-medium">Tendência:</span> €{card.pricing.cardmarket.trend}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button className="btn-primary flex-1">
              Adicionar aos Favoritos
            </button>
            <button className="btn-secondary flex-1">
              Configurar Alerta
            </button>
          </div>
        </div>
      </div>

      {/* Attacks */}
      {card.attacks && card.attacks.length > 0 && (
        <div className="pokemon-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Ataques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {card.attacks.map((attack: any, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg">{attack.name}</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="font-medium">Custo:</span> {attack.cost?.join(' ') || 'N/A'}</p>
                  <p><span className="font-medium">Dano:</span> {attack.damage || 'N/A'}</p>
                  {attack.effect && (
                    <p className="text-gray-600"><span className="font-medium">Efeito:</span> {attack.effect}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weaknesses and Resistances */}
      {(card.weaknesses || card.resistances) && (
        <div className="pokemon-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Fraquezas e Resistências</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {card.weaknesses && card.weaknesses.length > 0 && (
              <div>
                <h3 className="font-semibold text-red-600 mb-2">Fraquezas</h3>
                {card.weaknesses.map((weakness: any, index: number) => (
                  <p key={index} className="text-sm">
                    {weakness.type}: {weakness.value}
                  </p>
                ))}
              </div>
            )}
            {card.resistances && card.resistances.length > 0 && (
              <div>
                <h3 className="font-semibold text-green-600 mb-2">Resistências</h3>
                {card.resistances.map((resistance: any, index: number) => (
                  <p key={index} className="text-sm">
                    {resistance.type}: {resistance.value}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
