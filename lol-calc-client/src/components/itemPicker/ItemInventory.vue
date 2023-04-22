 
 
<script>
import ItemsService from '../../services/ItemsService';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
 
 
export default {
    data() {
        return {
            searchQuery1: '',
            selectedItemSlot: null,
            isVisible: false,
            itemsArray: [],
            inventoryArray: [null, null, null, null, null, null],
            hoverIndex: -1,
        }
    },
    computed: {
        filteredItems() {
            const query = this.searchQuery1.toLowerCase()
            if (this.searchQuery = "") {
                return this.itemsArray;
            }
 
            return this.itemsArray.filter((item) => {
                const name = item[1].toLowerCase();
                return name.includes(query);
            });
        }
    },
    components: {
        'popper': Popper
    },
    mounted() {
        ItemsService.getAllItemNamesAndInfo().then(response => {
            console.log(response.data);
            this.itemsArray = response.data.items
        })
    },
    methods: {
        inventorySlotOnClick(slotNumber) {
            if (this.selectedItemSlot === slotNumber) {
                this.isVisible = !this.isVisible;
                this.selectedItemSlot = null;
                return;
            }
 
            if (this.selectedItemSlot === null) {
                this.isVisible = !this.isVisible;
            }
 
            this.selectedItemSlot = slotNumber;
            console.log("Item slot " + slotNumber + " has been selected")
        },
        selectItem(item) {
            this.inventoryArray[this.selectedItemSlot] = item;
            this.isVisible = false;
            console.log("Added " + item[1] + " to inventory slot " + this.selectedItemSlot);
            this.selectedItemSlot = null;
            //this.store get item
        }
    }
}
</script>
 
<template>
    <div>
        <div class="flex flex-row justify-between mt-2">
            <div @click="inventorySlotOnClick(0)" class="single-item-empty"
                :class="{ 'border-solid border-yellow-500': selectedItemSlot === 0 }">
                <font-awesome-icon v-if="inventoryArray[0] === null" icon="fa-solid fa-plus" size="2xs" />
                <img v-else :src="inventoryArray[0][2]">
            </div>
            <div @click="inventorySlotOnClick(1)" class="single-item-empty"
                :class="{ 'border-solid border-yellow-500': selectedItemSlot === 1 }">
                <font-awesome-icon v-if="inventoryArray[1] === null" icon="fa-solid fa-plus" size="2xs" />
                <img v-else :src="inventoryArray[1][2]">
            </div>
            <div @click="inventorySlotOnClick(2)" class="single-item-empty"
                :class="{ 'border-solid border-yellow-500': selectedItemSlot === 2 }">
                <font-awesome-icon v-if="inventoryArray[2] === null" icon="fa-solid fa-plus" size="2xs" />
                <img v-else :src="inventoryArray[2][2]">
            </div>
            <div @click="inventorySlotOnClick(3)" class="single-item-empty"
                :class="{ 'border-solid border-yellow-500': selectedItemSlot === 3 }">
                <font-awesome-icon v-if="inventoryArray[3] === null" icon="fa-solid fa-plus" size="2xs" />
                <img v-else :src="inventoryArray[3][2]">
            </div>
            <div @click="inventorySlotOnClick(4)" class="single-item-empty"
                :class="{ 'border-solid border-yellow-500': selectedItemSlot === 4 }">
                <font-awesome-icon v-if="inventoryArray[4] === null" icon="fa-solid fa-plus" size="2xs" />
                <img v-else :src="inventoryArray[4][2]">
            </div>
            <div @click="inventorySlotOnClick(5)" class="single-item-empty"
                :class="{ 'border-solid border-yellow-500': selectedItemSlot === 5 }">
                <font-awesome-icon v-if="inventoryArray[5] === null" icon="fa-solid fa-plus" size="2xs" />
                <img v-else :src="inventoryArray[5][2]">
            </div>
        </div>
 
        <div v-show="isVisible" class="border mt-2">
            <div class="relative">
                <input v-model="searchQuery1" type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm p-2 mb-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search for an item" />
            </div>
            <div class="grid grid-cols-6 gap-2 max-h-96 overflow-y-auto overflow-x-clip">
                <div v-for="(item, index) in filteredItems" :key="`item-${index}`" class="single-item group relative">
                <popper trigger="hover" :options="{ placement: 'top', modifiers: { offset: { offset: '0,10px' } } }">
                    <div class="popper bg-gray-700 text-white text-xs rounded p-1 pointer-events-none">
                    {{ item[1] }}
                    </div>
                    
                    <img slot="reference" @click="selectItem(item)" :src="item[2]"
                        class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-500" />
                </popper>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style scoped>
.tooltip {
    transition: opacity 0.1s ease-in-out;
    z-index: 10000;
}
 
</style>
 
