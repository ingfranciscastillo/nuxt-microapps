interface ConversionUnit {
  key: string
  label: string
  symbol: string
}

interface ConversionType {
  label: string
  icon: string
  units: ConversionUnit[]
}

export const useUnitConverter = () => {
  const conversionTypes = ref<ConversionType[]>([
    {
      label: 'Longitud',
      icon: 'i-ph-ruler-bold',
      units: [
        { key: 'mm', label: 'Milímetros', symbol: 'mm' },
        { key: 'cm', label: 'Centímetros', symbol: 'cm' },
        { key: 'm', label: 'Metros', symbol: 'm' },
        { key: 'km', label: 'Kilómetros', symbol: 'km' },
        { key: 'in', label: 'Pulgadas', symbol: 'in' },
        { key: 'ft', label: 'Pies', symbol: 'ft' },
        { key: 'mi', label: 'Millas', symbol: 'mi' },
        { key: 'yd', label: 'Yardas', symbol: 'yd' }
      ]
    },
    {
      label: 'Peso',
      icon: 'i-ph-scales-bold',
      units: [
        { key: 'mg', label: 'Miligramos', symbol: 'mg' },
        { key: 'g', label: 'Gramos', symbol: 'g' },
        { key: 'kg', label: 'Kilogramos', symbol: 'kg' },
        { key: 'lb', label: 'Libras', symbol: 'lb' },
        { key: 'oz', label: 'Onzas', symbol: 'oz' },
        { key: 't', label: 'Toneladas', symbol: 't' }
      ]
    },
    {
      label: 'Temperatura',
      icon: 'i-ph-thermometer-hot-bold',
      units: [
        { key: 'c', label: 'Celsius', symbol: '°C' },
        { key: 'f', label: 'Fahrenheit', symbol: '°F' },
        { key: 'k', label: 'Kelvin', symbol: 'K' }
      ]
    },
    {
      label: 'Volumen',
      icon: 'i-ph-drop-bold',
      units: [
        { key: 'ml', label: 'Mililitros', symbol: 'ml' },
        { key: 'l', label: 'Litros', symbol: 'L' },
        { key: 'gal', label: 'Galones', symbol: 'gal' },
        { key: 'floz', label: 'Fl oz', symbol: 'fl oz' },
        { key: 'cm3', label: 'Cm³', symbol: 'cm³' }
      ]
    },
    {
      label: 'Área',
      icon: 'i-ph-frame-corners-bold',
      units: [
        { key: 'cm2', label: 'Cm²', symbol: 'cm²' },
        { key: 'm2', label: 'M²', symbol: 'm²' },
        { key: 'km2', label: 'Km²', symbol: 'km²' },
        { key: 'in2', label: 'Pulgadas²', symbol: 'in²' },
        { key: 'ft2', label: 'Pies²', symbol: 'ft²' },
        { key: 'mi2', label: 'Millas²', symbol: 'mi²' },
        { key: 'acre', label: 'Acres', symbol: 'ac' },
        { key: 'ha', label: 'Hectáreas', symbol: 'ha' }
      ]
    },
    {
      label: 'Velocidad',
      icon: 'i-ph-gauge-bold',
      units: [
        { key: 'ms', label: 'm/s', symbol: 'm/s' },
        { key: 'kmh', label: 'km/h', symbol: 'km/h' },
        { key: 'mph', label: 'mph', symbol: 'mph' },
        { key: 'knots', label: 'Nudos', symbol: 'kn' },
        { key: 'fps', label: 'ft/s', symbol: 'ft/s' }
      ]
    },
    {
      label: 'Tiempo',
      icon: 'i-ph-clock-bold',
      units: [
        { key: 'ms', label: 'Milisegundos', symbol: 'ms' },
        { key: 's', label: 'Segundos', symbol: 's' },
        { key: 'min', label: 'Minutos', symbol: 'min' },
        { key: 'h', label: 'Horas', symbol: 'h' },
        { key: 'd', label: 'Días', symbol: 'd' },
        { key: 'w', label: 'Semanas', symbol: 'w' },
        { key: 'mo', label: 'Meses', symbol: 'mo' },
        { key: 'y', label: 'Años', symbol: 'y' }
      ]
    }
  ])

  const selectedTypeIndex = ref(0)
  const fromValue = ref<number | null>(1)
  const fromUnit = ref('m')
  const toUnit = ref('cm')
  const history = ref<Array<{ from: string; to: string; fromValue: number; toValue: number; type: string }>>([])
  const showHistory = ref(false)

  const selectedType = computed(() => conversionTypes.value[selectedTypeIndex.value])
  const availableUnits = computed(() => selectedType.value.units)

  const factors: Record<string, Record<string, number>> = {
    length: { mm: 1, cm: 10, m: 1000, km: 1000000, in: 25.4, ft: 304.8, mi: 1609344, yd: 914.4 },
    weight: { mg: 1, g: 1000, kg: 1000000, lb: 453592, oz: 28350, t: 1000000000 },
    volume: { ml: 1, l: 1000, gal: 3785, floz: 29.5735, cm3: 1 },
    area: { cm2: 1, m2: 10000, km2: 1000000000, in2: 6.4516, ft2: 929.0304, mi2: 25899881.1, acre: 40468672, ha: 100000000 },
    speed: { ms: 1, kmh: 0.277778, mph: 0.44704, knots: 0.514444, fps: 0.3048 },
    time: { ms: 1, s: 1000, min: 60000, h: 3600000, d: 86400000, w: 604800000, mo: 2592000000, y: 31536000000 }
  }

  const toBase = (value: number, from: string, type: string): number => {
    if (type === 'temperatura') {
      if (from === 'c') return value
      if (from === 'f') return (value - 32) * 5 / 9
      if (from === 'k') return value - 273.15
    }
    return value * (factors[type]?.[from] ?? 1)
  }

  const fromBase = (value: number, to: string, type: string): number => {
    if (type === 'temperatura') {
      if (to === 'c') return value
      if (to === 'f') return value * 9 / 5 + 32
      if (to === 'k') return value + 273.15
    }
    const factor = factors[type]?.[to] ?? 1
    return value / factor
  }

  const convertedValue = computed(() => {
    if (!fromValue.value || !fromUnit.value || !toUnit.value) return null
    const type = selectedType.value.label.toLowerCase()
    const base = toBase(fromValue.value, fromUnit.value, type)
    return fromBase(base, toUnit.value, type)
  })

  const formattedResult = computed(() => {
    if (!convertedValue.value) return ''
    const result = convertedValue.value
    if (Math.abs(result) >= 1000000 || Math.abs(result) < 0.001) {
      return result.toExponential(4)
    }
    return result.toLocaleString('es-ES', { maximumFractionDigits: 6 })
  })

  const swapUnits = () => {
    const temp = fromUnit.value
    fromUnit.value = toUnit.value
    toUnit.value = temp
  }

  const selectType = (index: number) => {
    selectedTypeIndex.value = index
    fromUnit.value = availableUnits.value[0]?.key || ''
    toUnit.value = availableUnits.value[1]?.key || availableUnits.value[0]?.key || ''
  }

  const saveToHistory = () => {
    if (!fromValue.value || !convertedValue.value) return
    const entry = {
      from: fromUnit.value,
      to: toUnit.value,
      fromValue: fromValue.value,
      toValue: convertedValue.value,
      type: selectedType.value.label
    }
    history.value.unshift(entry)
    if (history.value.length > 20) {
      history.value = history.value.slice(0, 20)
    }
    if (import.meta.client) {
      localStorage.setItem('unitConverterHistory', JSON.stringify(history.value))
    }
  }

  const loadHistory = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('unitConverterHistory')
      if (saved) {
        try {
          history.value = JSON.parse(saved)
        } catch {
          history.value = []
        }
      }
    }
  }

  const clearHistory = () => {
    history.value = []
    if (import.meta.client) {
      localStorage.removeItem('unitConverterHistory')
    }
  }

  const applyFromHistory = (entry: typeof history.value[0]) => {
    const typeIndex = conversionTypes.value.findIndex(t => t.label === entry.type)
    if (typeIndex !== -1) {
      selectType(typeIndex)
      fromUnit.value = entry.from
      toUnit.value = entry.to
      fromValue.value = entry.fromValue
    }
  }

  watch(selectedTypeIndex, () => {
    fromUnit.value = availableUnits.value[0]?.key || ''
    toUnit.value = availableUnits.value[1]?.key || availableUnits.value[0]?.key || ''
  })

  onMounted(() => {
    loadHistory()
  })

  return {
    conversionTypes,
    selectedTypeIndex,
    selectedType,
    fromValue,
    fromUnit,
    toUnit,
    availableUnits,
    convertedValue,
    formattedResult,
    swapUnits,
    selectType,
    saveToHistory,
    clearHistory,
    applyFromHistory,
    showHistory,
    history
  }
}