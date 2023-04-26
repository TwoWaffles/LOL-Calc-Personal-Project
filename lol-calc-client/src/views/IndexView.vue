<script>
import DropdownChampions from '../components/dropdownChampions/DropdownChampions.vue';
import ChampionDisplay from '../components/ChampionDisplay.vue';
import DropdownLevel from '../components/dropdownChampions/DropdownLevel.vue';
import Test from '../components/Test.vue';
import ItemInventory from '../components/itemPicker/ItemInventory.vue';
import DamageDisplay from '../components/DamageDisplay.vue'
import TargetDummyInput from '../components/TargetDummyInput.vue';

import { useChampionOneStore } from '../stores/ChampionOneStore';

export default {
  setup() {
    const championOneStore = useChampionOneStore()

    return { championOneStore }
  },

  data() {
    return {

    }
  },
  components: {
    Test,
    DropdownChampions,
    ChampionDisplay,
    DropdownLevel,
    ItemInventory,
    TargetDummyInput,
    DamageDisplay
  },
  methods: {}
}
</script>

<template>
  <div class="flex flex-row justify-between px-12 py-8 gap-4 h-screen">
    <div class="px-6 py-4 flex-col bg-blue-600 w-full rounded-2xl">
      <div class="flex flex-row">
        <DropdownChampions class="w-2/3" :isChampionOne="true"></DropdownChampions>
        <DropdownLevel class="w-1/3" :isChampionOne="true"></DropdownLevel>
      </div>
      <ItemInventory></ItemInventory>
      <ChampionDisplay></ChampionDisplay>
    </div>
    <div class="px-6 py-4 flex-col bg-blue-600 w-full rounded-2xl">
      <div class="flex flex-row">
        <DropdownChampions class="w-2/3" :isChampionOne="false"></DropdownChampions>
        <DropdownLevel class="w-1/3" :isChampionOne="false"></DropdownLevel>
      </div>
      <TargetDummyInput></TargetDummyInput>
    </div>
    <div class="px-6 py-4 flex-col bg-blue-300 w-full rounded-2xl">

    </div>
    <div class="px-6 py-4 flex-col bg-blue-300 w-full rounded-2xl">
      <DamageDisplay></DamageDisplay>
    </div>
  </div>
</template>


  // <!-- <div>
  //    <h1>{{ champions }}</h1>
  //    <h1 class="text-3xl font-bold underline">
  //    Hello world!
  //    </h1>
  //    <h2>{{ bomba }}</h2>
  //    <Test test123="bigxd"></Test>
  //    <DropdownChampions @championSelected="getChampionData"></DropdownChampions>
  //  </div> -->