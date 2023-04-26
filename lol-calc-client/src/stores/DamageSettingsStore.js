import { defineStore } from 'pinia'

export const useDamageSettingsStore = defineStore('damageSettingsStore', {
    state: () => ({
        isTargetDummy: true,
    }),

    getters: {

    },

    actions: {
        toggleIsTargetDummy() {
            this.isTargetDummy = !this.isTargetDummy
        }
    }
})