<script>
import DropdownChampions from '../components/dropdownChampions/DropdownChampions.vue';
import ChampionDisplay from '../components/ChampionDisplay.vue';
import DropdownLevel from '../components/dropdownChampions/DropdownLevel.vue';
import Test from '../components/Test.vue';
import ItemInventory from '../components/itemPicker/ItemInventory.vue';
import DamageDisplay from '../components/DamageDisplay.vue'
import TargetDummyInput from '../components/TargetDummyInput.vue';
import DamageSettings from '../components/DamageSettings.vue'

import { useChampionOneStore } from '../stores/ChampionOneStore';
import { useDamageSettingsStore } from '../stores/DamageSettingsStore';
import RunePicker from '../components/RunePicker.vue';

export default {
  setup() {
    const championOneStore = useChampionOneStore()
    const DamageSettingsStore = useDamageSettingsStore()

    return { championOneStore, DamageSettingsStore }
  },

  data() {
    return {

    }
  },
  components: {
    DropdownChampions,
    ChampionDisplay,
    DropdownLevel,
    ItemInventory,
    TargetDummyInput,
    DamageDisplay,
    DamageSettings,
    RunePicker
  },
  methods: {}
}
</script>
 <!-- TODO: fix bugs with swapping shit -->
<template>
  <div class="flex flex-row justify-between px-12 py-8 gap-4 w-3/4 mx-auto h-screen">
    <!-- First column -->
    <div class="flex flex-col gap-4 w-1/2">
      <!-- First box -->
      <div class="px-6 py-4 bg-gray-800 w-full rounded-2xl">
        <div class="flex flex-row">
          <DropdownChampions class="w-2/3" :isChampionOne="true"></DropdownChampions>
          <DropdownLevel class="w-1/3" :isChampionOne="true"></DropdownLevel>
        </div>
        <ItemInventory></ItemInventory>
        <ChampionDisplay v-if="!(championOneStore.key === '')" :isChampionOne="true"></ChampionDisplay>
      </div>

      <!-- Second box -->
      <div class="px-6 py-4 bg-gray-800 w-full rounded-2xl">
        <!-- TODO -->
        <!-- if below is true hiden ChampionDisplay and pass prop into damageDisplay to calc from dummy -->
        <!-- else use champion stats, also reset championTwo on toggle off -->
        <DamageSettings></DamageSettings>

        <!-- TODO -->
        <!-- change below v-if to store value for toggle target dummy-->
        <div v-if="!DamageSettingsStore.isTargetDummy">
          <div class="flex flex-row pt-4">
            <DropdownChampions class="w-2/3" :isChampionOne="false"></DropdownChampions>
            <DropdownLevel class="w-1/3" :isChampionOne="false"></DropdownLevel>
          </div>

          <ChampionDisplay v-if="!(championOneStore.key === '')" :isChampionOne="false"></ChampionDisplay>
        </div>
        <!-- TODO -->
        <!-- change below v-if to store value for toggle target dummy-->
        <TargetDummyInput v-if="DamageSettingsStore.isTargetDummy"></TargetDummyInput>

      </div>
    </div>

    <!-- Second column -->
    <div class="flex flex-col gap-4 w-1/2">
      <!-- Third box -->
      <div class="px-6 py-4 bg-gray-800 w-full rounded-2xl">
        <DamageDisplay class="text-white"></DamageDisplay>
      </div>

      <!-- Fourth box -->
      <div class="px-6 py-4 bg-gray-800 w-full rounded-2xl">
        <!-- TODO -->
        <!-- ABILITIES AND RUNES? -->
        <RunePicker :isChampionOne="true"/>
      </div>
    </div>
  </div>
</template>