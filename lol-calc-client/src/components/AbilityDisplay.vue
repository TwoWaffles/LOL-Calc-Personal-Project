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
            <img :src="getAbilities.P[0].icon" class="w-10 h-10">
        </div>
    </div>
</template>