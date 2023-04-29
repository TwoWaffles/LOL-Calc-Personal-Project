import { defineStore } from 'pinia';
import ChampionsService from '../services/ChampionsService';
import ItemsService from '../services/ItemsService';

const PERCENT_STATS = [
    'criticalStrikeChance',
    'armorPenetration',
    'magicPenetration',
    'lifesteal',
    'omnivamp',
];

function calculateStat(key, value, level) {
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
        targetHealth: 100,
        targetArmor: 0,
        targetMagicResistance: 0

    }),

    getters: {
        computedStats() {
            const newCalculatedStats = this.calculateStatsWithItems();
            this.applyRunes(newCalculatedStats);
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

        setTargetHealth(health) {
            this.targetHealth = health;
        },

        setTargetArmor(armor) {
            this.targetArmor = armor;
        },

        setTargetMagicResistance(magicResistance) {
            this.targetMagicResistance = magicResistance;
        },

        calculateStatsWithItems() {
            const newCalculatedStats = {};
            for (const [key, value] of Object.entries(this.stats)) {
              let calculatedStat = calculateStat(key, value, this.level);
          
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
                    const attackSpeedRatio = this.stats.attackSpeedRatio.flat / value.flat;
                    const bonusAttackSpeed =
                        calculatedStat * attackSpeedRatio - value.flat;
                    calculatedStat = value.flat * (1 + bonusAttackSpeed / 100);
                }

                if (key === 'attackDamage') {
                    newCalculatedStats.bonusAttackDamage =
                        calculatedStat - calculateStat(key, value, this.level);;
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
                        const attackSpeedRatio =
                            this.stats.attackSpeedRatio.flat /
                            this.stats.attackSpeed.flat;
                        const runeValueToBeAdded = attackSpeedRatio * 10;
                        const ratioToBeAdded =
                            this.stats.attackSpeed.flat * (runeValueToBeAdded / 100);
                        newCalculatedStats.attackSpeed += ratioToBeAdded;
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
