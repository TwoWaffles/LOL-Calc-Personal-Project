<script>
import { useDamageSettingsStore } from '../stores/DamageSettingsStore';
export default {
    setup() {
        const damageSettingsStore = useDamageSettingsStore();
 
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
        <h1 class="font-black">Damage Settings</h1>
        <button class="rounded-full border-2 border-solid" @click="damageSettingsStore.toggleIsTargetDummy"> Toggle Target
            Dummy</button>
        {{ damageSettingsStore.isTargetDummy ? "On" : "Off" }}
        <h2 class="font-bold">Damage Toggle</h2>
        <div class="flex flex-col">
            <div>
                <input type="checkbox">
                <label>AA</label>
            </div>
            <div>
                <input type="checkbox" ref="critCheckbox" @click="damageSettingsStore.toggleCrit"/>
                <label>Crit AA</label>
            </div>
            <div>
                <input type="checkbox">
                <label>Q</label>
            </div>
            <div>
                <input type="checkbox">
                <label>W</label>
            </div>
            <div>
                <input type="checkbox">
                <label>E</label>
            </div>
            <div>
                <input type="checkbox">
                <label>R</label>
            </div>
        </div>
        <h2 class="font-bold">Abilities Display</h2>
    </div>
</template>