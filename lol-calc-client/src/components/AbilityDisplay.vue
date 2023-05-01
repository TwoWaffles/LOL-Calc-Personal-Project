<script>
import { useChampionOneStore } from '../stores/ChampionOneStore';

export default {
    setup() {
        const championOneStore = useChampionOneStore();

        return { championOneStore };
    },
    data() {
        return {};
    },
    computed: {
        getAbilities() {
            return this.championOneStore.abilities;
        },
    }
}
</script>

<template>
    <div class="flex col border-2">

        <!-- Passive -->
        <div>
            <h2 class="text-white text-md text-center font-bold">Q: {{
                getAbilities.P[0].name }}</h2>
            <img :src="getAbilities.P[0].icon" class="w-10 h-10">
            <ul>
                <li v-for="effect in getAbilities.P[0].effects" :key="getAbilities.P[0].effects.description" class="text-white text-xs border">
                {{ effect.description }}
                </li>
            </ul>

        </div>
    </div>
</template>