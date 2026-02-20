import { Link } from 'react-router-dom'
import { TrendingUp, Search, BarChart3 } from 'lucide-react'
import SetCarousel from '@/components/SetCarousel'

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Histórico de Preços
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-sm text-gray-500">
          Acompanhe a evolução dos preços das cartas Pokémon e encontre as melhores oportunidades.
        </p>
        <div className="mt-6">
          <Link 
            to="/search" 
            className="btn-primary inline-flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            Buscar Cartas
          </Link>
        </div>
      </section>

      {/* Carrosséis por Set */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Destaques por Set</h2>
          <p className="text-sm text-gray-500 mt-0.5">Explore cartas dos principais sets</p>
        </div>
        <div className="space-y-12">
          <SetCarousel 
            setId="sv01" 
            setName="Scarlet & Violet" 
            limit={12}
            borderColor="border-violet-400"
          />
          <SetCarousel 
            setId="swsh9" 
            setName="Brilliant Stars" 
            limit={12}
            borderColor="border-amber-400"
          />
          <SetCarousel 
            setId="base1" 
            setName="Base Set (Clássico)" 
            limit={12}
            borderColor="border-rose-400"
          />
          <SetCarousel 
            setId="swsh1" 
            setName="Sword & Shield" 
            limit={12}
            borderColor="border-sky-400"
          />
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="pokemon-card p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">Histórico Completo</h3>
                <p className="text-sm text-gray-500">Evolução dos preços ao longo do tempo</p>
              </div>
            </div>
          </div>
          <div className="pokemon-card p-4">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">Busca Avançada</h3>
                <p className="text-sm text-gray-500">Por nome, set, tipo ou raridade</p>
              </div>
            </div>
          </div>
          <div className="pokemon-card p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900">Análise de Mercado</h3>
                <p className="text-sm text-gray-500">Gráficos e tendências</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pokemon-card p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Comece a acompanhar suas cartas favoritas
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Receba alertas de preços e não perca oportunidades
        </p>
        <Link 
          to="/search" 
          className="btn-primary mt-4 inline-flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Começar Agora
        </Link>
      </section>
    </div>
  )
}
