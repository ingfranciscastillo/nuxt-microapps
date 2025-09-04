export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { searchTerm } = query
  
  try {
    const normalizedSearchTerm = String(searchTerm).toLowerCase().trim()
    
    const response = await $fetch(`https://freedictionaryapi.com/api/v1/entries/es/${normalizedSearchTerm}`)

    return response
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching dictionary data'
    })
  }
})