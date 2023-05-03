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

    methods: {
        roundNumber(num, dec) {
            return num ? +(Math.round(num + "e+" + dec) + "e-" + dec) : 0;
        }
    },
    computed: {
        getTargetStats() {
            if (this.damageSettingsStore.isTargetDummy) {
                return {
                    health: this.championTargetStore.targetDummyHealth,
                    armor: this.championTargetStore.targetDummyArmor,
                    magicResistance: this.championTargetStore.targetDummyMagicResistance
                }
            } else {
                return {
                    health: this.championTargetStore.computedStats.health,
                    armor: this.championTargetStore.computedStats.armor,
                    magicResistance: this.championTargetStore.computedStats.magicResistance
                }
            }
        },
        preMitigationAttackDamage() {
            var autoAttackDamageDealt = 0;
            autoAttackDamageDealt = this.championOneStore.computedStats.attackDamage

            if (autoAttackDamageDealt) {
                if (this.damageSettingsStore.isCrit) {
                    if (typeof this.championOneStore.nonMythicPassives.Perfection !== "undefined" && this.championOneStore.computedStats.criticalStrikeChance >= 40) {
                        console.log("crit IE")
                        autoAttackDamageDealt = Math.ceil(autoAttackDamageDealt * 2.1)
                    } else {
                        autoAttackDamageDealt = Math.ceil(autoAttackDamageDealt * 1.75)
                    }
                }

                return this.roundNumber(autoAttackDamageDealt, 0)
            }
            return 0
        },
        preMitigationMagicDamage() {
            this.damageSettingsStore.totalMagicDamage = 0
            if (typeof this.championOneStore.nonMythicPassives.Sharpshooter !== "undefined") {
                this.damageSettingsStore.totalMagicDamage += 120;
            }

            if (typeof this.championOneStore.nonMythicPassives.Paralyze !== "undefined") {
                this.damageSettingsStore.totalMagicDamage += 120;
            }

            if (typeof this.championOneStore.nonMythicPassives.Jolt !== "undefined") {
                this.damageSettingsStore.totalMagicDamage += 80;
            }
            return this.damageSettingsStore.totalMagicDamage
        },

        postMitigationMagicDamage() {
            var targetMr = this.getTargetStats.magicResistance

            var attackerMagicPenetration = (this.championOneStore.computedStats.magicPenetration / 100);
            var attackerFlatMagicPenetration = this.championOneStore.computedStats.flatMagicPenetration

            targetMr = targetMr * (1 - attackerMagicPenetration);

            if (attackerFlatMagicPenetration > 0) {
                if ((targetMr - attackerFlatMagicPenetration) < 0) {
                    targetMr = 0
                } else {
                    targetMr = targetMr - attackerFlatMagicPenetration
                }
            }

            let mitigatedDamage = 0
            //console.log(mitigatedDamage)
            console.log(targetMr)
            mitigatedDamage = this.damageSettingsStore.totalMagicDamage * (100 / (100 + targetMr))
            //console.log(mitigatedDamage)
            return this.roundNumber(mitigatedDamage,0)


        },
        postMitigationAttackDamage() {
            // var targetArmor = this.championTargetStore.targetDummyArmor;
            var targetArmor = this.getTargetStats.armor

            //Calculating Armor Pen and Lethality
            var attackerPercentArmorPen = (this.championOneStore.computedStats.armorPenetration / 100);
            var attackerLethality = this.championOneStore.computedStats.lethality;
            var attackerLevel = this.championOneStore.level;
            //Formula For Lethality From: https://leagueoflegends.fandom.com/wiki/Armor_penetration
            var attackerFlatArmorPen = attackerLethality * (0.6 + 0.4 * attackerLevel / 18)
            //Applying Armor entration
            targetArmor = targetArmor * (1 - attackerPercentArmorPen);

            if (attackerFlatArmorPen > 0) {
                if ((targetArmor - attackerFlatArmorPen) < 0) {
                    targetArmor = 0;
                } else {
                    targetArmor = targetArmor - attackerFlatArmorPen
                }
            }

            var attackerAttackDamage = this.championOneStore.computedStats.attackDamage;

            if (attackerAttackDamage) {
                var mitigatedDamage = attackerAttackDamage * (100 / (100 + targetArmor))

                if (this.damageSettingsStore.isCrit) {
                    if (typeof this.championOneStore.nonMythicPassives.Perfection !== "undefined" && this.championOneStore.computedStats.criticalStrikeChance >= 40) {
                        mitigatedDamage = (mitigatedDamage * 2.1)
                    } else {
                        mitigatedDamage = (mitigatedDamage * 1.75)
                    }
                }

                return Math.round(mitigatedDamage)
            }

            return 0
        }

    },
}
</script>
<template>
    <div>
        <table class="w-full rounded-xl">
            <thead>
                <tr class="bg-gray-900">
                    <th class="font-bold p-2">Pre-Mitigation</th>
                    <th class="font-bold p-2">Post-Mitigation</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-gray-700">
                    <td class="p-2">Physical Damage: {{ preMitigationAttackDamage }}</td>
                    <td class="p-2">Physical Damage: {{ postMitigationAttackDamage }}</td>
                </tr>
                <tr class="bg-gray-900">
                    <td class="p-2">Magical Damage: {{ preMitigationMagicDamage }}</td>
                    <td class="p-2">Magical Damage: {{ postMitigationMagicDamage }}</td>
                </tr>
                <tr class="bg-gray-700">
                    <td class="p-2">Total Damage: {{ preMitigationAttackDamage + preMitigationMagicDamage }}</td>
                    <td class="p-2">Total Damage: {{ postMitigationAttackDamage + postMitigationMagicDamage }}</td>
                </tr>
            </tbody>
        </table>

        <div class="bg-gray-900 mt-4 p-2 text-center rounded-xl">Health Remaining: {{ this.roundNumber((this.getTargetStats.health -
            (postMitigationAttackDamage + postMitigationMagicDamage)),0) }} | {{ (((this.getTargetStats.health -
        (postMitigationAttackDamage + postMitigationMagicDamage)) / this.getTargetStats.health) * 100).toFixed(2) }}%
        </div>
    </div>
</template>