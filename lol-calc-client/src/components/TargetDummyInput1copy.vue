<script>
import { useChampionTargetStore } from '../stores/ChampionTargetStore';
export default {
    setup() {
        const championTargetStore = useChampionTargetStore()
        return { championTargetStore }
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
                this.championTargetStore.setTargetHealth(this.health)
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

