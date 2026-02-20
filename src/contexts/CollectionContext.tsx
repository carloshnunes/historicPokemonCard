import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

const STORAGE_KEY = 'pokemon-card-collection'

export interface SavedCard {
  id: string
  addedAt: string
}

interface CollectionContextType {
  collection: SavedCard[]
  addCard: (id: string) => void
  removeCard: (id: string) => void
  isInCollection: (id: string) => boolean
}

const CollectionContext = createContext<CollectionContextType | null>(null)

export function CollectionProvider({ children }: { children: ReactNode }) {
  const [collection, setCollection] = useState<SavedCard[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as SavedCard[]
        setCollection(Array.isArray(parsed) ? parsed : [])
      }
    } catch {
      setCollection([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
  }, [collection])

  const addCard = useCallback((id: string) => {
    setCollection(prev => {
      if (prev.some(c => c.id === id)) return prev
      return [...prev, { id, addedAt: new Date().toISOString() }]
    })
  }, [])

  const removeCard = useCallback((id: string) => {
    setCollection(prev => prev.filter(c => c.id !== id))
  }, [])

  const isInCollection = useCallback((id: string) => {
    return collection.some(c => c.id === id)
  }, [collection])

  return (
    <CollectionContext.Provider value={{ collection, addCard, removeCard, isInCollection }}>
      {children}
    </CollectionContext.Provider>
  )
}

export function useCollection() {
  const ctx = useContext(CollectionContext)
  if (!ctx) throw new Error('useCollection must be used within CollectionProvider')
  return ctx
}
