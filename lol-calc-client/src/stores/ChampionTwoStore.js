import { defineStore } from 'pinia'
import ChampionsService from '../services/ChampionsService'
import ItemsService from '../services/ItemsService'

export const useChampionTwoStore = defineStore('championTwoStore', {
    state: () => ({
        level: 1,
        key: "",
        resource: "",
        attackType: "",
        stats: {},
        abilities: {},
        items: { slot0: null, slot1: null, slot2: null, slot3: null, slot4: null, slot5: null },
        itemsAdded: false,
        targetHealth: 0,
        targetArmor: 0,
        targetMagicResistance: 0

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
                        let extraItem = 40 + 3 + 35;
                        if (this.itemsAdded === true) {
                            let extraItem = 0;
                            for (const [slotKey, slotValue] of Object.entries(this.items)) {
                                if (slotValue !== null && slotValue.stats[currentStat]) {
                                    extraItem += slotValue.stats[currentStat].flat;
                                }
                            }
                            console.log("extra item is: " + extraItem)
                            bonusAttackSpeed = bonusAttackSpeed + extraItem
                        }

                        bonusAttackSpeed = bonusAttackSpeed * attackSpeedRatio;
                        calculatedStat = value.flat * (1 + bonusAttackSpeed / 100)

                        break;

                    default:
                        //Champion natural stats
                        calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));

                        //TODO: CRIT AND ARMOUR PENETRATION IS AS PERCENT NOT FLAT
                        const PERCENT_STATS = ["criticalStrikeChance","armorPenetration","magicPenetration","lifesteal","omnivamp"]

                        if (this.itemsAdded === true) {
                            for (const [slotKey, slotValue] of Object.entries(this.items)) {
                                //Check if itemSlot is used and if stat exists
                                if (slotValue !== null && slotValue.stats[currentStat]) {
                                    //Check if it is stored as flat or percent
                                    if (PERCENT_STATS.includes(currentStat)) {
                                        calculatedStat += slotValue.stats[currentStat].percent;
                                    } else {
                                        calculatedStat += slotValue.stats[currentStat].flat;
                                    }


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

            this.items["slot" + itemSlotNumber] = response.data

            //TODO: Perhaps add check if they remove all items
            this.itemsAdded = true;


        },

        setLevel(level) {
            this.level = level;
        },

        setTargetHealth(health){
            this.targetHealth = health;
        },

        setTargetArmor(armor){
            this.targetArmor = armor;
        },

        setTargetMagicResistance(magicResistance){
            this.targetMagicResistance = magicResistance;
        }

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