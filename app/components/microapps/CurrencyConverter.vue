<template>
  <div class="space-y-6">
    <!-- Formulario de conversión -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block mb-2 text-small font-medium text-foreground-700">
          Cantidad y moneda de origen
        </label>
        <div class="flex gap-2">
          <UInputNumber
            v-model="fromAmount"
            placeholder="1"
            variant="outline"
            class="flex-1"
            :is-disabled="loadingCurrencies"
          />
          <USelectMenu
            v-model="fromCurrency"
            placeholder="USD"
            variant="outline"
            class="w-32"
            :items="currencies"
            :is-disabled="loadingCurrencies"
            value-key="value"
          />
        </div>
      </div>
      
      <div>
        <label class="block mb-2 text-small font-medium text-foreground-700">
          Moneda de destino
        </label>
          <USelectMenu
            v-model="toCurrency"
            placeholder="EUR"
            variant="outline"
            class="w-32"
            :items="currencies"
            value-key="value"
          />
      </div>
    </div>

    <UCard class="bg-primary/5 border border-primary/20">
      <UContainer class="text-center py-8">
        <Icon icon="ph:currency-dollar-bold" class="mx-auto h-8 w-8 text-primary mb-2" />
        <p class="text-small text-foreground-600">Resultado</p>
        <p class="text-2xl font-bold text-primary mb-1">
          {{ convertedAmount }} {{ toCurrency }}
        </p>
        <p class="text-tiny text-foreground-400">
          Tasa: 1 {{ fromCurrency }} = {{ exchangeRate }} {{ toCurrency }}
        </p>
      </UContainer>
    </UCard>

    <UButton
      color="primary"
      size="lg"
      class="w-full"
      :is-loading="isLoading"
      @click="convertCurrency"
    >
      <Icon icon="ph:arrows-left-right-bold" class="w-4 h-4 mr-2" />
      {{ isLoading ? "Cargando..." : "Convertir" }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";

const fromAmount = ref<number>(1);
const fromCurrency = ref<string>("USD");
const toCurrency = ref<string>("EUR");
const convertedAmount = ref<number | null>(null);
const exchangeRate = ref<number | null>(null);
const isLoading = ref<boolean>(false);
const currencies = ref<{ label: string; value: string }[]>([]);

const fetchCurrencies = async () => {
  const res = await $fetch<{ items: { label: string; value: string }[] }>("/api/currencies");
  return res.items;
};

const { data: currencyData, isLoading: loadingCurrencies } = useQuery({
  queryKey: ["currencies"],
  queryFn: fetchCurrencies,
  refetchOnWindowFocus: false,
  staleTime: 1000 * 60 * 60, // refresca cada hora o más
});

if (currencyData.value) {
  currencies.value = currencyData.value;
}

const fetchRate = async () => {
  const {conversion_rate} = await $fetch("/api/exchange-rate", {
    query: {
      from: fromCurrency.value,
      to: toCurrency.value
    }
  });
  return conversion_rate;
}

const { data, isFetching, refetch } = useQuery({
  queryKey: [exchangeRate, fromCurrency, toCurrency],
  queryFn: fetchRate,
  enabled: true,
});

watch([data, isFetching], () => {
  isLoading.value = isFetching.value;
  if (data.value) {
    exchangeRate.value = data.value;
    convertedAmount.value = Number((fromAmount.value * data.value).toFixed(2));
  }
});

const convertCurrency = async () => {
  await refetch();
};

</script>
