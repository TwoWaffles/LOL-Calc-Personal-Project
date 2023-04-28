<script>
import { useChampionOneStore } from '../stores/ChampionOneStore';
import { useChampionTargetStore } from '../stores/ChampionTargetStore';
import { useDamageSettingsStore } from '../stores/DamageSettingsStore';
 
export default {
    setup() {
        const championOneStore = useChampionOneStore();
        const championTargetStore = useChampionTargetStore();
        const damageSettingsStore = useDamageSettingsStore();
 
        return { championOneStore, championTargetStore, damageSettingsStore }
    },
    data() {
        return {}
    },
    computed: {
        preMitigationDamage() {
            var autoAttackDamageDealt = 0;
            autoAttackDamageDealt = this.championOneStore.computedStats.attackDamage

        if (this.damageSettingsStore.isCrit) {
                autoAttackDamageDealt = Math.ceil(autoAttackDamageDealt * 1.75)
            }
 
            return autoAttackDamageDealt
        },
        postMitigationDamage() {
            var targetArmor = this.championTargetStore.targetArmor;
            var attackerAttackDamage = this.championOneStore.computedStats.attackDamage;
            var mitigatedDamage = attackerAttackDamage * (100 / (100 + targetArmor))
 
            if (this.damageSettingsStore.isCrit) {
                mitigatedDamage = (mitigatedDamage * 1.75) //TODO Infinity Edge
            }
 
            return Math.round(mitigatedDamage)
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
            <div>Magical Damage: 0</div>
            <div>Total Damage {{ preMitigationDamage }}</div>
        </div>
        <div class="flex flex-col">
            <h1 class="font-bold">Post-Mitigation</h1>
            <div>Physical Damage: {{ postMitigationDamage }}</div>
            <div>Magical Damage: 0</div>
            <div>Total Damage: {{ postMitigationDamage }}</div>
        </div>
    </div>
</template>