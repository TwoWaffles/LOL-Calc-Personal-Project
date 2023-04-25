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
        items: {slot0: null, slot1: null, slot2: null, slot3: null, slot4: null, slot5: null},
        itemsAdded : false

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
                    //     if(this.itemsAdded === true){
                    //     var extraItem = 0;
                    //     for (const [key, value] of Object.entries(this.items)) {
                    //         console.log("trying to add: " +value.stats[currentStat].flat )
                    //         extraItem = + value.stats[currentStat].flat
                    //     }
                    //     console.log("extra item is: " + extraItem)
                    //     bonusAttackSpeed = bonusAttackSpeed + extraItem
                    // }

                        bonusAttackSpeed = bonusAttackSpeed * attackSpeedRatio;
                        calculatedStat = value.flat * (1 + bonusAttackSpeed / 100)

                        break;

                    default:
                        //Champion natural stats
                        calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));

                        // if(this.itemsAdded === true){
                        // calculatedStat += this.items.slot0.stats.attackDamage.flat
                        // }

                        //TODO: CRIT AND ARMOUR PENETRATION IS AS PERCENT NOT FLAT

                        if (this.itemsAdded === true) {
                            for (const [slotKey, slotValue] of Object.entries(this.items)) {
                                if (slotValue !== null && slotValue.stats[currentStat]) {
                                    calculatedStat += slotValue.stats[currentStat].flat;
                                }
                            }
                        }


                }
                newCalculatedStats[key] = calculatedStat
            }
            return newCalculatedStats
        },

        // computedItemStats() {

        //     return this.items;
        // }
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

            console.log("Adding this to the store: " + response.data.name)

            this.items["slot"+itemSlotNumber] = response.data


            //TODO: Perhaps add check if they remove all items
            this.itemsAdded = true;


        },

        setLevel(level) {
            this.level = level;
        },

        // calculateStats(){
        //     console.log("calculating")

        //     // TODO: add cases for attack speed etc. also items

        //     for(const [key, value] of Object.entries(this.stats)){
        //         const calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
        //         this.calculatedData[key] = calculatedStat
        //     }
        // }


    }
})