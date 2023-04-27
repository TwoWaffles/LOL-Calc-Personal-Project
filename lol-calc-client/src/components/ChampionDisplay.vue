<script>
import { useChampionOneStore } from '../stores/ChampionOneStore';
import { useChampionTwoStore } from '../stores/ChampionTwoStore';
 
const STATS_TO_DISPLAY = ["attackDamage", "abilityPower", "armor", "magicResistance", "attackSpeed", "abilityHaste", "criticalStrikeChance", "movespeed", "healthRegen", "manaRegen"];
export default {
  setup() {
    const championOneStore = useChampionOneStore();
    const championTwoStore = useChampionTwoStore();
 
    return { championOneStore, championTwoStore };
  },
  data() {
    return {
      STATS_TO_DISPLAY: STATS_TO_DISPLAY
    };
  },
  props: {
    isChampionOne: Boolean,
  },
  computed: {
    getStore() {
      return this.isChampionOne ? this.championOneStore : this.championTwoStore;
    },
    percentReductionArmor() {
      return Math.round(
        (this.getStore.computedStats.armor /
          (this.getStore.computedStats.armor + 100)) *
          100
      );
    },
  },
  methods: {},
};
</script>
 
 
<template>
    <div class="grid grid-cols-2 bg-gray-900 text-white mt-5 p-1 rounded-md">
        <div class="">
            <img src="/src/assets/statIcons/health_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.health}}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/mana_icon.png" class="h-5 w-5 inline-block mr-2">
            <span v-if="getStore.resource === 'MANA'" class="">{{ getStore.computedStats.mana }}</span>
            <span v-else>{{ getStore.resource}}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/attackDamage_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.attackDamage }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/abilityPower_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.abilityPower }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/armor_Icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.armor + "|" + percentReductionArmor + "%"}}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/magicResistance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.magicResistance }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/attackSpeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.attackSpeed }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/abilityHaste_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.abilityHaste }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/criticalStrikeChance_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ (getStore.computedStats.criticalStrikeChance ?? 0) + "%"}}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/movespeed_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.movespeed }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/healthRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.healthRegen }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/manaRegen_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.manaRegen }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/armorPenetration_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.lethality + "|" + this.getStore.computedStats.armorPenetration + "%" }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/magicPenetration_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ "todo" + "|" + this.getStore.computedStats.magicPenetration + "%" }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/lifesteal_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.lifesteal + "%" }}</span>
        </div>
        <div class="bg-gray-700">
            <img src="/src/assets/statIcons/omnivamp_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.omnivamp + "%" }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/attackRange_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.attackRange }}</span>
        </div>
        <div class="">
            <img src="/src/assets/statIcons/tenacity_icon.png" class="h-5 w-5 inline-block mr-2">
            <span>{{ getStore.computedStats.tenacity }}</span>
        </div>
    </div>
</template>