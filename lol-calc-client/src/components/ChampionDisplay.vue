<script>
import { useChampionOneStore } from '../stores/ChampionOneStore';

const STATS_TO_DISPLAY = ["attackDamage", "abilityPower", "armor", "magicResistance", "attackSpeed", "abilityHaste", "criticalStrikeChance", "movespeed", "healthRegen", "manaRegen"];
export default {
    setup() {
    const championOneStore = useChampionOneStore()

    return { championOneStore }
  },
    data() {
        return {
            STATS_TO_DISPLAY: STATS_TO_DISPLAY
        }
    },

    methods: {}

}
</script>


<template>
    <div class="grid grid-cols-2 bg-gray-900 text-white mt-5">
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/health_icon.png" class="h-5 w-5 inline-block mr-2">
            <span class="">{{ championOneStore.calculatedStats.health }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/mana_icon.png" class="h-5 w-5 inline-block mr-2">
            <span v-if="championOneStore.resource === 'MANA'" class="">{{ championOneStore.calculatedStats.mana }}</span>
            <span v-else>{{ championOneStore.resource }}</span>
        </div>
        <div class="hover:bg-gray-700" v-for="stat in STATS_TO_DISPLAY">
            <img :src="`/src/assets/statIcons/${stat}_icon.png`" class="h-5 w-5 inline-block mr-2">
            <span class="">{{ championOneStore.calculatedStats[stat] }}</span>
        </div>
    </div>
</template>

