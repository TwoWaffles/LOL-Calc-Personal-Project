<script>
import { useChampionTargetStore } from '../stores/ChampionTargetStore';
 
export default {
 
    setup() {
        const championTargetStore = useChampionTargetStore()
        return { championTargetStore }
    },
    data() {
 
        return {
            health: this.championTargetStore.targetDummyHealth,
            armor: this.championTargetStore.targetDummyArmor,
            magicResistance: this.championTargetStore.targetDummyMagicResistance,
        };
    },
    methods: {
        updateHealth() {
            if (this.health > 0) {
                this.championTargetStore.setTargetDummyHealth(this.health);
            }
        },
        updateArmor() {
            if (this.armor > 0) {
                this.championTargetStore.setTargetDummyArmor(this.armor);
            }
        },
        updateMagicResistance() {
            if (this.magicResistance > 0) {
                this.championTargetStore.setTargetDummyMagicResistance(this.magicResistance);
            }
        },
    },
};
</script>
 
<template>
    <div>
        <h2 class="text-white text-2xl bg-gray-900 py-2 px-4 mb-4 rounded-xl text-center font-bold">Target Dummy Stats</h2>
        <div class="w-full bg-gray-900 text-white mt-5 rounded-xl p-4">
            <div>
                <label class="pb-2 font-bold">Health:</label>
                <input type="number" v-model.number="health" @input="updateHealth"
                    class="w-full block rounded-md border-gray-300 bg-gray-500 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label class="pb-2 font-bold">Armor:</label>
                <input type="number" v-model.number="armor" @input="updateArmor"
                    class="w-full block rounded-md border-gray-300 bg-gray-500 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
                <label class="pb-2 font-bold">Magic Resistance:</label>
                <input type="number" v-model.number="magicResistance" @input="updateMagicResistance"
                    class="w-full block rounded-md border-gray-300 bg-gray-500 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
        </div>
    </div></template>