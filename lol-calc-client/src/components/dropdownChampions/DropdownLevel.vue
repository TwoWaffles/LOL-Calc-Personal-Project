```<script>
import { useChampionOneStore } from '../../stores/ChampionOneStore'
import { useChampionTargetStore } from '../../stores/ChampionTargetStore'
 
const LEVEL_CAP = 18
export default {
  setup() {
    const championOneStore = useChampionOneStore()
    const championTargetStore = useChampionTargetStore()
 
    return { championOneStore, championTargetStore }
  },
 
  data() {
    return {
      selectedLevel: null,
      isVisible: false,
      LEVEL_CAP: LEVEL_CAP
    }
  },
 
  mounted() {
  },
 
  methods: {
    selectLevel(level) {
      this.selectedLevel = level;
      this.isVisible = false;
      console.log("this level was just selected:" + this.selectedLevel)
      //Emits the champion key from the name,icon,key array
      //this.$emit('levelSelected',this.selectedLevel)
      if (this.isChampionOne) {
        this.championOneStore.setLevel(this.selectedLevel);
      } else {
        this.championTargetStore.setLevel(this.selectedLevel);
      }
    }
  },
 
  props: ['isChampionOne']
 
 
}
</script>
 
<template>
  <section class="relative">
    <div @click="isVisible = !isVisible"
      class="border border-gray-900 bg-gray-500 rounded-md p-2 flex justify-between items-center cursor-pointer h-12">
      <span v-if="selectedLevel" class="text-black-800">
        <div class="flex flex-row items-center">
          <div class="pl-2">{{ selectedLevel }}</div>
        </div>
      </span>
      <span v-else>
        Select A Level
      </span>
      <svg :class="isVisible ? 'ddArrowDown' : 'ddArrowUp'" class="h-4 w-4 text-black" fill="none"
        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M19 9l-7 7-7-7"></path>
      </svg>
    </div>
 
    <div v-show="isVisible" class="absolute z-50 mt-2 py-2 w-full bg-gray-800 rounded-md shadow-lg select-none ...">
 
      <ul class="mt-2 max-h-60 overflow-y-auto">
        <li v-for="level in LEVEL_CAP" class="cursor-pointer py-1 px-3 hover:bg-gray-800 hover:text-white"
          @click="selectLevel(level)">
          <div class="flex flex-row items-center">
            <span class="">{{ level }}</span>
          </div>
        </li>
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
</style>```