<script>
export default {
  data() {
    return {
        searchQuery: '',
        selectedItemSlot: null,
        isVisible: false,
        itemsArray: []
    }
  },

  computed: {
  },

  mounted() {
  },

  methods: {
  },


}
</script>

<template>
    <div>
        <div class="flex flex-row justify-between mt-2">
            <div @click="isVisible = !isVisible; selectedItemSlot = 0" class="single-item-empty">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
            <div @click="isVisible = !isVisible; selectedItemSlot = 1" class="single-item-empty">
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
            <div class="single-item-empty">
                <font-awesome-icon icon="fa-solid fa-plus" size="2xs" />
            </div>
        </div>

        <div v-show="isVisible" class="border mt-2">
            <div class="grid grid-cols-6 gap-2">
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
                <div class="single-item">
                    <img src="https://raw.communitydragon.org/13.6/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/1001_class_t1_bootsofspeed.png" class="border-2 border-gray-700 rounded h-14 w-14 hover:border-yellow-700">
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>

</style>