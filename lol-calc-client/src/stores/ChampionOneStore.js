import { defineStore } from 'pinia'
import ChampionsService from '../services/ChampionsService'
import ItemsService from '../services/ItemsService'

export const useChampionOneStore = defineStore('championOneStore', {
    state: () => ({
        level: 1,
        key: "",
        resource: "",
        attackType: "",
        adaptiveType: "",
        stats: {},
        abilities: {},
        items: { slot0: null, slot1: null, slot2: null, slot3: null, slot4: null, slot5: null },
        runeValues: { "adaptiveForce": { "attackDamage": 5.4, "abilityPower": 9 }, "attackSpeed": 10, "abilityHaste": 8, "armor": 6, "magicResistance": 8, "health": 0 },
        runes: { slot0: null, slot1: null, slot2: null },
        itemsAdded: false

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
                        var attackSpeedRatio = this.stats.attackSpeedRatio.flat / value.flat
                        let bonusAttackSpeed = value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                        //let extraItem = 40 + 3 + 35;
                        if (this.itemsAdded === true) {
                            let extraItem = 0;
                            for (const [slotKey, slotValue] of Object.entries(this.items)) {
                                if (slotValue !== null && slotValue.stats[currentStat]) {
                                    extraItem += slotValue.stats[currentStat].flat;
                                }
                            }
                            bonusAttackSpeed += extraItem
                        }
                        bonusAttackSpeed = bonusAttackSpeed * attackSpeedRatio;
                        calculatedStat = value.flat * (1 + bonusAttackSpeed / 100)
                        break;

                    default:
                        //calculating Champion natural stats
                        calculatedStat = value.flat + value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                        //For bonus AD calculation
                        var baseStat = calculatedStat;

                        //TODO: CRIT AND ARMOUR PENETRATION IS AS PERCENT NOT FLAT
                        const PERCENT_STATS = [
                            "criticalStrikeChance",
                            "armorPenetration",
                            "magicPenetration",
                            "lifesteal",
                            "omnivamp"
                        ]

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
                //Calculating Bonus AD stat
                if (currentStat === "attackDamage") {
                    newCalculatedStats.bonusAttackDamage = calculatedStat - baseStat;
                }
                newCalculatedStats[key] = calculatedStat
            }

            //Rune calculations
            for (const [slotKey, slotValue] of Object.entries(this.runes)) {
                switch (slotValue) {
                    case "adaptiveForce":
                        let bonusAD = newCalculatedStats.bonusAttackDamage;
                        let ap = newCalculatedStats.abilityPower;
                        //If values are the same, then adaptiveForce gained is based on the champion
                        if (bonusAD === ap) {
                            if (this.adaptiveType === "PHYSICAL_DAMAGE") {
                                newCalculatedStats.attackDamage += this.runeValues.adaptiveForce.attackDamage;
                                //The rune also counts as bonus AD after this calculation
                                //newCalculatedStats.bonusAttackDamage =+ this.runeValues.adaptiveForce.attackDamage
                            } else {
                                newCalculatedStats.abilityPower += this.runeValues.adaptiveForce.abilityPower;
                            }

                        } else if (bonusAD > ap) {
                            newCalculatedStats.attackDamage += this.runeValues.adaptiveForce.attackDamage;
                            //The rune also counts as bonus AD after this calculation
                            //newCalculatedStats.bonusAttackDamage =+ this.runeValues.adaptiveForce.attackDamage
                        } else {
                            newCalculatedStats.abilityPower += this.runeValues.adaptiveForce.abilityPower;
                        }
                        break;
                    case "health":
                        //Formula from: https://leagueoflegends.fandom.com/wiki/Rune_(League_of_Legends)
                        let addedHealth = 15 + 125 / 17 * (this.level - 1);
                        //console.log("Health added is: " + addedHealth)
                        newCalculatedStats.health += addedHealth;
                        break;
                    case "attackSpeed":
                        //TODO: Better variable names
                        let runeValueToBeAdded = attackSpeedRatio * 10
                        let ratioToBeAdded = this.stats.attackSpeed.flat * (runeValueToBeAdded / 100);
                        newCalculatedStats.attackSpeed += ratioToBeAdded
                        break;
                    default:
                        let addedValue = this.runeValues[slotValue];
                        newCalculatedStats[slotValue] += addedValue;

                }
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

        setRune(slot, value) {
            this.runes[slot] = value
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