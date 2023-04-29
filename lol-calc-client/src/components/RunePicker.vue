<script>
import { useChampionOneStore } from '../stores/ChampionOneStore'
import { useChampionTargetStore } from '../stores/ChampionTargetStore'
export default {
    setup() {
        const championOneStore = useChampionOneStore()
        const championTargetStore = useChampionTargetStore()

        return { championOneStore, championTargetStore }
    },
    data() {
        return {}
    },
    props: {
        isChampionOne: Boolean,
    },
    computed: {
        getStore() {
            return this.isChampionOne ? this.championOneStore : this.championTargetStore;
        }
    },

    methods: {
        resetRune(slot) {
            if (this.getStore.runes[slot] !== null) {
                this.getStore.runes[slot] = null;
            }
        }
    }
}
</script>

<template>
    <div>
        <h2 class="text-white text-2xl bg-gray-900 py-2 px-4 mb-4 rounded-xl text-center font-bold pb-4">Runes</h2>
        <div class="grid grid-cols-3 bg-gray-900 py-4 px-4 rounded-xl justify-items-center w-full gap-y-4 mx-auto">

            <!-- Slot 0 Row -->
            <input type="radio" class="hidden peer/afr1" value="adaptiveForce" name="slot0" id="radio1"
                v-model="getStore.runes.slot0" @click="resetRune('slot0')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/afr1:border-white"
                for="radio1">
                <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png">
            </label>

            <input type="radio" class="hidden peer/asr" value="attackSpeed" name="slot0" id="radio2" v-model="getStore.runes.slot0"
                @click="resetRune('slot0')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/asr:border-white"
                for="radio2">
                <img src="/src/assets/runeIcons/attackSpeedRune_icon.png">
            </label>

            <input type="radio" class="hidden peer/ahr" value="abilityHaste" name="slot0" id="radio3" v-model="getStore.runes.slot0"
                @click="resetRune('slot0')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/ahr:border-white"
                for="radio3">
                <img src="/src/assets/runeIcons/abilityHasteRune_icon.png">
            </label>

            <!-- Slot 1 Row -->
            <input type="radio" class="hidden peer/afr2" value="adaptiveForce" name="slot1" id="radio4"
                v-model="getStore.runes.slot1" @click="resetRune('slot1')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/afr2:border-white"
                for="radio4">
                <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png">
            </label>

            <input type="radio" class="hidden peer/arr1" value="armor" name="slot1" id="radio5" v-model="getStore.runes.slot1"
                @click="resetRune('slot1')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/arr1:border-white"
                for="radio5">
                <img src="/src/assets/runeIcons/armorRune_icon.png">
            </label>

            <input type="radio" class="hidden peer/mrr1" value="magicResistance" name="slot1" id="radio6" v-model="getStore.runes.slot1"
                @click="resetRune('slot1')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/mrr1:border-white"
                for="radio6">
                <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
            </label>

            <!-- Slot 2 Row -->
            <input type="radio" class="hidden peer/hr" value="health" name="slot2" id="radio7" v-model="getStore.runes.slot2"
                @click="resetRune('slot2')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/hr:border-white"
                for="radio7">
                <img src="/src/assets/runeIcons/healthRune_icon.png">
            </label>

            <input type="radio" class="hidden peer/arr2" value="armor" name="slot2" id="radio8" v-model="getStore.runes.slot2"
                @click="resetRune('slot2')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/arr2:border-white"
                for="radio8">
                <img src="/src/assets/runeIcons/armorRune_icon.png">
            </label>

            <input type="radio" class="hidden peer/mrr2" value="magicResistance" name="slot2" id="radio9" v-model="getStore.runes.slot2"
                @click="resetRune('slot2')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/mrr2:border-white"
                for="radio9">
                <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
            </label>

        </div>
    </div>
</template>