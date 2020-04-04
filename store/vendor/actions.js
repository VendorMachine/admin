export default {

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
    }
}
