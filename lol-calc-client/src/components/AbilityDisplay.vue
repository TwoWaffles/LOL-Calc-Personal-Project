<script>
import { useChampionOneStore } from '../stores/ChampionOneStore';

export default {
    setup() {
        const championOneStore = useChampionOneStore();

        return { championOneStore };
    },
    data() {
        return {
            currentAbility: "P"
        };
    },
    computed: {
        getAbilitiesIcons() {
            return this.championOneStore.abilities;
        },
        getAbilities() {
            return this.championOneStore.abilities[this.currentAbility]
        }
    }
}
</script>

<template>
    <div>
        <!-- Ability Row -->
        <div class="flex flex-row justify-center pb-2">

            <input type="radio" class="hidden peer/p1" value="P" name="abilities" id="abilityP" v-model="currentAbility">
            <label class="cursor-pointer border-transparent border-2 peer-checked/p1:border-yellow-500" for="abilityP">
                <img :src="getAbilitiesIcons.P[0].icon">
            </label>

            <input type="radio" class="hidden peer/q1" value="Q" name="abilities" id="abilityQ" v-model="currentAbility">
            <label class="cursor-pointer border-transparent border-2 peer-checked/q1:border-yellow-500" for="abilityQ">
                <img :src="getAbilitiesIcons.Q[0].icon">
            </label>

            <input type="radio" class="hidden peer/w1" value="W" name="abilities" id="abilityW" v-model="currentAbility">
            <label class="cursor-pointer border-transparent border-2 peer-checked/w1:border-yellow-500" for="abilityW">
                <img :src="getAbilitiesIcons.W[0].icon">
            </label>

            <input type="radio" class="hidden peer/e1" value="E" name="abilities" id="abilityE" v-model="currentAbility">
            <label class="cursor-pointer border-transparent border-2 peer-checked/e1:border-yellow-500" for="abilityE">
                <img :src="getAbilitiesIcons.E[0].icon">
            </label>

            <input type="radio" class="hidden peer/r1" value="R" name="abilities" id="abilityR" v-model="currentAbility">
            <label class="cursor-pointer border-transparent border-2 peer-checked/r1:border-yellow-500" for="abilityR">
                <img :src="getAbilitiesIcons.R[0].icon">
            </label>
        </div>

        <div class="px-2 relative">
            <div class="absolute w-full">
                <ul class="">
                    <li v-for="(effect, index) in getAbilities[0].effects" :key="getAbilities[0].effects.description"
                        :class="index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-700'" class="text-white text-sm p-1">
                        {{ effect.description }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>