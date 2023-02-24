import Api from '@/services/Api.js';

export default {
    getChampionData(championName) {
        return Api().get('getChampionData', championName);
    }
}