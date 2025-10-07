import { useParams } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function CardDetail() {
  const { id } = useParams()

  // Mock data - será substituído por dados reais da API
  const mockCard = {
    name: 'Charizard',
    image: '/api/placeholder/300/400',
    set: 'Base Set',
    rarity: 'Rara Holofoil',
    type: 'Fire',
    hp: '120',
    priceHistory: [
      { date: '2024-01-01', price: 150.00 },
      { date: '2024-01-15', price: 165.00 },
      { date: '2024-02-01', price: 180.00 },
      { date: '2024-02-15', price: 175.00 },
      { date: '2024-03-01', price: 190.00 },
    ]
  }

  const currentPrice = mockCard.priceHistory[mockCard.priceHistory.length - 1].price
  const previousPrice = mockCard.priceHistory[mockCard.priceHistory.length - 2].price
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = ((priceChange / previousPrice) * 100).toFixed(1)

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
          <div className="aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-48 h-64 bg-gray-300 rounded-lg mx-auto mb-4"></div>
              <p className="text-gray-500">Imagem da carta: {mockCard.name}</p>
            </div>
          </div>
        </div>

        {/* Card Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{mockCard.name}</h1>
            <div className="mt-2 space-y-1">
              <p className="text-gray-600"><span className="font-medium">Set:</span> {mockCard.set}</p>
              <p className="text-gray-600"><span className="font-medium">Raridade:</span> {mockCard.rarity}</p>
              <p className="text-gray-600"><span className="font-medium">Tipo:</span> {mockCard.type}</p>
              <p className="text-gray-600"><span className="font-medium">HP:</span> {mockCard.hp}</p>
            </div>
          </div>

          {/* Current Price */}
          <div className="pokemon-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preço Atual</h2>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                R$ {currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center space-x-1 ${
                priceChange > 0 ? 'price-trend-up' : 
                priceChange < 0 ? 'price-trend-down' : 'price-trend-stable'
              }`}>
                {priceChange > 0 ? <TrendingUp className="h-4 w-4" /> :
                 priceChange < 0 ? <TrendingDown className="h-4 w-4" /> :
                 <Minus className="h-4 w-4" />}
                <span>
                  {priceChange > 0 ? '+' : ''}R$ {priceChange.toFixed(2)} ({priceChangePercent}%)
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
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

      {/* Price History Chart */}
      <div className="pokemon-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Preços</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Gráfico de histórico será implementado aqui</p>
        </div>
      </div>

      {/* Price History Table */}
      <div className="pokemon-card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Histórico Detalhado</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variação
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCard.priceHistory.map((entry, index) => {
                const change = index > 0 ? entry.price - mockCard.priceHistory[index - 1].price : 0
                const changePercent = index > 0 ? ((change / mockCard.priceHistory[index - 1].price) * 100).toFixed(1) : 0
                
                return (
                  <tr key={entry.date}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {entry.price.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                      change > 0 ? 'price-trend-up' : 
                      change < 0 ? 'price-trend-down' : 'price-trend-stable'
                    }`}>
                      {index > 0 && (
                        <>
                          {change > 0 ? '+' : ''}R$ {change.toFixed(2)} ({changePercent}%)
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
