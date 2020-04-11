export default {

  async boot({dispatch, state}) {
    console.log('vendor boot');
    await dispatch('index');    
  },

  async index({commit}, payload) {
    return await this.$api.products.index()
      .then(response => {
        commit('setProducts', response.data);
        return response;
      })
  },


  async productsIndex({commit, state}, payload) {
    console.log(state);
    
    return await this.$api.vendors.products.index(state.active)
      .then(response => {
        commit('setProducts', response.data);
        return response;
      })
  },

  async storeProduct({commit, state}, payload) {
    return await this.$api.vendors.products.store(state.active, payload)
      .then(response => {
        commit('addProduct', response.data);
        return response;
      })
  },

  async store({commit}, payload) {
    return await this.$api.vendors.store(payload)
      .then(response => {
        return response;
      })
  },

  async setActive({ commit }, payload) {
    commit('setActive', payload)
  },

  // async show({commit}, payload) {
  //   return await this.$api.modules.show(payload);
  // },

  // async update({commit}, payload) {
  //   return await this.$api.modules.update(payload.id, payload.module)
  //     .then(response => {
  //       this.$toast.success('Module updated');
  //       return response;
  //     })
  // },

  // async delete({commit}, payload) {
  //   return await this.$api.modules.delete(payload)
  //     .then(response => {
  //       this.$toast.success('Module deleted');
  //       return response;
  //     })
  // },

  // async storeCover({commit}, payload) {
  //   return await this.$api.modules.cover.store(payload.id, payload.data)
  // },

  // async deleteCover({commit}, payload) {
  //   return await this.$api.modules.cover.delete(payload)
  //     .then(response => {
  //       this.$toast.success('Cover removed');
  //       return response;
  //     })
  // },
}
