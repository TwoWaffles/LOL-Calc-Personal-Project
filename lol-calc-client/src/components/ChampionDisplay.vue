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
    <div class="grid grid-cols-2 bg-gray-900 text-white mt-5 p-1 rounded-md">
        <div class="">
            <img src="/src/assets/statIcons/health_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.health}}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/mana_icon.png" class="h-5 w-5 inline-block mr-2">
            <span v-if="championOneStore.resource === 'MANA'" class="">{{ championOneStore.computedStats.mana }}</span>
            <span v-else>{{ championOneStore.resource}}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/attackDamage_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.attackDamage }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/abilityPower_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.abilityPower }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/armor_Icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.armor }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/magicResistance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.magicResistance }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/attackSpeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.attackSpeed }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/abilityHaste_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.abilityHaste }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/criticalStrikeChance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ (championOneStore.computedStats.criticalStrikeChance ?? 0) + "%"}}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/movespeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.movespeed }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/healthRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.healthRegen }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/manaRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.manaRegen }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/armorPenetration_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.lethality + "|" + championOneStore.computedStats.armorPenetration + "%" }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/magicPenetration_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ "todo" + "|" + championOneStore.computedStats.magicPenetration + "%" }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/lifesteal_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.lifesteal + "%" }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/omnivamp_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.omnivamp + "%" }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/attackRange_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.attackRange }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/tenacity_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ championOneStore.computedStats.tenacity }}</span>
        </div>
    </div>
</template>

