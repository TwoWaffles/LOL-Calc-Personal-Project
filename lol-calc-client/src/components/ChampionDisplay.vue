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
            <span>{{ championOneStore.computedStats.health}}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/mana_icon.png" class="h-5 w-5 inline-block mr-2">
            <span v-if="championOneStore.resource === 'MANA'" class="">{{ championOneStore.computedStats.mana }}</span>
            <span v-else>{{ championOneStore.resource}}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/attackDamage_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.attackDamage }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/abilityPower_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.abilityPower }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/armor_Icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.armor }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/magicResistance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.magicResistance }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/attackSpeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.attackSpeed }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/abilityHaste_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.abilityHaste }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/criticalStrikeChance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.criticalStrikeChance ?? 0 + "%"}}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/movespeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.movespeed }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/healthRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.healthRegen }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/manaRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.manaRegen }}</span>
        </div>
    </div>
</template>

