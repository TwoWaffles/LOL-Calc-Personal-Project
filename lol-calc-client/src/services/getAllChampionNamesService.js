import Api from '@services/Api';

export default {
    getAllChampionNames() {
        return Api().get('getAllChampionNames');
    }
}