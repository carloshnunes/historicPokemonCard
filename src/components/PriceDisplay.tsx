import { useCurrency } from '@/hooks/useCurrency'

interface PriceDisplayProps {
  value: number
  currency: 'USD' | 'EUR'
  showOriginal?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function PriceDisplay({ value, currency, showOriginal = true, size = 'md', className = '' }: PriceDisplayProps) {
  const { convertToBRL, formatBRL, isLoading } = useCurrency()

  if (value <= 0) {
    return <span className="text-gray-400 text-sm">Preço indisponível</span>
  }

  const brlValue = convertToBRL(value, currency)

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl'
  }

  return (
    <div className={className}>
      {isLoading ? (
        <span className="text-gray-400 animate-pulse">Carregando...</span>
      ) : (
        <>
          <span className={`font-semibold text-green-700 ${sizeClasses[size]}`}>
            {formatBRL(brlValue)}
          </span>
          {showOriginal && (
            <span className="text-gray-500 text-xs ml-1">
              ({currency === 'USD' ? '$' : '€'}{value.toFixed(2)})
            </span>
          )}
        </>
      )}
    </div>
  )
}
