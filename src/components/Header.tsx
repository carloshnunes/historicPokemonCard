import { Link } from 'react-router-dom'
import { Search, TrendingUp, Heart } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/pokehcard.png" 
              alt="Pokémon Card" 
              className="h-10 w-10 object-contain"
              onError={(e) => {
                // Fallback para ícone Lucide se a imagem não carregar
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden')
              }}
            />
            <TrendingUp className="h-8 w-8 text-pokemon-blue fallback-icon hidden" />
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Histórico Pokémon
              </h1>
              <p className="text-xs text-gray-500 leading-tight">
                Histórico de preços
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              Início
            </Link>
            <Link 
              to="/collection" 
              className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              <Heart className="h-4 w-4" />
              <span>Minha Coleção</span>
            </Link>
            <Link 
              to="/search" 
              className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              <Search className="h-4 w-4" />
              <span>Buscar</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
