<script>
import getAllChampionNamesService from '../../services/getAllChampionNamesService';
export default {
  data() {
    return {
        searchQuery: '',
        selectedChampion: null,
        isVisible: false,
        itemsArray: []
    }
  },

  computed: {
    filteredChampions() {
      const query = this.searchQuery.toLowerCase()
      if(this.searchQuery === ""){
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
    getAllChampionNamesService.getAllChampionNamesAndIcons()
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
      //Emits the champion key from the name,icon,key array
      this.$emit('championSelected',this.selectedChampion[2])
    }
  },

  props: ['champions']


}
</script>

<template>
</template>

<style scoped>

</style>