import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { Connection } from './model/connection'

export interface State {
  recentConnections: Connection[]
  connection: Connection | null
}

export const key: InjectionKey<Store<State>> = Symbol()

const RECENT_CONNECTIONS_KEY = 'recentConnections'

export const store = createStore<State>({
  state() {
    return {
      recentConnections: initConnections(),
      connection: null,
    }
  },
  mutations: {
    addConnection(state, conn: Connection) {
      state.recentConnections.push(conn)
      localStorage.setItem(
        RECENT_CONNECTIONS_KEY,
        JSON.stringify(state.recentConnections)
      )
    },
  },
})

function initConnections(): Connection[] {
  const connections = localStorage.getItem(RECENT_CONNECTIONS_KEY)
  if (connections) {
    return JSON.parse(connections)
  } else {
    return [
      {
        name: 'Laptop',
        host: '192.168.1.23',
        port: 3818,
      },
    ]
  }
}

export function useStore(): Store<State> {
  return vuexUseStore(key)
}
