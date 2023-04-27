<script>
import ChampionsService from '../../services/ChampionsService';
import { useChampionOneStore } from '../../stores/ChampionOneStore';
import { useChampionTargetStore } from '../../stores/ChampionTargetStore';
export default {
  setup() {
    const championOneStore = useChampionOneStore()
    const championTargetStore = useChampionTargetStore()
    return { championOneStore, championTargetStore }
  },

  data() {
    return {
      searchQuery: '',
      selectedChampion: null,
      isVisible: false,
      championsArray: []
    }
  },

  computed: {
    filteredChampions() {
      const query = this.searchQuery.toLowerCase()
      if (this.searchQuery === "") {
        return this.championsArray;
      }
      // return this.championsArray.filter((champion) => {
      //   return champion[0].toLowerCase().includes(query)
      // })

      return this.championsArray.filter((champion) => {
        const name = champion[0].toLowerCase();
        return name.startsWith(query);
      });
    }
  },

  mounted() {
    //This receives name,icon,key
    ChampionsService.getAllChampionNamesAndIcons()
      .then(response => {
        console.log(response.data)
        this.championsArray = response.data.champions;
      })
  },

  methods: {
    selectChampion(champion) {
      this.selectedChampion = champion;
      this.isVisible = false;
      console.log("this was just select:" + this.selectedChampion)

      if (this.isChampionOne) {
        this.championOneStore.getChampionData(this.selectedChampion[2])
      } else {
        this.championTargetStore.getChampionData(this.selectedChampion[2])
      }
    }
  },

  props: {
    isChampionOne: Boolean
  }

}
</script>
 
<template>
  <section class="relative">
    <div @click="isVisible = !isVisible"
      class="border border-gray-900 bg-gray-500 rounded-md p-2 flex justify-between items-center cursor-pointer h-12">
      <!-- <span class="text-black-800">{{ selectedChampion ? selectedChampion[0] && selectedChampion[1] : 'Select a Champion' }}</span> -->
      <span v-if="selectedChampion" class="text-black-800">
        <div class="flex flex-row items-center">
          <img :src="selectedChampion[1]" class="h-8 w-8 rounded-full">
          <div class="pl-2">{{ selectedChampion[0] }}</div>
        </div>
      </span>
      <span v-else>
        Select A Champion
      </span>
      <svg :class="isVisible ? 'ddArrowDown' : 'ddArrowUp'" class="h-4 w-4 text-black" fill="none"
        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>

    <div v-show="isVisible" class="absolute z-50 mt-2 py-2 w-full bg-blue-200 rounded-md shadow-lg select-none ...">
      <div class="relative">
        <input v-model="searchQuery" type="text"
          class="block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for a Champion">
      </div>

      <ul class="mt-2 max-h-60 overflow-y-auto">
        <li v-for="(champion, index) in filteredChampions" :key="`champion-${index}`"
          class="cursor-pointer py-1 px-3 hover:bg-blue-500 hover:text-white" @click="selectChampion(champion)">
          <div class="flex flex-row items-center">
            <img :src="champion[1]" class="h-7 w-7 inline-block mr-2 rounded-full">
            <span class="">{{ champion[0] }}</span>
          </div>
        </li>

        <li v-if="filteredChampions.length === 0" class="px-3 py-2">Couldn't find a Champion</li>
      </ul>
    </div>

  </section>
</template>
 
<style scoped>
.ddArrowDown {
  transform: rotate(180deg);
  transition: all .5s ease;
}

.ddArrowUp {
  transform: rotate(0deg);
  transition: all .5s ease;
}
</style>