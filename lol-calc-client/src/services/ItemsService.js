import Api from '@/services/Api.js';

export default {
    getAllItemNamesAndInfo() {
        return Api().get('items/getAllItemNamesAndInfo');
    }
}