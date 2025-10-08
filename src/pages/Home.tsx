import { Link } from 'react-router-dom'
import { TrendingUp, Search, BarChart3 } from 'lucide-react'
import RareCardsCarousel from '@/components/RareCardsCarousel'

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
          Histórico de Preços
        </h1>
        <h2 className="mt-2 text-lg text-gray-500 sm:text-xl">
          Cartas Pokémon em Português
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-500 sm:text-base">
          Acompanhe a evolução dos preços das cartas Pokémon e encontre as melhores oportunidades 
          de compra e venda no mercado brasileiro.
        </p>
        <div className="mt-6">
          <Link 
            to="/search" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Buscar Cartas</span>
          </Link>
        </div>
      </div>

      {/* Cartas Ultra Raras */}
      <RareCardsCarousel />

      {/* Features */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="pokemon-card p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-pokemon-blue" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">
                Histórico Completo
              </h3>
              <p className="text-sm text-gray-500">
                Veja a evolução dos preços ao longo do tempo
              </p>
            </div>
          </div>
        </div>

        <div className="pokemon-card p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Search className="h-6 w-6 text-pokemon-green" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">
                Busca Avançada
              </h3>
              <p className="text-sm text-gray-500">
                Encontre cartas por nome, set, tipo ou raridade
              </p>
            </div>
          </div>
        </div>

        <div className="pokemon-card p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-6 w-6 text-pokemon-purple" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-900">
                Análise de Mercado
              </h3>
              <p className="text-sm text-gray-500">
                Gráficos e tendências para tomada de decisão
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pokemon-blue text-white rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold mb-3">
          Comece a acompanhar suas cartas favoritas
        </h2>
        <p className="mb-4 text-blue-100 text-sm">
          Cadastre-se para receber alertas de preços e não perder nenhuma oportunidade
        </p>
        <Link 
          to="/search" 
          className="bg-white text-pokemon-blue hover:bg-gray-100 font-bold py-2 px-4 rounded transition-colors duration-200 text-sm"
        >
          Começar Agora
        </Link>
      </div>
    </div>
  )
}
