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
    <div class="text-white bg-gray-900 py-2 px-4 mb-4 rounded-xl text-center">
        <button class="rounded-md py-2 px-2 border-2 bg-gray-700 font-bold border-solid hover:bg-gray-900" :class="damageSettingsStore.isTargetDummy ? 'bg-yellow-700' : 'text-white'" @click="damageSettingsStore.toggleIsTargetDummy">
            Toggle Target Dummy
        </button>
    </div>
</template>