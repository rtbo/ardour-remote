<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'text' | 'number'
  placeholder?: string
  modelValue: string | number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const model = computed({
  get: () => props.modelValue,
  set(value: string | number) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <input
    v-model="model"
    :type="props.type"
    :placeholder="props.placeholder"
    class="rounded bg-slate-50 dark:bg-slate-800 focus:border-lime-500"
  />
</template>
