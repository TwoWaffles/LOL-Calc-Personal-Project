<script>
import { useChampionTwoStore } from '../stores/ChampionTwoStore';
export default {
    setup() {
        const championTwoStore = useChampionTwoStore()
        return { championTwoStore }
    },

    data() {
        return {
            health: 1

        }
    },

    methods: {
        //maybe put all 3 set values together
        handleSubmit() {
            if(this.health > 0){
                this.championTwoStore.setTargetHealth(this.health)
            }
        }
    },

    props: []


}
</script>


<template>
    <form @submit.prevent="handleSubmit">
        <input type="number" placeholder="Enter health" v-model="health">

        <button>Set</button>


    </form>
</template>

