<script>
import { useChampionTwoStore } from '../stores/ChampionTwoStore';

export default {

    setup() {
        const championTwoStore = useChampionTwoStore()
        return { championTwoStore }
    },
    data() {

        return {
            health: championTwoStore.targetHealth,
            armor: championTwoStore.targetArmor,
            magicResistance: championTwoStore.targetMagicResistance,
        };
    },
    methods: {
        updateHealth() {
            if (this.health > 0) {
                this.championTwoStore.setTargetHealth(this.health);
            }
        },
        updateArmor() {
            this.championTwoStore.setTargetArmor(this.armor);
        },
        updateMagicResistance() {
            this.championTwoStore.setTargetMagicResistance(this.magicResistance);
        },
    },
};
</script>

<template>
    <div>
        <h1>Character Stats</h1>
        <div>
            <label for="health">Health:</label>
            <input type="number" id="health" v-model.number="health" @input="updateHealth" min="0" />
        </div>
        <div>
            <label for="armor">Armor:</label>
            <input type="number" id="armor" v-model.number="armor" @input="updateArmor" />
        </div>
        <div>
            <label for="magicResistance">Magic Resistance:</label>
            <input type="number" id="magicResistance" v-model.number="magicResistance" @input="updateMagicResistance" />
        </div>
    </div>
</template>
 