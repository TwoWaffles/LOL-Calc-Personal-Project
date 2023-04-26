<script>
import { useChampionOneStore } from '../stores/ChampionOneStore'
import { useChampionTwoStore } from '../stores/ChampionTwoStore'
export default {
    setup() {
        const championOneStore = useChampionOneStore();
        const championTwoStore = useChampionTwoStore();

        return { championOneStore, championTwoStore }
    },
    data() {
        return {

        }
    },
    computed: {

    },

    methods: {}

}
</script>


<template>
    <div>
        <h1>Output Damage</h1>
        <div class="flex flex-col">
            <h1>Pre-Mitigation</h1>
            <div>Test</div>
        </div>
        <div class="flex flex-col">
            <h1>Post-Mitigation</h1>
            <div>Test2</div>
        </div>
    </div>
</template>