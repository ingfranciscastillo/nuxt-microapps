<template>
  <div class="space-y-6">
    <!-- Inputs -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Peso (kg)
        </label>
        <UInputNumber
          v-model="weight"
          placeholder="70"
          variant="outline"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Altura (cm)
        </label>
        <UInputNumber
          v-model="height"
          placeholder="175"
          variant="outline"
        />
      </div>
    </div>

    <div :class="['rounded-lg p-4 text-center', bmiStyles.container]">
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Tu IMC es</p>
        <p :class="['text-3xl font-bold', bmiStyles.text]">
          {{ bmi }}
        </p>
        <p :class="['text-3xl font-bold', bmiStyles.text]">
          {{ bmiCategory }}
        </p>
      </div>
    </div>

    <div class="text-sm space-y-2">
      <h4 class="font-medium text-gray-900 dark:text-white">Rangos de IMC:</h4>
      <div class="space-y-1 text-gray-600 dark:text-gray-400">
        <p>• Bajo peso: &lt; 18.5</p>
        <p>• Peso normal: 18.5 - 24.9</p>
        <p>• Sobrepeso: 25 - 29.9</p>
        <p>• Obesidad: ≥ 30</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'

const weight = ref(null)
const height = ref(null)

  const bmi = computed(() => {
    if (!weight.value || !height.value) return null;

    const heightInMeters = height.value / 100; // convertir cm a m
    return (weight.value / (heightInMeters * heightInMeters)).toFixed(1);
  })

  // Clasificación del BMI
  const bmiCategory = computed(() => {
    if (!bmi.value) return "Introduce tus datos";

    const value = parseFloat(bmi.value);

    if (value < 18.5) return "Bajo peso";
    if (value >= 18.5 && value < 24.9) return "Normal";
    if (value >= 25 && value < 29.9) return "Sobrepeso";
    if (value >= 30 && value < 34.9) return "Obesidad grado I";
    if (value >= 35 && value < 39.9) return "Obesidad grado II";
    return "Obesidad grado III";
  });

// 🎨 Colores dinámicos
const bmiStyles = computed(() => {
  switch (bmiCategory.value) {
    case "Bajo peso":
      return {
        container: "bg-blue-50 dark:bg-blue-900/50",
        text: "text-blue-700 dark:text-blue-300",
      };
    case "Normal":
      return {
        container: "bg-green-50 dark:bg-green-900/50",
        text: "text-green-700 dark:text-green-300",
      };
    case "Sobrepeso":
      return {
        container: "bg-yellow-50 dark:bg-yellow-900/50",
        text: "text-yellow-700 dark:text-yellow-300",
      };
    case "Obesidad grado I":
      return {
        container: "bg-orange-50 dark:bg-orange-900/50",
        text: "text-orange-700 dark:text-orange-300",
      };
    case "Obesidad grado II":
      return {
        container: "bg-red-50 dark:bg-red-900/50",
        text: "text-red-700 dark:text-red-300",
      };
    case "Obesidad grado III":
      return {
        container: "bg-purple-50 dark:bg-purple-900/50",
        text: "text-purple-700 dark:text-purple-300",
      };
    default:
      return {
        container: "bg-gray-50 dark:bg-gray-800",
        text: "text-gray-700 dark:text-gray-300",
      };
  }
});

</script>