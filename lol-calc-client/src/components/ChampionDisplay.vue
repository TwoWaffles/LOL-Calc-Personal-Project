<script>
import { useChampionOneStore } from '../stores/ChampionOneStore';
import { useChampionTargetStore } from '../stores/ChampionTargetStore';
export default {
    setup() {
        const championOneStore = useChampionOneStore();
        const championTargetStore = useChampionTargetStore();

        return { championOneStore, championTargetStore };
    },
    data() {
        return {
        }
    },
    props: {
        isChampionOne: Boolean,
    },
    computed: {
        getStore() {
            return this.isChampionOne ? this.championOneStore : this.championTargetStore;
        },
        percentReductionArmor() {
            return Math.round(
                (this.getStore.computedStats.armor /
                    (this.getStore.computedStats.armor + 100)) *
                100
            );
        },
        percentReductionMr() {
            return Math.round(
                (this.getStore.computedStats.magicResistance /
                    (this.getStore.computedStats.magicResistance + 100)) * 100
            )
        },
        getResource() {
            if (this.getStore.resource === 'MANA') {
                return this.roundNumber(this.getStore.computedStats.mana, 0);
            }
            return this.getStore.resource || 0;
        }
    },
    methods: {
        roundNumber(num, dec) {
            return num ? +(Math.round(num + "e+" + dec) + "e-" + dec) : 0;
        }
    },
};
</script>
 
 
<template>
    <div>
        <table class="w-full bg-gray-900 text-white mt-5 rounded-md">
            <tr>
                <td class="py-2 px-2 w-1/2">
                    <img src="/src/assets/statIcons/health_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ this.roundNumber(getStore.computedStats.health,0) }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/mana_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span> {{ getResource }}</span>
                </td>
            </tr>
            <tr class="bg-gray-700">
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/attackDamage_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ this.roundNumber(getStore.computedStats.attackDamage,1) }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/abilityPower_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ getStore.computedStats.abilityPower ?? 0 }}</span>
                </td>
            </tr>
            <tr>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/armor_Icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ this.roundNumber(getStore.computedStats.armor,0) }} | {{ percentReductionArmor ? percentReductionArmor + "%" : 0
                    }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/magicResistance_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ this.roundNumber(getStore.computedStats.magicResistance,0) }} | {{ percentReductionMr ? percentReductionMr + "%" :
                        0
                    }}</span>
                </td>
            </tr>
            <tr class="bg-gray-700">
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/attackSpeed_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ this.roundNumber(getStore.computedStats.attackSpeed,3) }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/abilityHaste_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ getStore.computedStats.abilityHaste ?? 0 }}</span>
                </td>
            </tr>
            <tr>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/criticalStrikeChance_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ (getStore.computedStats.criticalStrikeChance ?? 0) + "%" }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/movespeed_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ getStore.computedStats.movespeed ?? 0 }}</span>
                </td>
            </tr>
            <tr class="bg-gray-700">
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/healthRegen_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ this.roundNumber(getStore.computedStats.healthRegen,1) }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/manaRegen_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ this.roundNumber(getStore.computedStats.manaRegen,1) }}</span>
                </td>
            </tr>
            <tr>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/armorPenetration_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ getStore.computedStats.lethality ?? 0 }} | {{ (getStore.computedStats.armorPenetration ?? 0) +
                        "%" }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/magicPenetration_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span> {{ getStore.computedStats.flatMagicPenetration ?? 0 }} | {{
                        (getStore.computedStats.magicPenetration ?? 0) + "%" }}</span>
                </td>
            </tr>
            <tr class="bg-gray-700">
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/lifesteal_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ (getStore.computedStats.lifesteal ?? 0) + "%" }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/omnivamp_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ (getStore.computedStats.omnivamp ?? 0) + "%" }}</span>
                </td>
            </tr>
            <tr>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/attackRange_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ getStore.computedStats.attackRange ?? 0 }}</span>
                </td>
                <td class="py-2 px-2">
                    <img src="/src/assets/statIcons/tenacity_icon.png" class="h-5 w-5 inline-block mr-2">
                    <span>{{ getStore.computedStats.tenacity ?? 0 }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>