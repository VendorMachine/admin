import _ from 'lodash';
import Vue from 'vue';

export default {
    setUserVendor(state, vendor) {
        Vue.set(state, 'account', vendor);
    },
}
