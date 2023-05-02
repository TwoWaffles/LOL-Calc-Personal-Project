import { defineStore } from 'pinia'
 
export const useDamageSettingsStore = defineStore('damageSettingsStore', {
    state: () => ({
        isTargetDummy: true,
        isAA: false,
        isCrit: false,
        isQ: false,
        isW: false,
        isE: false,
        isR: false,
        totalMagicDamage: 0
    }),
 
    getters: {
 
    },
 
    actions: {
        toggleIsTargetDummy() {
            this.isTargetDummy = !this.isTargetDummy
        },
        toggleAutoAttack() {
            this.isAA = !this.isAA
        },
        toggleCrit() {
            this.isCrit = !this.isCrit
        },
        toggleAbility(type) {
            this[`is${type}`] = !this[`is${type}`];
          }          
    }
})