import Api from '@/services/Api.js';

export default {
    getAllChampionNamesAndIcons() {
        return Api().get('getAllChampionNamesAndIcons');
    }
}