<script>
import { useChampionOneStore } from '../stores/ChampionOneStore'
export default{
    setup() {
    const championOneStore = useChampionOneStore()

    return { championOneStore }
  },
    data() {
        return {}
    },

    methods: {}
}
</script>

<template>
    <div class="grid grid-cols-3 justify-items-center w-1/2 gap-y-4">
        <!-- Slot 0 Row -->
        <input type="radio" class="hidden" value="adapt" name="slot0" id="radio1" v-model="championOneStore.runes.slot0">
        <label class="cursor-pointer max-w-fit group" for="radio1">
        <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png" class="">
        </label>

        <input type="radio" class="hidden" value="as" name="slot0" id="radio2" v-model="championOneStore.runes.slot0">
        <label class="cursor-pointer max-w-fit" for="radio2">
        <img src="/src/assets/runeIcons/attackSpeedRune_icon.png" class="">
        </label>

        <input type="radio" class="hidden" value="ah" name="slot0" id="radio3" v-model="championOneStore.runes.slot0">
        <label class="cursor-pointer max-w-fit" for="radio3">
        <img src="/src/assets/runeIcons/abilityHasteRune_icon.png">
        </label>

        <!-- Slot 1 Row -->
        <input type="radio" class="hidden" value="adapt" name="slot1" id="radio4" v-model="championOneStore.runes.slot1">
        <label class="cursor-pointer max-w-fit" for="radio4">
        <img src="/src/assets/runeIcons/adaptiveForceRune_icon.png">
        </label>

        <input type="radio" class="hidden" value="ar" name="slot1" id="radio5" v-model="championOneStore.runes.slot1">
        <label class="cursor-pointer max-w-fit" for="radio5">
        <img src="/src/assets/runeIcons/armorRune_icon.png">
        </label>

        <input type="radio" class="hidden" value="mr" name="slot1" id="radio6" v-model="championOneStore.runes.slot1">
        <label class="cursor-pointer max-w-fit" for="radio6">
        <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
        </label>

        <!-- Slot 2 Row -->
        <input type="radio" class="hidden" value="h" name="slot2" id="radio7" v-model="championOneStore.runes.slot2">
        <label class="cursor-pointer max-w-fit" for="radio7">
        <img src="/src/assets/runeIcons/healthRune_icon.png">
        </label>

        <input type="radio" class="hidden" value="ar" name="slot2" id="radio8" v-model="championOneStore.runes.slot2">
        <label class="cursor-pointer max-w-fit" for="radio8">
        <img src="/src/assets/runeIcons/armorRune_icon.png">
        </label>

        <input type="radio" class="hidden" value="mr" name="slot2" id="radio9" v-model="championOneStore.runes.slot2">
        <label class="cursor-pointer max-w-fit" for="radio9">
        <img src="/src/assets/runeIcons/magicResistanceRune_icon.png">
        </label>

        <div>Test</div>
    </div>
</template>