export default {

  async init({ dispatch }) {
    await dispatch('get');
  },

  get({ commit }, payload) {    
    return this.$api.auth.me()
      .then(response => {               
        if (response.data.vendors.data.length) {
          commit('setUserVendor', response.data.vendors.data[0])
        }
      })
  },

  store({ commit }, payload) {
    console.log('storing');
    return this.$api.vendors.store(payload)
      .then(response => {      
        commit('setUserVendor', response)
      })
    },

  async storeProduct({commit, state}, payload) {
    return await this.$api.vendors.products.store(state.account.id, payload)
      .then(response => {
        commit('addProduct', response);
        return response;
      })
    }
  
}
