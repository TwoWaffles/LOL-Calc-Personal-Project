<script>
import DropdownChampions from '../components/dropdownChampions/DropdownChampions.vue';
import DropdownItem from '../components/dropdownChampions/DropdownItem.vue';
import Test from '../components/Test.vue';
import getChampionDataService from '../services/getChampionDataService';

export default {
  data() {
    return {
      bomba: 'bomba',
      champions: ["test123","another123"],
      championOne : null,
    }
  },
  components: {
    Test,
    DropdownChampions,
    DropdownItem
},
  methods: {
    getChampions() {
      //some axios call to get all champions and return them under the variable name champions
      // for loop over the object and return the .name? or whatever to return just the champion names
      //return champions
    },

    testLog(champion){
      console.log(champion + " was just selected") 
      getChampionDataService.getChampionData("Draven")
    .then(response => {
      console.log(response.data)
      this.championsArray = response.data.champions;
    })
    },

    async getChampionData(championKey) {
      this.championOne = await getChampionDataService.getChampionData(championKey);
    }
  }
}
</script>

<template>
  <div class="flex flex-row justify-between px-12 py-8 gap-4 h-screen">
    <div class="px-6 py-4 flex-col bg-blue-600 w-full rounded-2xl">
      <div>
        <DropdownChampions @championSelected="getChampionData"></DropdownChampions>
      </div>
    </div>
    <div class="px-6 py-4 flex-col bg-blue-600 w-full rounded-2xl">

    </div>
    <div class="px-6 py-4 flex-col bg-blue-300 w-full rounded-2xl">

    </div>
    <div class="px-6 py-4 flex-col bg-blue-300 w-full rounded-2xl">

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