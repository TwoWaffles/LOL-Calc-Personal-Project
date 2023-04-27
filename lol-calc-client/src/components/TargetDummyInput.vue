<script>
import { useChampionTargetStore } from '../stores/ChampionTargetStore';

export default {

    setup() {
        const championTargetStore = useChampionTargetStore()
        return { championTargetStore }
    },
    data() {

        return {
            health: this.championTargetStore.targetHealth,
            armor: this.championTargetStore.targetArmor,
            magicResistance: this.championTargetStore.targetMagicResistance,
        };
    },
    methods: {
        updateHealth() {
            if (this.health > 0) {
                this.championTargetStore.setTargetHealth(this.health);
            }
        },
        updateArmor() {
            if (this.armor > 0) {
                this.championTargetStore.setTargetArmor(this.armor);
            }
        },
        updateMagicResistance() {
            if (this.magicResistance > 0) {
                this.championTargetStore.setTargetMagicResistance(this.magicResistance);
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
 