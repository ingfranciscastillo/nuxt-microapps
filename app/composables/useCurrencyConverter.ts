interface Currency {
  code: string
  name: string
  symbol: string
  flag: string
}

interface ConversionHistory {
  from: string
  to: string
  fromAmount: number
  toAmount: number
  rate: number
  timestamp: number
}

export const useCurrencyConverter = () => {
  const popularCurrencies: Currency[] = [
    { code: 'USD', name: 'Dólar Estadounidense', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'Libra Esterlina', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Yen Japonés', symbol: '¥', flag: '🇯🇵' },
    { code: 'CNY', name: 'Yuan Chino', symbol: '¥', flag: '🇨🇳' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$', flag: '🇲🇽' },
    { code: 'BRL', name: 'Real Brasileño', symbol: 'R$', flag: '🇧🇷' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$', flag: '🇦🇷' },
    { code: 'CLP', name: 'Peso Chileno', symbol: '$', flag: '🇨🇱' },
    { code: 'COP', name: 'Peso Colombiano', symbol: '$', flag: '🇨🇴' },
    { code: 'CAD', name: 'Dólar Canadiense', symbol: 'C$', flag: '🇨🇦' },
    { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CHF', name: 'Franco Suizo', symbol: 'Fr', flag: '🇨🇭' },
    { code: 'KRW', name: 'Won Surcoreano', symbol: '₩', flag: '🇰🇷' },
    { code: 'INR', name: 'Rupia India', symbol: '₹', flag: '🇮🇳' },
    { code: 'RUB', name: 'Rublo Ruso', symbol: '₽', flag: '🇷🇺' },
    { code: 'TRY', name: 'Lira Turca', symbol: '₺', flag: '🇹🇷' },
    { code: 'ZAR', name: 'Rand Sudafricano', symbol: 'R', flag: '🇿🇦' },
    { code: 'SGD', name: 'Dólar Singapurense', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Dólar Hongkonés', symbol: 'HK$', flag: '🇭🇰' }
  ]

  const fromAmount = ref<number>(1)
  const fromCurrency = ref<string>('USD')
  const toCurrency = ref<string>('EUR')
  const exchangeRate = ref<number | null>(null)
  const convertedAmount = ref<number | null>(null)
  const searchQuery = ref('')
  const showFromSearch = ref(false)
  const showToSearch = ref(false)
  const history = ref<ConversionHistory[]>([])
  const showHistory = ref(false)

  const allCurrencies = computed(() => {
    if (import.meta.client) {
      const stored = localStorage.getItem('allCurrencies')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          return popularCurrencies
        }
      }
    }
    return popularCurrencies
  })

  const filteredCurrencies = computed(() => {
    const query = searchQuery.value.toLowerCase()
    if (!query) return allCurrencies.value
    return allCurrencies.value.filter(c =>
      c.code.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query)
    )
  })

  const fromCurrencyData = computed(() =>
    allCurrencies.value.find(c => c.code === fromCurrency.value)
  )

  const toCurrencyData = computed(() =>
    allCurrencies.value.find(c => c.code === toCurrency.value)
  )

  const fetchRate = async () => {
    try {
      const data = await $fetch<{ conversion_rate: number }>('/api/exchange-rate', {
        query: {
          from: fromCurrency.value,
          to: toCurrency.value
        }
      })
      exchangeRate.value = data.conversion_rate
      convertedAmount.value = Number((fromAmount.value * data.conversion_rate).toFixed(2))
      return data.conversion_rate
    } catch (error) {
      console.error('Error fetching rate:', error)
      return null
    }
  }

  const swapCurrencies = () => {
    const temp = fromCurrency.value
    fromCurrency.value = toCurrency.value
    toCurrency.value = temp
    fetchRate()
  }

  const saveToHistory = () => {
    if (!convertedAmount.value || !exchangeRate.value) return

    const entry: ConversionHistory = {
      from: fromCurrency.value,
      to: toCurrency.value,
      fromAmount: fromAmount.value,
      toAmount: convertedAmount.value,
      rate: exchangeRate.value,
      timestamp: Date.now()
    }

    history.value.unshift(entry)
    if (history.value.length > 20) {
      history.value = history.value.slice(0, 20)
    }

    if (import.meta.client) {
      localStorage.setItem('currencyHistory', JSON.stringify(history.value))
    }
  }

  const loadHistory = () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('currencyHistory')
      if (stored) {
        try {
          history.value = JSON.parse(stored)
        } catch {
          history.value = []
        }
      }
    }
  }

  const clearHistory = () => {
    history.value = []
    if (import.meta.client) {
      localStorage.removeItem('currencyHistory')
    }
  }

  const applyFromHistory = (entry: ConversionHistory) => {
    fromCurrency.value = entry.from
    toCurrency.value = entry.to
    fromAmount.value = entry.fromAmount
    exchangeRate.value = entry.rate
    convertedAmount.value = entry.toAmount
  }

  watch([fromCurrency, toCurrency], () => {
    if (fromCurrency.value && toCurrency.value) {
      fetchRate()
    }
  })

  watch(fromAmount, () => {
    if (exchangeRate.value) {
      convertedAmount.value = Number((fromAmount.value * exchangeRate.value).toFixed(2))
    }
  })

  onMounted(() => {
    loadHistory()
  })

  return {
    fromAmount,
    fromCurrency,
    toCurrency,
    exchangeRate,
    convertedAmount,
    searchQuery,
    showFromSearch,
    showToSearch,
    allCurrencies,
    filteredCurrencies,
    fromCurrencyData,
    toCurrencyData,
    swapCurrencies,
    saveToHistory,
    clearHistory,
    applyFromHistory,
    showHistory,
    history,
    fetchRate
  }
}