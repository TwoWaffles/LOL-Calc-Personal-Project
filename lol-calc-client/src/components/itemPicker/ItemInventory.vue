<script>
import ItemsService from '../../services/ItemsService';

export default {
  data() {
    return {
        searchQuery: '',
        selectedItemSlot: null,
        isVisible: false,
        itemsArray: [],
        inventoryArray: []
    }
  },

  computed: {
    filteredItems(){
        const query = this.searchQuery.toLowerCase()
        if(this.searchQuery = ""){
            return this.itemsArray;
        }

        return this.itemsArray.filter((item) => {
            const name = item[1].toLowerCase();
            return name.startsWith(query);
        });
    }
  },

  mounted() {
    ItemsService.getAllItemNamesAndInfo().then(response => {
        console.log(response.data);
        this.itemsArray = response.data.items
    })
  },

  methods: {
    inventorySlotOnClick(slotNumber){
        if(this.selectedItemSlot === slotNumber){
            this.isVisible = !this.isVisible;
            this.selectedItemSlot = null;
            return;
        }

        if(this.selectedItemSlot === null){
            this.isVisible = !this.isVisible;
        }
        
        this.selectedItemSlot = slotNumber;
        console.log("Item slot " + slotNumber + " has been selected")
    }
  },


}
</script>

<template>
    <div>
        <div class="flex flex-row justify-between mt-2">
            <div @click="inventorySlotOnClick(0)" class="single-item-empty" :class="[selectedItemSlot === 0 ? 'border-solid' : 'bg-blue']">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
            <div @click="inventorySlotOnClick(1)" class="single-item-empty" :class="[selectedItemSlot === 1 ? 'border-solid' : 'bg-blue']">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
            <div @click="inventorySlotOnClick(2)" class="single-item-empty" :class="selectedItemSlot === 2 ? 'border-solid' : 'bg-blue'">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
            <div class="single-item-empty">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
            <div class="single-item-empty">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
            <div class="single-item-empty">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
        </div>

        <div v-show="isVisible" class="border mt-2">
            <div class="relative">
                <input v-model="searchQuery" type="text" class="block w-full rounded-md border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for an item">
            </div>
            <div class="grid grid-cols-6 gap-2">
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
                <div v-for="(item, index) in filteredItems" :key="`item-${index}`">
                    <img :src="item[2]" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>

</style>