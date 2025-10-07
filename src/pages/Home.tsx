import { Link } from 'react-router-dom'
import { TrendingUp, Search, BarChart3 } from 'lucide-react'
import CardCarousel from '@/components/CardCarousel'
import ApiTest from '@/components/ApiTest'
import ApiDebug from '@/components/ApiDebug'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Histórico de Preços
        </h1>
        <h2 className="mt-3 text-xl text-gray-500 sm:text-2xl">
          Cartas Pokémon em Português
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg">
          Acompanhe a evolução dos preços das cartas Pokémon, encontre as melhores oportunidades 
          de compra e venda, e mantenha-se atualizado com o mercado brasileiro.
        </p>
        <div className="mt-8">
          <Link 
            to="/search" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Buscar Cartas</span>
          </Link>
        </div>
      </div>

      {/* Debug das APIs */}
      <ApiDebug />
      
      {/* API Test - Temporário */}
      <ApiTest />

      {/* Cartas Populares */}
      <CardCarousel 
        type="popular"
        title="🔥 Cartas Mais Populares"
        subtitle="As cartas mais buscadas e valorizadas pelos colecionadores"
      />

      {/* Features */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="pokemon-card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-pokemon-blue" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Histórico Completo
              </h3>
              <p className="text-gray-500">
                Veja a evolução dos preços ao longo do tempo
              </p>
            </div>
          </div>
        </div>

        <div className="pokemon-card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Search className="h-8 w-8 text-pokemon-green" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Busca Avançada
              </h3>
              <p className="text-gray-500">
                Encontre cartas por nome, set, tipo ou raridade
              </p>
            </div>
          </div>
        </div>

        <div className="pokemon-card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-pokemon-purple" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Análise de Mercado
              </h3>
              <p className="text-gray-500">
                Gráficos e tendências para tomada de decisão
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cartas Recentes */}
      <CardCarousel 
        type="recent"
        title="🆕 Lançamentos Recentes"
        subtitle="As cartas mais novas do mercado Pokémon"
      />

      {/* CTA Section */}
      <div className="bg-pokemon-blue text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Comece a acompanhar suas cartas favoritas
        </h2>
        <p className="mb-6 text-blue-100">
          Cadastre-se para receber alertas de preços e não perder nenhuma oportunidade
        </p>
        <Link 
          to="/search" 
          className="bg-white text-pokemon-blue hover:bg-gray-100 font-bold py-2 px-6 rounded transition-colors duration-200"
        >
          Começar Agora
        </Link>
      </div>
    </div>
  )
}
