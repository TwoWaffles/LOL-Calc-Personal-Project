 
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
<template>
    <div class="pt-4">
        <h2 class="text-white text-2xl bg-gray-900 py-2 px-4 mb-4 rounded-xl text-center font-bold">Damage Toggle</h2>
 
        <table class="w-full bg-gray-900 text-white mt-5 rounded-md">
            <tr>
                <td class="p-2">
                    <input type="checkbox" @click="damageSettingsStore.toggleAutoAttack" />
                    <label class="pl-1 font-bold">AA</label>
                </td>
                <td class="p-2">
                    <input :disabled="!damageSettingsStore.isAA" type="checkbox" @click="damageSettingsStore.toggleCrit" />
                    <label class="pl-1 font-bold" :class="{'text-gray-500': !damageSettingsStore.isAA}">Crit AA</label>
                </td>
            </tr>
            <tr>
                <td class="p-2">
                    <input type="checkbox" v-model="damageSettingsStore.isQ" @click="damageSettingsStore.toggleAbility('Q')" />
                    <label class="pl-1 font-bold">Q</label>
                </td>
                <td class="p-2">
                    <input type="checkbox" v-model="damageSettingsStore.isW" @click="damageSettingsStore.toggleAbility('W')" />
                    <label class="pl-1 font-bold">W</label>
                </td>
            </tr>
            <tr>
                <td class="p-2">
                    <input type="checkbox" v-model="damageSettingsStore.isE" @click="damageSettingsStore.toggleAbility('E')" />
                    <label class="pl-1 font-bold">E</label>
                </td>
                <td class="p-2">
                    <input type="checkbox" v-model="damageSettingsStore.isR" @click="damageSettingsStore.toggleAbility('R')" />
                    <label class="pl-1 font-bold">R</label>
                </td>
            </tr>
        </table>
    </div>
</template>
