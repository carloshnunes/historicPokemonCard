import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { useTCGdexCardById } from '@/hooks/useTCGdexCards'
import { useCollection } from '@/contexts/CollectionContext'
import PriceDisplay from '@/components/PriceDisplay'

export default function CardDetail() {
  const { id } = useParams()
  const { card, isLoading, error } = useTCGdexCardById(id || '')
  const { addCard, removeCard, isInCollection } = useCollection()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <button onClick={() => window.history.back()} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-[280px] lg:flex-shrink-0">
            <div className="pokemon-card overflow-hidden">
              <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
            </div>
          </div>
          <div className="flex-1 pokemon-card p-4">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2 mb-3" />
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <button onClick={() => window.history.back()} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>
        <div className="pokemon-card p-6 text-center">
          <h2 className="text-base font-semibold text-red-600 mb-2">Erro ao carregar carta</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">Tentar Novamente</button>
        </div>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="space-y-4">
        <button onClick={() => window.history.back()} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar</span>
        </button>
        <div className="pokemon-card p-6 text-center">
          <h2 className="text-base font-semibold text-gray-600 mb-2">Carta não encontrada</h2>
          <p className="text-gray-500 mb-4">A carta com ID "{id}" não foi encontrada.</p>
          <Link to="/" className="btn-primary">Voltar ao Início</Link>
        </div>
      </div>
    )
  }

  const tcgplayerPrice = card.pricing?.tcgplayer?.holofoil?.marketPrice || card.pricing?.tcgplayer?.normal?.marketPrice
  const cardmarketPrice = card.pricing?.cardmarket?.avg
  const currentPrice = tcgplayerPrice || cardmarketPrice || 0
  const priceCurrency = tcgplayerPrice ? 'USD' : 'EUR'
  const imageUrl = card.image ? `${card.image}/high.webp` : null

  return (
    <div className="space-y-5">
      <button onClick={() => window.history.back()} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-4 w-4" />
        <span>Voltar</span>
      </button>

      {/* Linha 1: Carta à esquerda | Card info+preço + botões à direita (mesma largura) */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start">
        {/* Esquerda: Carta */}
        <div className="lg:w-[280px] lg:flex-shrink-0">
          <div className="pokemon-card overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={card.name}
                  className="block w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=Pokemon'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">Imagem não disponível</div>
              )}
            </div>
          </div>
        </div>

        {/* Direita: Card info+preço (altura natural) + botões - mesma largura */}
        <div className="flex flex-col gap-4 lg:flex-1 lg:min-w-0">
          {/* Card - infos à esquerda, preço à direita - mais compacto e moderno */}
          <div className="pokemon-card p-5">
            <h1 className="text-lg font-bold text-gray-900 mb-4">{card.name}</h1>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                <div><span className="text-gray-400">Set</span><p className="font-medium text-gray-900">{card.set?.name || '—'}</p></div>
                <div><span className="text-gray-400">Raridade</span><p className="font-medium text-gray-900">{card.rarity || '—'}</p></div>
                <div><span className="text-gray-400">Tipo</span><p className="font-medium text-gray-900">{card.types?.join(', ') || '—'}</p></div>
                <div><span className="text-gray-400">HP</span><p className="font-medium text-gray-900">{card.hp || '—'}</p></div>
                {card.category && <div><span className="text-gray-400">Categoria</span><p className="font-medium text-gray-900">{card.category}</p></div>}
                {card.stage && <div><span className="text-gray-400">Estágio</span><p className="font-medium text-gray-900">{card.stage}</p></div>}
                <div><span className="text-gray-400">Número</span><p className="font-medium text-gray-900">{card.localId || '—'}</p></div>
                <div><span className="text-gray-400">Artista</span><p className="font-medium text-gray-900">{card.illustrator || '—'}</p></div>
                {card.dexId?.[0] && <div><span className="text-gray-400">Pokédex</span><p className="font-medium text-gray-900">#{card.dexId[0]}</p></div>}
                {card.regulationMark && <div><span className="text-gray-400">Regulação</span><p className="font-medium text-gray-900">{card.regulationMark}</p></div>}
              </div>
              <div className="sm:border-l sm:border-gray-200 sm:pl-6 flex flex-col justify-center">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preço Atual</span>
                {currentPrice > 0 ? (
                  <>
                    <PriceDisplay value={currentPrice} currency={priceCurrency} showOriginal={true} size="md" className="mt-1" />
                    <p className="mt-1 text-xs text-gray-500">{tcgplayerPrice ? 'TCGPlayer' : 'Cardmarket'}</p>
                  </>
                ) : (
                  <p className="mt-1 text-gray-500 text-sm">Não disponível</p>
                )}
              </div>
            </div>
          </div>

          {/* Botões - mesma largura do card */}
          <div className="flex flex-col sm:flex-row gap-2 w-full">
        {isInCollection(card.id) ? (
          <button
            onClick={() => removeCard(card.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 text-sm"
          >
            <Heart className="h-4 w-4 fill-current" />
            Remover da Coleção
          </button>
        ) : (
          <button
            onClick={() => addCard(card.id)}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-2 text-sm"
          >
            <Heart className="h-4 w-4" />
            Adicionar à Coleção
          </button>
        )}
        <Link to="/collection" className="btn-secondary flex-1 text-center py-2 text-sm">
          Ver Minha Coleção
        </Link>
          </div>
        </div>
      </div>

      {/* Ataques - largura total */}
      {card.attacks && card.attacks.length > 0 && (
        <div className="pokemon-card p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Ataques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {card.attacks.map((attack: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3">
                <h3 className="font-semibold text-sm">{attack.name}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  Custo: {attack.cost?.join(' ') || 'N/A'} · Dano: {attack.damage || 'N/A'}
                </p>
                {attack.effect && <p className="text-xs text-gray-500 mt-1">{attack.effect}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Linha 4: Fraquezas e Resistências - largura total */}
      {(card.weaknesses?.length || card.resistances?.length) ? (
        <div className="pokemon-card p-4">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Fraquezas e Resistências</h2>
          <div className="flex gap-8 text-sm">
            {card.weaknesses?.length > 0 && (
              <div>
                <h3 className="font-medium text-red-600 mb-1">Fraquezas</h3>
                {card.weaknesses.map((w: any, i: number) => (
                  <p key={i}>{w.type}: {w.value}</p>
                ))}
              </div>
            )}
            {card.resistances?.length > 0 && (
              <div>
                <h3 className="font-medium text-green-600 mb-1">Resistências</h3>
                {card.resistances.map((r: any, i: number) => (
                  <p key={i}>{r.type}: {r.value}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
