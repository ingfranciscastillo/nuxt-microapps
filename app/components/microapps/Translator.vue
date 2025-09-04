<template>
  <div class="space-y-6">
    <div class="space-y-4">
      <div class="flex gap-2">
        <USelectMenu
          v-model="sourceLanguage"
          :items="languages"
          placeholder="Idioma origen"
          class="w-40"
          value-key="value"
        />
        <UButton
            variant="outline"
          size="sm"
          icon="i-lucide-arrow-left-right"
          @click="swapLanguages"
        />
        <USelectMenu
          v-model="targetLanguage"
          :items="languages"
          value-key="value"
          placeholder="Idioma destino"
          class="w-40"
        />
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-muted-foreground">
            {{ getLanguageName(sourceLanguage) }}
          </label>
          <UTextarea
            v-model="sourceText"
            placeholder="Escribe el texto a traducir..."
            :rows="8"
            class="w-full"
          />
        </div>
        
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-muted-foreground">
              {{ getLanguageName(targetLanguage) }}
            </label>
            <UButton
              v-if="translatedText"
              size="sm"
              variant="ghost"
              icon="i-lucide-copy"
              @click="copyToClipboard"
            >
              Copiar
            </UButton>
          </div>
          <UTextarea
            v-model="translatedText"
            placeholder="Traducción aparecerá aquí..."
            :rows="8"
            readonly
            class="w-full"
          />
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <UButton
        :loading="loading"
        :disabled="!sourceText.trim()"
        size="lg"
        class="flex-1"
        @click="translateText"
      >
        <UIcon name="i-lucide-languages" class="mr-2" />
        Traducir
      </UButton>
      <UButton
        variant="outline"
        size="lg"
        @click="clearAll"
      >
        <UIcon name="i-lucide-trash-2" class="mr-2" />
        Limpiar
      </UButton>
    </div>

    <UAlert
      v-if="error"
      title="Error"
      :description="error"
      color="red"
      variant="soft"
      icon="i-lucide-alert-circle"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toast = useToast()

const sourceText = ref('')
const translatedText = ref('')
const sourceLanguage = ref('es')
const targetLanguage = ref('en')
const loading = ref(false)
const error = ref('')

const languages = [
  { label: 'Español', value: 'es' },
  { label: 'Inglés', value: 'en' },
  { label: 'Francés', value: 'fr' },
  { label: 'Alemán', value: 'de' },
  { label: 'Italiano', value: 'it' },
  { label: 'Portugués', value: 'pt' },
  { label: 'Ruso', value: 'ru' },
  { label: 'Japonés', value: 'ja' },
  { label: 'Chino', value: 'zh' },
  { label: 'Coreano', value: 'ko' },
  { label: 'Árabe', value: 'ar' },
  { label: 'Holandés', value: 'nl' }
]

const getLanguageName = (code) => {
  const language = languages.find(lang => lang.value === code)
  return language ? language.label : code.toUpperCase()
}

const swapLanguages = () => {
  const temp = sourceLanguage.value
  sourceLanguage.value = targetLanguage.value
  targetLanguage.value = temp
  
  const tempText = sourceText.value
  sourceText.value = translatedText.value
  translatedText.value = tempText
}

const translateText = async () => {
  if (!sourceText.value.trim()) return
  
  loading.value = true
  error.value = ''
  translatedText.value = ''
  
  try {
    const response = await $fetch('/api/translate', {
      query: {
        text: sourceText.value.trim(),
        from: sourceLanguage.value,
        to: targetLanguage.value
      }
    })
    
    translatedText.value = response.translatedText
  } catch (error) {
    error.value = 'Error al traducir el texto. Intenta de nuevo.'
  } finally {
    loading.value = false
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(translatedText.value)
    toast.add({
      title: 'Texto copiado',
      description: 'Texto copiado al portapapeles',
      color: 'primary',
      icon: 'i-lucide-copy'
    })
  } catch (error) {
    console.error('Error copying to clipboard:', error)
  }
}

const clearAll = () => {
  sourceText.value = ''
  translatedText.value = ''
  error.value = ''
}
</script>
