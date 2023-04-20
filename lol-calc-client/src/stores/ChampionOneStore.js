import { defineStore } from 'pinia'
import { set } from 'vue';
import getChampionDataService from '../services/getChampionDataService';

export const useChampionOneStore = defineStore('championOneStore', {
    state: () => ({
        calculatedStats: {},
        level: 1,
        key: "",
        resource: "",
        attackType: "",
        stats: {},
        abilities: {},
        items: []

    }),

    getters: {},

    actions: {
        async getChampionData(championKey) {
            const response = await getChampionDataService.getChampionData(championKey);
            //console.log(response.data);

            for(const [key, value] of Object.entries(response.data)){
                this[key] = value
            }
            this.calculateStats()

            
        },

        setLevel(level){
            this.level = level;
            this.calculateStats()
        },

        calculateStats(){
            console.log("calculating")

            // TODO: add cases for attack speed etc. also items
            
            for(const [key, value] of Object.entries(this.stats)){
                const calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                set(this.calculatedStats, key, calculatedStat);
            }
        }


    }
})