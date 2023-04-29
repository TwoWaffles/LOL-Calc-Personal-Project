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

export const useChampionOneStore = defineStore('championOneStore', {
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
            this.itemsAdded = true;
        },

        setLevel(level) {
            this.level = level;
        },

        setRune(slot, value) {
            this.runes[slot] = value;
        },

        calculateStatsWithItems() {
            const newCalculatedStats = {};
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
                    scaledBonusAttackSpeed = (calculatedStat/100) * attackSpeedRatio;
                    //Adding the base attack speed to scaled
                    finalAttackSpeed = value.flat + scaledBonusAttackSpeed;

                    newCalculatedStats[key] = finalAttackSpeed
                    continue;
                }

                calculatedStat += calculateStat(value, this.level)

                //Figure out helath regen idk

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
