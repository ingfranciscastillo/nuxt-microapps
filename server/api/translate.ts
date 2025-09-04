interface MyMemoryResponse {
  responseStatus: number
  responseData: {
    translatedText: string
  }
}

interface LibreTranslateResponse {
  translatedText: string
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { text, from = 'en', to = 'es' } = query
  
  if (!text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Text is required'
    })
  }

  try {
    const response = await $fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(String(text))}&langpair=${from}|${to}`) as MyMemoryResponse
    
    if (response.responseStatus === 200 && response.responseData) {
      return {
        translatedText: response.responseData.translatedText,
        originalText: text
      }
    } else {
      throw new Error('Translation failed')
    }
  } catch (error) {
    console.error('Translation error:', error)
    
    try {
      const response = await $fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: from,
          target: to,
          format: 'text'
        })
      }) as LibreTranslateResponse

      return {
        translatedText: response.translatedText,
        originalText: text
      }
    } catch (fallbackError) {
      console.error('Fallback translation error:', fallbackError)
      
      return {
        translatedText: text,
        originalText: text
      }
    }
  }
})
