import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CardSearch from './pages/CardSearch'
import CardDetail from './pages/CardDetail'
import Collection from './pages/Collection'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<CardSearch />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/card/:id" element={<CardDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
