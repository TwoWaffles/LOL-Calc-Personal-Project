<script>
import { useChampionOneStore } from '../stores/ChampionOneStore'
import { useChampionTwoStore } from '../stores/ChampionTwoStore'
export default {
    setup() {
        const championOneStore = useChampionOneStore()
        const championTwoStore = useChampionTwoStore()

        return { championOneStore, championTwoStore }
    },
    data() {
        return {}
    },
    props: {
    isChampionOne: Boolean,
  },
  computed: {
    getStore() {
      return this.isChampionOne ? this.championOneStore : this.championTwoStore;
    }
  },

    methods: {}
}
</script>

<template>
    <div class="grid grid-cols-3 justify-items-center w-1/2 gap-y-4">

        <!-- Slot 0 Row -->
        <input type="radio" class="hidden peer/afr1" value="adapt" name="slot0" id="radio1"
            v-model="championOneStore.runes.slot0">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/afr1:border-white" for="radio1">
            <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png">
        </label>

        <input type="radio" class="hidden peer/asr" value="as" name="slot0" id="radio2" v-model="championOneStore.runes.slot0">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/asr:border-white" for="radio2">
            <img src="/src/assets/runeIcons/attackSpeedRune_icon.png">
        </label>

        <input type="radio" class="hidden peer/ahr" value="ah" name="slot0" id="radio3" v-model="championOneStore.runes.slot0">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/ahr:border-white" for="radio3">
            <img src="/src/assets/runeIcons/abilityHasteRune_icon.png">
        </label>

        <!-- Slot 1 Row -->
        <input type="radio" class="hidden peer/afr2" value="adapt" name="slot1" id="radio4"
            v-model="championOneStore.runes.slot1">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/afr2:border-white" for="radio4">
            <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png">
        </label>

        <input type="radio" class="hidden peer/arr1" value="ar" name="slot1" id="radio5" v-model="championOneStore.runes.slot1">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/arr1:border-white" for="radio5">
            <img src="/src/assets/runeIcons/armorRune_icon.png">
        </label>

        <input type="radio" class="hidden peer/mrr1" value="mr" name="slot1" id="radio6" v-model="championOneStore.runes.slot1">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/mrr1:border-white" for="radio6">
            <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
        </label>

        <!-- Slot 2 Row -->
        <input type="radio" class="hidden peer/hr" value="h" name="slot2" id="radio7" v-model="championOneStore.runes.slot2">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/hr:border-white" for="radio7">
            <img src="/src/assets/runeIcons/healthRune_icon.png">
        </label>

        <input type="radio" class="hidden peer/arr2" value="ar" name="slot2" id="radio8" v-model="championOneStore.runes.slot2">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/arr2:border-white" for="radio8">
            <img src="/src/assets/runeIcons/armorRune_icon.png">
        </label>

        <input type="radio" class="hidden peer/mrr2" value="mr" name="slot2" id="radio9" v-model="championOneStore.runes.slot2">
        <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/mrr2:border-white" for="radio9">
            <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
        </label>
    </div>
</template>