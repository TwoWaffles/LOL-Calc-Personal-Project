import Api from '@/services/Api.js';

export default {
    getChampionData(championKey) {
        return Api().get('champions/getChampionData', { params: { championKey: championKey}});
    }
}