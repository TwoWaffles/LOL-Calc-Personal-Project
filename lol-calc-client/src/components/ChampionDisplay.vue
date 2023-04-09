<script>
const STATS_TO_DISPLAY = ["attackDamage","abilityPower","armor","magicResistance","attackSpeed","abilityHaste","criticalStrikeChance","movespeed","healthRegen","manaRegen"];
    export default {
        data() {
            return {
                STATS_TO_DISPLAY: STATS_TO_DISPLAY
            }
        },

        props: ['stats','level','resource'],

        methods: {
            calculateStat(stat){
                //Calculation from https://leagueoflegends.fandom.com/wiki/Champion_statistic
                const calculatedStat = stat.flat + stat.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                // return Math.ceil(calculatedStat)
                // TODO: handle attack speed differently I guess
                // if(stat === "attackSpeed"){}
                return calculatedStat
            }
        }
        
    }
</script>


<template>
    <div class="grid grid-cols-2 bg-gray-900 text-white mt-5">
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/health_icon.png" class="h-5 w-5 inline-block mr-2">
            <span class="">{{ calculateStat(stats.health) }}</span>
        </div>
        <div class="hover:bg-gray-700">
            <img src="/src/assets/statIcons/mana_icon.png" class="h-5 w-5 inline-block mr-2">
            <span v-if="resource === 'MANA'" class="">{{ calculateStat(stats.mana) }}</span>
            <!-- TODO: Make this display pretty text or something -->
            <span v-else>{{ resource }}</span>
        </div>
        <div class="hover:bg-gray-700" v-for="stat in STATS_TO_DISPLAY">
            <img :src="`/src/assets/statIcons/${stat}_icon.png`" class="h-5 w-5 inline-block mr-2">
            <span class="">{{ calculateStat(stats[stat]) }}</span>
        </div>
    </div>

</template>


<style scoped>

</style>