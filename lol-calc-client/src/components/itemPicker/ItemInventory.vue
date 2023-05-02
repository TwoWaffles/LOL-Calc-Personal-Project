<script>
import ItemsService from '../../services/ItemsService';
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';
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
            searchQuery1: '',
            selectedItemSlot: null,
            isVisible: false,
            itemsArray: [],
            inventoryArray: [null, null, null, null, null, null]
        }
    },
    props: {
        isChampionOne: Boolean
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

            if (this.isChampionOne) {
                this.championOneStore.getItemData(item[0], this.selectedItemSlot);
            }
            else {
                this.championTargetStore.getItemData(item[0], this.selectedItemSlot);
            }

            this.selectedItemSlot = null;
        }
    }
}
</script>
 
<template>
    <div>
        <div class="flex flex-row justify-between mt-2 mx-auto text-white bg-gray-900 py-2 px-2 rounded-tl-xl rounded-tr-xl rounded-bl-xl">
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

        <div class="bg-gray-900 px-2 text-center rounded-b-lg text-white float-right">Gold Cost: {{ this.isChampionOne ? this.championOneStore.buildCost : this.championTargetStore.buildCost}}</div>
        <div class="relative">
            <div class="p-4">
                <div v-show="isVisible" class="absolute inset-0">
                    <div>
                        <input v-model="searchQuery1" type="text" class="block w-full rounded-md shadow-sm p-2 mb-2"
                            placeholder="Search for an item" />
                    </div>
                    <div
                        class="flex bg-gray-500 rounded-md border-yellow-500 border-2 justify-center max-h-64 overflow-y-auto overflow-x-clip scrollbar-hide">
                        <div class="grid grid-cols-6 gap-2 pt-2">
                            <div v-for="(item, index) in filteredItems" :key="`item-${index}`" class="single-item group">
                                <popper trigger="hover"
                                    :options="{ placement: 'top', modifiers: { offset: { offset: '0,10px' } } }">
                                    <div class="popper bg-gray-700 text-white text-xs rounded pointer-events-none">
                                        {{ item[1] }}
                                    </div>
                                    <img slot="reference" @click="selectItem(item)" :src="item[2]"
                                        class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-500" />
                                </popper>
                            </div>
                        </div>
                    </div>
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

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>