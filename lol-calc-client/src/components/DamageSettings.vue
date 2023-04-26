<script>
import { useDamageSettingsStore } from '../stores/DamageSettingsStore';
export default {
    setup() {
        const damageSettingsStore = useDamageSettingsStore()

    return { damageSettingsStore }
    },
    data() {
        return {

        }
    },
    computed: {

    },

    methods: {}

}
</script>


<template>
    <div>
        <h2>Damage Settings</h2>
        <button class="rounded-full border-2 border-solid" @click="damageSettingsStore.toggleIsTargetDummy"> Toggle Target Dummy</button>
        {{ damageSettingsStore.isTargetDummy ? "On" : "Off"}}
    </div>
</template>