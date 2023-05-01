import { defineStore } from 'pinia';
import ChampionsService from '../services/ChampionsService';
import ItemsService from '../services/ItemsService';

const PERCENT_STATS = [
    'criticalStrikeChance',
    'armorPenetration',
    'magicPenetration',
    'lifesteal',
    'omnivamp',
    'healthRegen',
    'manaRegen'
];

function calculateStat(value, level) {
    return (
        value.flat +
        value.perLevel * (level - 1) * (0.7025 + 0.0175 * (level - 1))
    );
}

function isPercentStat(stat) {
    return PERCENT_STATS.includes(stat);
}

export const useChampionTargetStore = defineStore('championTargetStore', {
    state: () => ({
        level: 1,
        key: '',
        resource: '',
        attackType: '',
        adaptiveType: '',
        stats: {},
        abilities: {},
        items: {
            slot0: null,
            slot1: null,
            slot2: null,
            slot3: null,
            slot4: null,
            slot5: null,
        },
        runeValues: {
            adaptiveForce: { attackDamage: 5.4, abilityPower: 9 },
            attackSpeed: 10,
            abilityHaste: 8,
            armor: 6,
            magicResistance: 8,
            health: 0,
        },
        runes: { slot0: null, slot1: null, slot2: null },
        itemsAdded: false,
        mythicAdded: false,
        mythicValue: {},
        amountOfLegendaries: 0,
        buildCost: 0,
        nonMythicPassives: { name: "passiveEffect" },
        targetDummyHealth: 100,
        targetDummyArmor: 0,
        targetDummyMagicResistance: 0

    }),

    getters: {
        computedStats() {
            const newCalculatedStats = this.calculateStatsWithItems();
            if (this.key !== "") {
                this.applyRunes(newCalculatedStats);
            }
            return newCalculatedStats;
        },
    },

    actions: {

        async getChampionData(championKey) {
            const response = await ChampionsService.getChampionData(championKey);
            for (const [key, value] of Object.entries(response.data)) {
                this[key] = value;
            }
        },

        async getItemData(itemId, itemSlotNumber) {
            const response = await ItemsService.getItemData(itemId);
            this.items['slot' + itemSlotNumber] = response.data;
            this.checkForMythicsAndPrice();
            this.itemsAdded = true;
        },
        
        setTargetDummyHealth(health) {
            this.targetDummyHealth = health;
        },

        setTargetDummyArmor(armor) {
            this.targetDummyArmor = armor;
        },

        setTargetDummyMagicResistance(magicResistance) {
            this.targetDummyMagicResistance = magicResistance;
        },

        checkForMythicsAndPrice() {
            let numberOfLegends = 0;
            this.mythicAdded = false;
            this.mythicValue = {};
            this.buildCost = 0;
            this.nonMythicPassives = {};
            let filteredMythicPassives = []
            for (const item of Object.values(this.items)) {
                if (item) {
                    if (item.rank[0] === "MYTHIC") {
                        this.mythicAdded = true;
                        let passiveOfItem = item.passives
                        let mythicObj = passiveOfItem.find(passive => passive.mythic === true);
                        if (mythicObj) {
                            for (const [key, value] of Object.entries(mythicObj.stats)) {
                                if (value.flat > 0 || value.percent > 0) {
                                    console.log("Adding to mythicValue")
                                    if (key === 'magicPenetration') {
                                        this.mythicValue[key] = value.flat
                                    } else { this.mythicValue[key] = isPercentStat(key) ? value.percent : value.flat }
                                }
                            }
                        }
                    }

                    if (item.rank[0] === "LEGENDARY") {
                        numberOfLegends += 1
                    }

                    //Getting all non mythic passives
                    const nonMythicPassivesOfItem = item.passives.filter(passive => passive.mythic === false);
                    for (const passive of nonMythicPassivesOfItem) {
                        filteredMythicPassives.push(passive);
                    }
                    //Calculating build cost
                    this.buildCost += item.shop.prices.total;
                }
            }

            this.nonMythicPassives = filteredMythicPassives.reduce((obj, passive) => {
                obj[passive.name] = passive;
                return obj;
            }, {});

            this.amountOfLegendaries = numberOfLegends;
        },

        setLevel(level) {
            this.level = level;
        },

        setRune(slot, value) {
            this.runes[slot] = value;
        },

        calculateStatsWithItems() {
            const newCalculatedStats = { flatMagicPenetration: 0 };
            //Loops through all stats, then adds item values
            for (const [key, value] of Object.entries(this.stats)) {
                let calculatedStat = 0;

                if (this.itemsAdded) {
                    for (const item of Object.values(this.items)) {
                        if (item && item.stats[key]) {
                            calculatedStat += isPercentStat(key)
                                ? item.stats[key].percent
                                : item.stats[key].flat;
                        }
                    }

                    if (this.mythicAdded) {
                        if (this.mythicValue[key]) {
                            if (key === 'magicPenetration') {
                                newCalculatedStats.flatMagicPenetration += (this.mythicValue[key] * this.amountOfLegendaries)
                            }
                            calculatedStat += (this.mythicValue[key] * this.amountOfLegendaries)
                        }
                    }
                }

                if (key === 'attackSpeed') {
                    //Formula for Attack speed from https://leagueoflegends.fandom.com/wiki/Attack_speed
                    const attackSpeedRatio = this.stats.attackSpeedRatio.flat
                    //Calculated stat already has all attack speed bonus from items
                    //Adding scaling attack speed based on level without the flat amount
                    calculatedStat += value.perLevel * (this.level - 1) * (0.7025 + 0.0175 * (this.level - 1));
                    //Adding attack speed from rune
                    if (this.runes.slot0 === "attackSpeed") { calculatedStat += 10 }
                    //Scaling the attack speed based on a champions ratio (higher ratio = high gain from bonus attack speed)
                    let scaledBonusAttackSpeed = (calculatedStat / 100) * attackSpeedRatio;
                    //Adding the base attack speed to scaled
                    let finalAttackSpeed = value.flat + scaledBonusAttackSpeed;

                    newCalculatedStats[key] = finalAttackSpeed
                    continue;
                }

                if (key === 'healthRegen' || key === 'manaRegen') {
                    let finalRegen = calculateStat(value, this.level) * (1 + calculatedStat / 100)
                    //Special case where some health regen items give flat valuse
                    if (this.itemsAdded) {
                        if (key === "healthRegen") {
                            for (const item of Object.values(this.items)) {
                                if (item && item.stats[key]) {
                                    finalRegen += item.stats[key].flat
                                }
                            }
                        }
                    }

                    newCalculatedStats[key] = finalRegen;
                    continue;
                }

                if (key === 'magicPenetration') {
                    let addingFlatMagicPenetration = 0
                    if (this.itemsAdded) {
                        for (const item of Object.values(this.items)) {
                            if (item && item.stats[key]) {
                                addingFlatMagicPenetration += item.stats[key].flat
                            }
                        }
                    }

                    newCalculatedStats.flatMagicPenetration += addingFlatMagicPenetration;
                }

                //Adding flat + perLevel scaling to the rest of stats
                calculatedStat += calculateStat(value, this.level)



                //Calculating Bonus AD for Runes
                if (key === 'attackDamage') {
                    newCalculatedStats.bonusAttackDamage =
                        calculatedStat - calculateStat(value, this.level);
                }
                newCalculatedStats[key] = calculatedStat;
            };

            return newCalculatedStats;
        },

        applyRunes(newCalculatedStats) {
            Object.entries(this.runes).forEach(([slotKey, slotValue]) => {
                switch (slotValue) {
                    case 'adaptiveForce':
                        const bonusAD = newCalculatedStats.bonusAttackDamage;
                        const ap = newCalculatedStats.abilityPower;

                        if (bonusAD === ap) {
                            if (this.adaptiveType === 'PHYSICAL_DAMAGE') {
                                newCalculatedStats.attackDamage +=
                                    this.runeValues.adaptiveForce.attackDamage;
                            } else {
                                newCalculatedStats.abilityPower +=
                                    this.runeValues.adaptiveForce.abilityPower;
                            }
                        } else if (bonusAD > ap) {
                            newCalculatedStats.attackDamage +=
                                this.runeValues.adaptiveForce.attackDamage;
                        } else {
                            newCalculatedStats.abilityPower +=
                                this.runeValues.adaptiveForce.abilityPower;
                        }
                        break;

                    case 'health':
                        const addedHealth = 15 + 125 / 17 * (this.level - 1);
                        newCalculatedStats.health += addedHealth;
                        break;

                    case 'attackSpeed':
                        break;

                    default:
                        if (this.runeValues[slotValue]) {
                            newCalculatedStats[slotValue] +=
                                this.runeValues[slotValue];
                        }
                }
            });
        },
    },
});
