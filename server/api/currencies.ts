export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const url = `https://v6.exchangerate-api.com/v6/${config.private.apiKeyExchange}/codes`;
  const data = await $fetch<{ result: string; supported_codes: [string, string][] }>(url);

  if (data.result !== "success") {
    throw createError({ statusCode: 502, statusMessage: "Error al obtener divisas" });
  }

  const items = data.supported_codes.map(([code, name]) => ({ label: `${code} — ${name}`, value: code }));
  return { items };
});