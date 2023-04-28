import { defineStore } from 'pinia'

export const useDamageSettingsStore = defineStore('damageSettingsStore', {
    state: () => ({
        isTargetDummy: true,
        isCrit: false
    }),

    getters: {

    },

    actions: {
        toggleIsTargetDummy() {
            this.isTargetDummy = !this.isTargetDummy
        },
        toggleCrit() {
            this.isCrit = !this.isCrit
        }
    }
})