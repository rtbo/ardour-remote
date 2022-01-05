<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type: 'text' | 'number'
  label?: string
  modelValue: string | number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  modelValue: '',
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
    :placeholder="props.label"
    class="rounded border-2 text-black bg-slate-500 focus:border-lime-500"
  />
</template>
