<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseInput from '../components/BaseInput.vue'
import { Connection } from '../model/connection'
import { useStore } from '../store'

const localArdour = {
  name: 'local Ardour',
  host: 'localhost',
  port: 3818,
}

const store = useStore()
const connections = computed(() => store.state.recentConnections)

const connectionUri = (conn: Connection) => `ws://${conn.host}:${conn.port}`

const connectTo = (conn: Connection) => {
  console.log('connecting to ' + connectionUri(conn))
}

const newName = ref('')
const newHost = ref('192.168.1.')
const newPort = ref(3818)
const connectNew = () =>
  connectTo({
    name: newName.value,
    host: newHost.value,
    port: newPort.value,
  })
const connectBtnEnabled = computed(
  () => newHost.value.length != 0 && newPort.value > 0
)
</script>

<template>
  <div class="grid h-full content-center mx-auto max-w-sm lg:max-w-md">
    <div class="bg-slate-200 dark:bg-slate-800 rounded-md my-4 mx-2 py-1">
      <h1 class="text-3xl text-center mb-7 mt-2">Connect to Ardour</h1>
      <div class="my-1 px-2">
        <h2 class="font-light">Connect to {{ localArdour.name }}</h2>
        <div
          class="
            grid grid-cols-3
            m-1
            px-1
            py-4
            bg-white
            dark:bg-slate-900
            rounded-md
            cursor-pointer
          "
          @click="connectTo(localArdour)"
        >
          <div></div>
          <div class="col-span-2 font-mono text-black/80 dark:text-white/80">
            {{ connectionUri(localArdour) }}
          </div>
        </div>
      </div>
      <div v-if="connections.length != 0" class="my-4 px-2">
        <h2 class="font-light">Recent connections</h2>
        <div>
          <div
            v-for="(conn, index) in connections"
            :key="index"
            class="
              grid grid-cols-3
              m-1
              px-1
              py-4
              bg-white
              dark:bg-slate-900
              rounded-md
              cursor-pointer
            "
            @click="connectTo(conn)"
          >
            <div>
              <h3>{{ conn.name }}</h3>
            </div>
            <div class="col-span-2 font-mono text-black/80 dark:text-white/80">
              {{ connectionUri(conn) }}
            </div>
          </div>
        </div>
      </div>
      <div class="my-4 px-2">
        <h2 class="font-light">Make new connection</h2>
        <div class="m-1 py-2 bg-white dark:bg-slate-900 rounded-md">
          <h3 class="mb-2 mx-2">
            <BaseInput
              v-model="newName"
              placeholder="Name (Optional)"
              type="text"
              class="w-48"
            />
          </h3>
          <div
            class="mx-4 font-mono text-right text-black/80 dark:text-white/80"
          >
            ws://
            <BaseInput
              v-model="newHost"
              placeholder="IP or host name"
              type="text"
              pattern="\d*"
              class="w-40"
            />:<BaseInput
              v-model="newPort"
              placeholder="Port"
              type="number"
              pattern="\d*"
              class="w-16"
            />
          </div>
          <div class="flex flex-row-reverse px-3">
            <button
              class="
                mt-2
                bg-black bg-opacity-5
                dark:bg-white dark:bg-opacity-5
                disabled:text-black/20
                dark:disabled:text-white/20
                px-5
                py-2
                rounded
                hover:disabled:bg-opacity-5 hover:bg-opacity-30
              "
              :disabled="!connectBtnEnabled"
              @click="connectNew"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
