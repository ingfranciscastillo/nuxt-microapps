export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const query = getQuery(event)
  const { from, to } = query
  
  try {

    const response = await $fetch<{ conversion_rate: number }>(`https://v6.exchangerate-api.com/v6/${config.private.apiKeyExchange}/pair/${from}/${to}`)

    return {
      conversion_rate: response.conversion_rate,
    }
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching exchange rate data'
    })
  }
})