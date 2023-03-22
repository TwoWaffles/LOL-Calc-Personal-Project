<script>
    export default {
        data() {
            return {
                
            }
        },

        props: ['stats','level'],

        methods: {
            calculateStat(stat){
                //Calculation from https://leagueoflegends.fandom.com/wiki/Champion_statistic
                const calculatedStat = stat.flat + stat.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                return Math.ceil(calculatedStat)
            }
        }
        
    }
</script>


<template>
    <div class="grid grid-cols-2 bg-gray-900 text-white mt-5">
        <div class="hover:bg-gray-700">Health: {{calculateStat(stats.health)}}</div>
        <div class="hover:bg-gray-700">Mana: 120</div>
        <div class="hover:bg-gray-700">A</div>
        <div class="hover:bg-gray-700">A</div>
    </div>

</template>


<style scoped>

</style>