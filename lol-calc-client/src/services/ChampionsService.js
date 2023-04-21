import Api from '@/services/Api.js';

export default {
    getAllChampionNamesAndIcons() {
        return Api().get('champions/getAllChampionNamesAndIcons');
    },
    getChampionData(championKey) {
        return Api().get('champions/getChampionData', { params: { championKey: championKey } });
    }
}