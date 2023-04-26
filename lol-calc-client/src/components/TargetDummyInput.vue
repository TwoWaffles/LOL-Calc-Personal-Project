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
            <input type="number" v-model.number="health" @input="updateHealth" />
        </div>
        <div>
            <label>Armor:</label>
            <input type="number" v-model.number="armor" @input="updateArmor" />
        </div>
        <div>
            <label>Magic Resistance:</label>
            <input type="number" v-model.number="magicResistance" @input="updateMagicResistance" />
        </div>
    </div>
</template>
 