import { defineStore } from 'pinia'

export const useChampionOneStore = defineStore('championOneStore', {
    state: () => ({
        testArray: [
            1,
            2,
            3
        ],

        name: "testName"
    })
})