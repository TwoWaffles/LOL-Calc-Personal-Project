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
        items: {},
        calculatedData: {}

    }),

    getters: {
        computedStats() {

            const newCalculatedStats = {}
            for (const [key, value] of Object.entries(this.stats)) {
                // console.log("did calc")
                const currentStat = key;
                let calculatedStat = 0;

                switch (key) {
                    case "attackSpeed":
                            let attackSpeedRatio = this.stats.attackSpeedRatio.flat / value.flat
                            let bonusAttackSpeed = value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                            //let extraItem = 40 + 3 + 35;
                            var extraItem = 0;
                            for( const [key, value] of Object.entries(this.items)){
                                extraItem =+ value.stats[currentStat].flat
                            }
                            console.log("extra item is: " + extraItem)
                            bonusAttackSpeed = bonusAttackSpeed + extraItem
                            bonusAttackSpeed = bonusAttackSpeed * attackSpeedRatio;
                            calculatedStat = value.flat * (1 + bonusAttackSpeed / 100 )
                        
                        break;

                    default:
                        //Champion natural stats
                        calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                        console.log("getting here")
                        //Adding item
                        // for( const [key, value] of Object.entries(this.items)){
                        //     if()
                        //     console.log("item stat is thing: " + value.stats[currentStat].flat)
                        //     calculatedStat =+ value.stats[currentStat].flat
                        // }
                        

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

            this.calculateStats()


        },

        async getItemData(itemId, itemSlotNumber) {
            const response = await ItemsService.getItemData(itemId);

            console.log(response.data)

            this.items[itemSlotNumber] = response.data

            this.calculateStats()
            
        },

        setLevel(level) {
            this.level = level;
            this.calculateStats()
        },

        calculateStats(){
            console.log("calculating")

            // TODO: add cases for attack speed etc. also items

            for(const [key, value] of Object.entries(this.stats)){
                const calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                this.calculatedData[key] = calculatedStat
            }
        }


    }
})