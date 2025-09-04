<template>
  <div class="space-y-6">
    <UCard>
      <template #header>
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <Icon icon="ph:clock-bold" class="h-6 w-6 text-success" />
          </div>
          <div>
            <h2 class="text-xl font-semibold">Temporizador Pomodoro</h2>
            <p class="text-small text-foreground-500">
              Mejora tu productividad con la técnica Pomodoro
            </p>
          </div>
        </div>
      </template>
      <UContainer>
        <PomodoroTimer />
      </UContainer>
    </UCard>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import PomodoroTimer from '~/components/microapps/PomodoroTimer.vue'

useHead({
  title: 'Temporizador Pomodoro - Micro Apps'
})
</script>