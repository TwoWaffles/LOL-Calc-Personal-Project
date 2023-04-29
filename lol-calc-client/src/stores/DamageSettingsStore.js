import { defineStore } from 'pinia'
 
export const useDamageSettingsStore = defineStore('damageSettingsStore', {
    state: () => ({
        isTargetDummy: true,
        isAA: false,
        isCrit: false,
        isQ: false,
        isW: false,
        isE: false,
        isR: false
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
            const abilities = ['Q', 'W', 'E', 'R'];
            for (const ability of abilities) {
              if (ability !== type) {
                this[`is${ability}`] = false;
              }
            }
            this[`is${type}`] = !this[`is${type}`];
          }          
    }
})