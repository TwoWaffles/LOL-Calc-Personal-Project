import Api from '@/services/Api.js';

export default {
    getChampionData(championKey) {
        return Api().get('getChampionData', { params: { championKey: championKey}});
    }
}