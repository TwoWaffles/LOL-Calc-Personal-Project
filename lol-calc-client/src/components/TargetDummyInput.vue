<script>
import { useChampionTwoStore } from '../stores/ChampionTwoStore';

export default {

    setup() {
        const championTwoStore = useChampionTwoStore()
        return { championTwoStore }
    },
    data() {

        return {
            health: this.championTwoStore.targetHealth,
            armor: this.championTwoStore.targetArmor,
            magicResistance: this.championTwoStore.targetMagicResistance,
        };
    },
    methods: {
        updateHealth() {
            if (this.health > 0) {
                this.championTwoStore.setTargetHealth(this.health);
            }
        },
        updateArmor() {
            if (this.armor > 0) {
                this.championTwoStore.setTargetArmor(this.armor);
            }
        },
        updateMagicResistance() {
            if (this.magicResistance > 0) {
                this.championTwoStore.setTargetMagicResistance(this.magicResistance);
            }
        },
    },
};
</script>

<template>
    <div>
        <h1>Character Stats</h1>
        <div>
            <label>Health:</label>
            <input type="number" v-model.number="health" @input="updateHealth" class="block rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
            <label>Armor:</label>
            <input type="number" v-model.number="armor" @input="updateArmor" class="block rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
            <label>Magic Resistance:</label>
            <input type="number" v-model.number="magicResistance" @input="updateMagicResistance" class="block rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
    </div>
</template>
 