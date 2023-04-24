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
            <span>{{ championOneStore.calculatedData.health}}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/mana_icon.png" class="h-5 w-5 inline-block mr-2">
            <span v-if="championOneStore.resource === 'MANA'" class="">{{ championOneStore.calculatedData.mana }}</span>
            <span v-else>{{ championOneStore.resource}}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/attackDamage_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.attackDamage }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/abilityPower_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.abilityPower }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/armor_Icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.armor }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/magicResistance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.magicResistance }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/attackSpeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.attackSpeed }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/abilityHaste_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.abilityHaste }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/criticalStrikeChance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.criticalStrikeChance ?? 0 + "%"}}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/movespeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.movespeed }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/healthRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.healthRegen }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/manaRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.calculatedData.manaRegen }}</span>
        </div>
    </div>
</template>

