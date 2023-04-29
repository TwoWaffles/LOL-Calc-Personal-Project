<template>
    <div>
        <h2 class="font-bold text-white">Damage Toggle</h2>
        <div class="flex flex-row">
            <div>
                <input type="checkbox">
                <label>AA</label>
            </div>
            <div>
                <input type="checkbox" ref="critCheckbox" @click="damageSettingsStore.toggleCrit" />
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
    </div>
</template>

<script>
import { useDamageSettingsStore } from '../stores/DamageSettingsStore';

export default {
    setup() {
        const damageSettingsStore = useDamageSettingsStore();

        return { damageSettingsStore }
    },
    data() {
        return {}
    },
}
</script>