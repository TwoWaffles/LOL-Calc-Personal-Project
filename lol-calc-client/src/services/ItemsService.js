import Api from '@/services/Api.js';

export default {
    getAllItemNamesAndInfo() {
        return Api().get('items/getAllItemNamesAndInfo');
    },
    getItemData(itemId) {
        return Api().get('items/getItemData', { params: { itemId: itemId } });
    }
}