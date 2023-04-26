<script>
import { useChampionOneStore } from '../stores/ChampionOneStore'
import { useChampionTwoStore } from '../stores/ChampionTwoStore'
export default {
    setup() {
        const championOneStore = useChampionOneStore();
        const championTwoStore = useChampionTwoStore();

        return { championOneStore, championTwoStore }
    },
    data() {
        return {}
    },
    computed: {

        preMitigationDamage() {
            var autoAttackDamageDealt = 0;
            autoAttackDamageDealt = this.championOneStore.computedStats.attackDamage

            return autoAttackDamageDealt
        },

        postMitigationDamage() {
            var targetArmor = this.championTwoStore.targetArmor;
            var attackerAttackDamage = this.championOneStore.computedStats.attackDamage;

            var mitigatedDamage = attackerAttackDamage * (100 / (100 + targetArmor))

            return mitigatedDamage
        }

    },
    methods: {}
}
</script>
<template>
    <div>
        <h1 class="font-black">Output Damage</h1>
        <div class="flex flex-col">
            <h1 class="font-bold">Pre-Mitigation</h1>
            <div>Physical Damage: {{ preMitigationDamage }}</div>
        </div>
        <div class="flex flex-col">
            <h1 class="font-bold">Post-Mitigation</h1>
            <div>Physical Damage: {{ postMitigationDamage }}</div>
        </div>
    </div>
</template>