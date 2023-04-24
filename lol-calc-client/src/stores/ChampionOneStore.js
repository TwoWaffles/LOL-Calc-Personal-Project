import { defineStore } from 'pinia'
import ChampionsService from '../services/ChampionsService'
import ItemsService from '../services/ItemsService'

export const useChampionOneStore = defineStore('championOneStore', {
    state: () => ({
        level: 1,
        key: "",
        resource: "",
        attackType: "",
        stats: {},
        abilities: {},
        items: {}

    }),

    getters: {
        computedStats() {
            const newCalculatedStats = {}
            for (const [key, value] of Object.entries(this.stats)) {
                console.log("did calc")
                let calculatedStat = 0;

                switch (key) {
                    case "attackSpeed":
                            let attackSpeedRatio = this.stats.attackSpeedRatio.flat / value.flat
                            let bonusAttackSpeed = value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                            //let extraItem = 40 + 3 + 35;
                            //bonusAttackSpeed = bonusAttackSpeed + extraItem
                            bonusAttackSpeed = bonusAttackSpeed * attackSpeedRatio;
                            calculatedStat = value.flat * (1 + bonusAttackSpeed / 100 )
                        
                        break;

                    default:
                        calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));

                }
                newCalculatedStats[key] = calculatedStat
            }
            return newCalculatedStats
        }
    },

    actions: {
        async getChampionData(championKey) {
            const response = await ChampionsService.getChampionData(championKey);
            //console.log(response.data);

            for (const [key, value] of Object.entries(response.data)) {
                this[key] = value
            }


        },

        async getItemData(itemId, itemSlotNumber) {
            const response = await ItemsService.getItemData(itemId);

            console.log(response.data)

            this.items[itemSlotNumber] = response.data
            
        },

        setLevel(level) {
            this.level = level;
        },

        // calculateStats(){
        //     console.log("calculating")

        //     // TODO: add cases for attack speed etc. also items

        //     for(const [key, value] of Object.entries(this.stats)){
        //         const calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
        //         set(this.calculatedStats, key, calculatedStat);
        //     }
        // }


    }
})