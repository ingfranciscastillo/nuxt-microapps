export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { searchTerm } = query
  
  try {

    const response = await $fetch(`https://freedictionaryapi.com/api/v1/entries/es/${searchTerm}`)

    return response
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching exchange rate data'
    })
  }
})