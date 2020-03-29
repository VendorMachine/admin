const qs = require('qs');

export default $axios => ({
    index (query) {
        let queryString = qs.stringify(query);
        return $axios.$get(`/vendors?${queryString}`)
    },

    store (payload) {
        return $axios.$post('/vendors', payload)
    },

    products: {
        index (id, query) {
            let queryString = qs.stringify(query);
            return $axios.$get(`/vendors/${id}/products?${queryString}`)
        },

        store (id, payload) {
            return $axios.$post(`/vendors/${id}/products`, payload)
        },
    },

    show (id) {
        return $axios.$get(`/vendors/${id}`)
    },


})
