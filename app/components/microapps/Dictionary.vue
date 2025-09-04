<template>
  <div class="space-y-6">
    <div class="flex gap-2">
      <UInput
        v-model="searchTerm"
        icon="i-lucide-search"
        placeholder="Busca una palabra..."
        class="w-full"
        variant="outline"
        size="xl"
        @keyup.enter="fetchDefinition"
      />
      <UButton size="xl" :loading="loading" @click="fetchDefinition">Buscar</UButton>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <UIcon name="i-lucide-loader-2" class="animate-spin h-8 w-8 mx-auto text-primary" />
      <p class="text-sm text-muted-foreground mt-2">Buscando definición...</p>
    </div>

    <!-- Error State -->
    <UAlert
      v-if="error"
      title="Error"
      :description="error"
      color="red"
      variant="soft"
      icon="i-lucide-alert-circle"
    />

    <!-- Results -->
    <div v-if="dictionaryData && !loading" class="space-y-6">
      <!-- Word Header -->
      <UCard class="bg-primary/5 border border-primary/20">
        <UContainer class="text-center py-6">
          <Icon icon="ph:book-open-bold" class="mx-auto h-8 w-8 text-primary mb-3" />
          <h1 class="text-3xl font-bold text-primary mb-2">{{ dictionaryData.word }}</h1>
          <p class="text-sm text-muted-foreground">Definición encontrada</p>
        </UContainer>
      </UCard>

      <!-- Entries -->
      <div v-for="(entry, index) in dictionaryData.entries" :key="index" class="space-y-4">
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-book-open" class="h-5 w-5 text-primary" />
              <h2 class="text-lg font-semibold">Entrada {{ index + 1 }}</h2>
              <UBadge v-if="entry.language" :label="entry.language.name" color="blue" variant="soft" />
            </div>
          </template>

          <div class="space-y-4">
            <!-- Part of Speech -->
            <div v-if="entry.partOfSpeech" class="flex items-center gap-2">
              <UIcon name="i-lucide-tag" class="h-4 w-4 text-muted-foreground" />
              <span class="text-sm font-medium text-muted-foreground">Categoría gramatical:</span>
              <UBadge :label="entry.partOfSpeech" color="green" variant="soft" />
            </div>

            <!-- Pronunciations -->
            <div v-if="entry.pronunciations && entry.pronunciations.length > 0" class="space-y-2">
              <h3 class="text-md font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-volume-2" class="h-4 w-4 text-primary" />
                Pronunciación
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="pronunciation in entry.pronunciations"
                  :key="pronunciation.text"
                  :label="pronunciation.text"
                  color="purple"
                  variant="soft"
                />
              </div>
            </div>

            <!-- Forms -->
            <div v-if="entry.forms && entry.forms.length > 0" class="space-y-2">
              <h3 class="text-md font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-list" class="h-4 w-4 text-primary" />
                Formas
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="form in entry.forms"
                  :key="form.word"
                  :label="form.word"
                  color="orange"
                  variant="soft"
                />
              </div>
            </div>

            <!-- Senses (Definitions) -->
            <div v-if="entry.senses && entry.senses.length > 0" class="space-y-4">
              <h3 class="text-md font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-lightbulb" class="h-4 w-4 text-primary" />
                Definiciones
              </h3>
              <div class="space-y-3">
                <div
                  v-for="(sense, senseIndex) in entry.senses"
                  :key="senseIndex"
                  class="border-l-4 border-primary/20 pl-4 py-2"
                >
                  <!-- Definition -->
                  <p class="text-sm mb-2">
                    <span class="font-medium text-foreground">{{ senseIndex + 1 }}.</span>
                    {{ sense.definition }}
                  </p>

                  <!-- Examples -->
                  <div v-if="sense.examples && sense.examples.length > 0" class="mt-2 space-y-1">
                    <p class="text-xs font-medium text-muted-foreground">Ejemplos:</p>
                    <div class="space-y-1">
                      <p
                        v-for="example in sense.examples"
                        :key="example"
                        class="text-sm text-muted-foreground italic"
                      >
                        "{{ example }}"
                      </p>
                    </div>
                  </div>

                  <!-- Quotes -->
                  <div v-if="sense.quotes && sense.quotes.length > 0" class="mt-2 space-y-1">
                    <p class="text-xs font-medium text-muted-foreground">Citas:</p>
                    <div class="space-y-1">
                      <div
                        v-for="quote in sense.quotes"
                        :key="quote.text"
                        class="text-sm text-muted-foreground"
                      >
                        <p class="italic">"{{ quote.text }}"</p>
                        <p class="text-xs text-muted-foreground/70">— {{ quote.reference }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Translations -->
                  <div v-if="sense.translations && sense.translations.length > 0" class="mt-2 space-y-1">
                    <p class="text-xs font-medium text-muted-foreground">Traducciones:</p>
                    <div class="flex flex-wrap gap-2">
                      <UBadge
                        v-for="translation in sense.translations"
                        :key="`${translation.language.code}-${translation.word}`"
                        :label="`${translation.language.name}: ${translation.word}`"
                        color="blue"
                        variant="soft"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Synonyms -->
            <div v-if="entry.synonyms && entry.synonyms.length > 0" class="space-y-2">
              <h3 class="text-md font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-arrow-right-left" class="h-4 w-4 text-green-500" />
                Sinónimos
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="synonym in entry.synonyms"
                  :key="synonym"
                  :label="synonym"
                  color="green"
                  variant="soft"
                />
              </div>
            </div>

            <!-- Antonyms -->
            <div v-if="entry.antonyms && entry.antonyms.length > 0" class="space-y-2">
              <h3 class="text-md font-semibold flex items-center gap-2">
                <UIcon name="i-lucide-arrow-up-down" class="h-4 w-4 text-red-500" />
                Antónimos
              </h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="antonym in entry.antonyms"
                  :key="antonym"
                  :label="antonym"
                  color="red"
                  variant="soft"
                />
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Source Information -->
      <UCard v-if="dictionaryData.source" class="bg-muted/50">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-info" class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium text-muted-foreground">Información de la fuente</span>
          </div>
        </template>
        <div class="text-xs text-muted-foreground space-y-1">
          <p v-if="dictionaryData.source.url">
            <span class="font-medium">URL: </span>
            <a :href="dictionaryData.source.url" target="_blank" class="text-primary hover:underline">
              {{ dictionaryData.source.url }}
            </a>
          </p>
          <p v-if="dictionaryData.source.license">
            <span class="font-medium">Licencia: </span>
            <a :href="dictionaryData.source.license.url" target="_blank" class="text-primary hover:underline">
              {{ dictionaryData.source.license.name }}
            </a>
          </p>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard v-if="!dictionaryData && !loading && !error" class="bg-primary/5 border border-primary/20">
      <UContainer class="text-center py-8">
        <Icon icon="ph:book-open-bold" class="mx-auto h-8 w-8 text-primary mb-3" />
        <p class="text-lg font-medium text-primary mb-2">Diccionario</p>
        <p class="text-sm text-muted-foreground">Busca una palabra para ver su definición, sinónimos y más información</p>
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const searchTerm = ref('')
const dictionaryData = ref(null)
const loading = ref(false)
const error = ref('')

// Función para traducir categorías gramaticales
const translatePartOfSpeech = (pos) => {
  const translations = {
    'noun': 'sustantivo',
    'verb': 'verbo',
    'adjective': 'adjetivo',
    'adverb': 'adverbio',
    'pronoun': 'pronombre',
    'preposition': 'preposición',
    'conjunction': 'conjunción',
    'interjection': 'interjección',
    'article': 'artículo',
    'determiner': 'determinante',
    'auxiliary': 'auxiliar',
    'modal': 'modal',
    'particle': 'partícula',
    'numeral': 'numeral',
    'proper noun': 'nombre propio',
    'common noun': 'nombre común',
    'transitive verb': 'verbo transitivo',
    'intransitive verb': 'verbo intransitivo',
    'reflexive verb': 'verbo reflexivo',
    'irregular verb': 'verbo irregular',
    'regular verb': 'verbo regular'
  }
  return translations[pos.toLowerCase()] || pos
}

// Función para traducir texto usando la API
const translateText = async (text) => {
  if (!text || typeof text !== 'string') return text
  
  console.log('Traduciendo:', text)
  
  try {
    const response = await $fetch('/api/translate', {
      query: {
        text: text,
        from: 'en',
        to: 'es'
      }
    })
    console.log('Traducción exitosa:', response.translatedText)
    return response.translatedText || text
  } catch (error) {
    console.error('Translation error:', error)
    return text // Devolver texto original si falla la traducción
  }
}


const fetchDefinition = async () => {
  if (!searchTerm.value.trim()) {
    error.value = 'Por favor ingresa una palabra para buscar'
    return
  }

  loading.value = true
  error.value = ''
  dictionaryData.value = null

  try {
    console.log('Buscando definición para:', searchTerm.value)
    const response = await $fetch(`/api/dictionary`, {
      query: {
        searchTerm: searchTerm.value.trim()
      }
    })
    
    console.log('Respuesta recibida:', response)
    
    // Procesar la respuesta para traducir contenido
    if (response && response.entries) {
      console.log('Procesando entradas para traducción...')
      
      for (const entry of response.entries) {
        // Traducir categoría gramatical
        if (entry.partOfSpeech) {
          entry.partOfSpeech = translatePartOfSpeech(entry.partOfSpeech)
        }
        
        // Traducir las definiciones y ejemplos
        if (entry.senses) {
          for (const sense of entry.senses) {
            if (sense.definition) {
              console.log('Traduciendo definición:', sense.definition)
              const translatedDef = await translateText(sense.definition)
              console.log('Definición traducida:', translatedDef)
              sense.definition = translatedDef
            }
            
            if (sense.examples && sense.examples.length > 0) {
              for (let i = 0; i < sense.examples.length; i++) {
                console.log('Traduciendo ejemplo:', sense.examples[i])
                const translatedExample = await translateText(sense.examples[i])
                console.log('Ejemplo traducido:', translatedExample)
                sense.examples[i] = translatedExample
              }
            }
            
            if (sense.quotes && sense.quotes.length > 0) {
              for (const quote of sense.quotes) {
                if (quote.text) {
                  console.log('Traduciendo cita:', quote.text)
                  const translatedQuote = await translateText(quote.text)
                  console.log('Cita traducida:', translatedQuote)
                  quote.text = translatedQuote
                }
              }
            }
          }
        }
      }
    }
    
    console.log('Respuesta final procesada:', response)
    dictionaryData.value = response
  } catch (err) {
    console.error('Error fetching definition:', err)
    error.value = 'No se pudo encontrar la definición. Intenta con otra palabra.'
  } finally {
    loading.value = false
  }
}
</script>