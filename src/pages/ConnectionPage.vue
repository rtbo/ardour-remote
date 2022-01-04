<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from '../store'

const store = useStore()
const connections = computed(() => store.state.recentConnections)
const newName = ref('Name')
const newHost = ref('192.168.1.')
const newPort = ref(3818)
</script>

<template>
  <div class="container mx-auto max-w-sm">
    <div class="bg-slate-200 dark:bg-slate-800 rounded-md my-4 mx-2 py-1">
      <h1 class="text-2xl text-center">Connect to Ardour</h1>
      <div class="my-2 px-2">
        <div class="m-3 p-1 bg-white dark:bg-slate-900 rounded-md">
          <h3 class="text-opacity-75">Local Ardour</h3>
          <span class="pl-4">ws://localhost:3818</span>
        </div>
      </div>
      <div v-if="connections.length != 0" class="my-2 px-2">
        <h2>Recent connections:</h2>
        <div class="grid list-none hover:list-disc">
          <div
            v-for="(conn, index) in connections"
            :key="index"
            class="m-3 p-1 bg-white dark:bg-slate-900 rounded-md"
          >
            <h3>{{ conn.name }}</h3>
            <span class="pl-4"> ws://{{ conn.host }}:{{ conn.port }} </span>
          </div>
        </div>
      </div>
      <div class="my-2 px-2">
        <h2>Make new connection</h2>
        <div class="m-3 py-2 bg-white dark:bg-slate-900 rounded-md">
          <h3 class="mb-2 mx-2">
            <input
              v-model="newName"
              type="text"
              class="w-36 rounded-sm outline-lime-500 text-black"
            />
          </h3>
          <span class="mx-4">
            ws://
            <input
              v-model="newHost"
              type="text"
              pattern="\d*"
              class="w-40 rounded-sm outline-lime-500 text-black"
            />
            :
            <input
              v-model="newPort"
              type="text"
              pattern="\d*"
              class="w-12 rounded-sm outline-lime-500 text-black"
            />
          </span>
          <div class="flex flex-row-reverse px-3">
            <button
              class="mt-2 bg-black dark:bg-white bg-opacity-25 dark:bg-opacity-25 px-5 py-2 rounded"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
