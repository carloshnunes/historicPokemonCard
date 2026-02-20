import { useState, useEffect, useCallback } from 'react'

interface ExchangeRates {
  USD: number
  EUR: number
}

const CACHE_KEY = 'currency-rates-brl'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hora

function getCachedRates(): ExchangeRates | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    const { rates, timestamp } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) return null
    return rates
  } catch {
    return null
  }
}

function setCachedRates(rates: ExchangeRates) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    rates,
    timestamp: Date.now()
  }))
}

export function useCurrency() {
  const [rates, setRates] = useState<ExchangeRates | null>(getCachedRates)
  const [isLoading, setIsLoading] = useState(!getCachedRates())

  useEffect(() => {
    if (getCachedRates()) return

    const fetchRates = async () => {
      try {
        // Frankfurter API - gratuita, sem chave
        const [usdRes, eurRes] = await Promise.all([
          fetch('https://api.frankfurter.app/latest?from=USD&to=BRL'),
          fetch('https://api.frankfurter.app/latest?from=EUR&to=BRL')
        ])

        if (usdRes.ok && eurRes.ok) {
          const usdData = await usdRes.json()
          const eurData = await eurRes.json()
          const newRates = {
            USD: usdData.rates?.BRL ?? 5.5,
            EUR: eurData.rates?.BRL ?? 6.0
          }
          setRates(newRates)
          setCachedRates(newRates)
        } else {
          // Fallback se API falhar
          setRates({ USD: 5.5, EUR: 6.0 })
        }
      } catch {
        setRates({ USD: 5.5, EUR: 6.0 })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRates()
  }, [])

  const convertToBRL = useCallback((value: number, from: 'USD' | 'EUR'): number => {
    if (!rates || value <= 0) return 0
    return value * rates[from]
  }, [rates])

  const formatBRL = useCallback((value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }, [])

  return { rates, isLoading, convertToBRL, formatBRL }
}
