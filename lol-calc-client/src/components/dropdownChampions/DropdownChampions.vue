<script>
import getAllChampionNamesService from '../../services/getAllChampionNamesService';
export default {
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
      this.$emit('championSelected',this.selectedChampion)
    }
  },

  props: ['champions']


}
</script>


<template>
  <section class = "ddWrapper">
    <div @click="isVisible = !isVisible" class="selectedItem">
      <span v-if="selectedChampion"> {{ selectedChampion[0] }} </span>
      <span v-else> Select A Champion</span>
      <svg :class="isVisible ? 'ddArrowDown' : 'ddArrowUp'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"/></svg>
    </div>

    <div v-show = "isVisible" class="ddPopover">
      <input v-model="searchQuery" type="text" placeholder="Search For A Champion">
      <span v-if="filteredChampions.length === 0">Couldn't Find Champion</span>
      <div class="championsToSelect">
        <ul>
          <li @click="selectChampion(champion)" v-for="(champion , index) in filteredChampions" :key="`champion-${index}`" >
            <img :src="champion[1]">
            {{ champion[0] }}
          </li>
        </ul>
      </div>
    </div>

  </section>
</template>

<style scoped>

.ddWrapper {
  max-width: 350px;
  position: relative;
  margin: 0 auto;
}

.selectedItem {
  height: 40px;
  border: 2px solid lightgray;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
}

.ddPopover {
  position: absolute;
  border: 2px solid lightgray;
  top: 46px;
  left: 0px;
  right: 0px;
  background-color: white;
  width: 100%;
  max-width: 100%;
  padding: 10px;
}

.ddArrowDown {
  transform: rotate(180deg);
  transition: all .5s ease;
}

.ddArrowUp {
  transform: rotate(0deg);
  transition: all .5s ease;
}

input {
  width: 90%;
  height: 30px;
  border: 2px solid lightgray;
  font-size: 16px;
  padding-left: 5px;
}

.championsToSelect {
  width: 100%;
}

.championsToSelect ul {
  list-style: none;
  text-align: left;
  padding-left: 8px;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
  border: 1xp solid lightgray;
}

.championsToSelect li {
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  background-color: #f1f1f1;
  cursor: pointer;
  font-size: 16px;
}

.championsToSelect li:hover{
  background: darkgray;
  font-weight: bold;
}

</style>
