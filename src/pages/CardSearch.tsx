import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

export default function CardSearch() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Buscar Cartas</h1>
        <p className="mt-2 text-gray-600">
          Encontre cartas Pokémon e acompanhe seus preços
        </p>
      </div>

      {/* Search Bar */}
      <div className="pokemon-card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Digite o nome da carta..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pokemon-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button className="btn-primary px-6">
            Buscar
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>Todos os Sets</option>
            <option>Base Set</option>
            <option>Jungle</option>
            <option>Fossil</option>
          </select>
          
          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>Todas as Raridades</option>
            <option>Comum</option>
            <option>Incomum</option>
            <option>Rara</option>
            <option>Rara Holofoil</option>
          </select>

          <select className="border border-gray-300 rounded-lg px-3 py-2">
            <option>Todos os Tipos</option>
            <option>Fire</option>
            <option>Water</option>
            <option>Grass</option>
            <option>Electric</option>
            <option>Psychic</option>
            <option>Fighting</option>
            <option>Darkness</option>
            <option>Metal</option>
            <option>Fairy</option>
            <option>Dragon</option>
            <option>Colorless</option>
          </select>
        </div>
      </div>

      {/* Results Placeholder */}
      <div className="text-center py-12">
        <Search className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma carta encontrada</h3>
        <p className="mt-1 text-sm text-gray-500">
          Digite o nome de uma carta para começar a busca
        </p>
      </div>
    </div>
  )
}
