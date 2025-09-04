<template>
  <div class="space-y-6">
    <!-- Timer display -->
    <div class="text-center">
      <div class="inline-flex items-center justify-center w-48 h-48 bg-primary-100 dark:bg-primary-900/50 rounded-full">
        <span class="text-4xl font-mono font-bold text-primary-700 dark:text-primary-300">
          {{ formattedTime }}
        </span>
      </div>
    </div>

    <!-- Estado actual -->
    <div class="text-center">
      <p class="text-lg font-medium text-gray-900 dark:text-white">
        {{ isWorkTime ? 'Sesión de Trabajo' : 'Descanso' }}
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Sesión {{ sessionsCompleted + (isWorkTime ? 1 : 0) }} de {{ totalSessions }}
      </p>
    </div>

    <!-- Controles -->
    <div class="flex justify-center space-x-4">
      <UButton color="primary" variant="soft" @click="startTimer">
        Iniciar
      </UButton>
      <UButton color="secondary" variant="soft" @click="pauseTimer">
        Pausar
      </UButton>
      <UButton color="warning" variant="soft" @click="resetTimer">
        Reiniciar
      </UButton>
    </div>

    <!-- Configuración -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div>
        <label class="block text-gray-700 dark:text-gray-300 mb-1">
          Trabajo (min)
        </label>
        <UInputNumber
          v-model="workMinutes"
        />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 mb-1">
          Descanso corto (min)
        </label>
        <UInputNumber
          v-model="breakMinutes"
        />
      </div>
      <div>
        <label class="block text-gray-700 dark:text-gray-300 mb-1">
          Descanso largo (min)
        </label>
        <UInputNumber
          v-model="longBreakMinutes"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
const toast = useToast();

const workMinutes = ref(25);
const breakMinutes = ref(5);
const longBreakMinutes = ref(15);
const sessionsCompleted = ref(0);
const totalSessions = ref(4);

const isRunning = ref(false);
const isWorkTime = ref(true);
const secondsLeft = ref(workMinutes.value * 60);
let timer: number | null = null;

const startTimer = () => {
  if (isRunning.value) return;
  isRunning.value = true;

  timer = setInterval(() => {
    if (secondsLeft.value > 0) {
      secondsLeft.value--;
    } else {
      if (isWorkTime.value) {
        sessionsCompleted.value++;
      }

      isWorkTime.value = !isWorkTime.value;

      if (isWorkTime.value) {
        secondsLeft.value = workMinutes.value * 60;
      } else {
        secondsLeft.value = sessionsCompleted.value % totalSessions.value === 0
          ? longBreakMinutes.value * 60
          : breakMinutes.value * 60;
      }

      toast.add({
        title: isWorkTime.value ? "Hora de trabajar" : "Hora de descansar",
        description: "Tiempo restante: " + formattedTime.value,
        color: isWorkTime.value ? "primary" : "secondary",
        icon: isWorkTime.value ? "ph:clock-bold" : "ph:clock-bold"
      });
    }
  }, 1000);
};

const pauseTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    isRunning.value = false;
  }
};

const resetTimer = () => {
  pauseTimer();
  isWorkTime.value = true;
  secondsLeft.value = workMinutes.value * 60;
  sessionsCompleted.value = 0;
};

const formattedTime = computed(() => {
  const m = Math.floor(secondsLeft.value / 60).toString().padStart(2, '0');
  const s = (secondsLeft.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

watch(workMinutes, (val) => {
  if (isWorkTime.value && !isRunning.value) secondsLeft.value = val * 60;
});

watch([breakMinutes, longBreakMinutes], () => {
  if (!isWorkTime.value && !isRunning.value) {
    secondsLeft.value = breakMinutes.value * 60;
  }
});

</script>