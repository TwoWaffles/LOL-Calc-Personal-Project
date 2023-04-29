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

            //Calculating Armor Pen and Lethality
            var attackerPercentArmorPen = (this.championOneStore.computedStats.armorPenetration / 100);
            var attackerLethality = this.championOneStore.computedStats.lethality;
            var attackerLevel = this.championOneStore.level;
            //Formula For Lethality From: https://leagueoflegends.fandom.com/wiki/Armor_penetration
            var attackerFlatArmorPen = attackerLethality * (0.6 + 0.4 * attackerLevel / 18)
            //Applying Armor entration
            targetArmor = targetArmor * (1 - attackerPercentArmorPen);

            if (attackerFlatArmorPen > 0) {
                if (targetArmor - attackerFlatArmorPen < 0) {
                    targetArmor = 0;
                } else {
                    targetArmor = targetArmor - attackerFlatArmorPen
                }
            }

            var attackerAttackDamage = this.championOneStore.computedStats.attackDamage;

            var mitigatedDamage = attackerAttackDamage * (100 / (100 + targetArmor))

            if (this.damageSettingsStore.isCrit) {
                mitigatedDamage = (mitigatedDamage * 1.75) //TODO Infinity Edge
            }

            return Math.round(mitigatedDamage)
        },
        calculateArmorPen() {

        }

    },
    methods: {}
}
</script>
<template>
    <div>
        <table class="w-full rounded-mb">
            <thead>
                <tr class="bg-gray-900">
                    <th class="font-bold p-2">Pre-Mitigation</th>
                    <th class="font-bold p-2">Post-Mitigation</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-gray-700">
                    <td class="p-2">Physical Damage: {{ preMitigationDamage }}</td>
                    <td class="p-2">Physical Damage: {{ postMitigationDamage }}</td>
                </tr>
                <tr class="bg-gray-900">
                    <td class="p-2">Magical Damage: 0</td>
                    <td class="p-2">Magical Damage: 0</td>
                </tr>
                <tr class="bg-gray-700">
                    <td class="p-2">Total Damage: {{ preMitigationDamage }}</td>
                    <td class="p-2">Total Damage: {{ postMitigationDamage }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>