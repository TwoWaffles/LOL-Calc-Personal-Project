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
        <div class="grid grid-cols-3 bg-gray-900 py-4 px-4 rounded-xl justify-items-center w-full gap-y-4 mx-auto">
 
            <!-- Slot 0 Row -->
            <input type="radio" class="hidden peer/afr1" value="adaptiveForce" :name="isChampionOne ? 'slot0' : 'slot0-2'" :id="isChampionOne ? 'radio1' : 'radio1-2'"
                v-model="getStore.runes.slot0" @click="resetRune('slot0')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/afr1:border-white"
                :for="isChampionOne ? 'radio1' : 'radio1-2'">
                <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png">
            </label>
 
            <input type="radio" class="hidden peer/asr" value="attackSpeed" :name="isChampionOne ? 'slot0' : 'slot0-2'" :id="isChampionOne ? 'radio2' : 'radio2-2'" v-model="getStore.runes.slot0"
                @click="resetRune('slot0')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/asr:border-white"
                :for="isChampionOne ? 'radio2' : 'radio2-2'">
                <img src="/src/assets/runeIcons/attackSpeedRune_icon.png">
            </label>
 
            <input type="radio" class="hidden peer/ahr" value="abilityHaste" :name="isChampionOne ? 'slot0' : 'slot0-2'" :id="isChampionOne ? 'radio3' : 'radio3-2'" v-model="getStore.runes.slot0"
                @click="resetRune('slot0')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/ahr:border-white"
                :for="isChampionOne ? 'radio3' : 'radio3-2'">
                <img src="/src/assets/runeIcons/abilityHasteRune_icon.png">
            </label>
 
            <!-- Slot 1 Row -->
            <input type="radio" class="hidden peer/afr2" value="adaptiveForce" :name="isChampionOne ? 'slot1' : 'slot1-2'" :id="isChampionOne ? 'radio4' : 'radio4-2'"
                v-model="getStore.runes.slot1" @click="resetRune('slot1')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/afr2:border-white"
                :for="isChampionOne ? 'radio4' : 'radio4-2'">
                <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png">
            </label>
 
            <input type="radio" class="hidden peer/arr1" value="armor" :name="isChampionOne ? 'slot1' : 'slot1-2'" :id="isChampionOne ? 'radio5' : 'radio5-2'" v-model="getStore.runes.slot1"
                @click="resetRune('slot1')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/arr1:border-white"
                :for="isChampionOne ? 'radio5' : 'radio5-2'">
                <img src="/src/assets/runeIcons/armorRune_icon.png">
            </label>
 
            <input type="radio" class="hidden peer/mrr1" value="magicResistance" :name="isChampionOne ? 'slot1' : 'slot1-2'" :id="isChampionOne ? 'radio6' : 'radio6-2'" v-model="getStore.runes.slot1"
                @click="resetRune('slot1')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/mrr1:border-white"
                :for="isChampionOne ? 'radio6' : 'radio6-2'">
                <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
            </label>
 
            <!-- Slot 2 Row -->
            <input type="radio" class="hidden peer/hr" value="health" :name="isChampionOne ? 'slot2' : 'slot2-2'" :id="isChampionOne ? 'radio7' : 'radio7-2'" v-model="getStore.runes.slot2"
                @click="resetRune('slot2')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/hr:border-white"
                :for="isChampionOne ? 'radio7' : 'radio7-2'">
                <img src="/src/assets/runeIcons/healthRune_icon.png">
            </label>
 
            <input type="radio" class="hidden peer/arr2" value="armor" :name="isChampionOne ? 'slot2' : 'slot2-2'" :id="isChampionOne ? 'radio8' : 'radio8-2'" v-model="getStore.runes.slot2"
                @click="resetRune('slot2')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/arr2:border-white"
                :for="isChampionOne ? 'radio8' : 'radio8-2'">
                <img src="/src/assets/runeIcons/armorRune_icon.png">
            </label>
 
            <input type="radio" class="hidden peer/mrr2" value="magicResistance" :name="isChampionOne ? 'slot2' : 'slot2-2'" :id="isChampionOne ? 'radio9' : 'radio9-2'" v-model="getStore.runes.slot2"
                @click="resetRune('slot2')">
            <label class="cursor-pointer border-transparent border-[3px] rounded-full peer-checked/mrr2:border-white"
                :for="isChampionOne ? 'radio9' : 'radio9-2'">
                <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
            </label>
 
        </div>
    </div>
</template>