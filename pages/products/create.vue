<template>
  <div class="page">
    <form class="card mt-4 lg:w-3/5" @submit.prevent="submit">
    <section class="card__header">
      <h1>New Product</h1>
    </section>
    <section class="flex">
      <main class="p-5">
        <input  v-model="product.name" placeholder="Product Name" type="input">
        <textarea v-model="product.description" class="input--bordered" placeholder="Description"></textarea>
      </main>
      <aside class="p-5 bg-grey-200 relative">
        <input v-model="product.price" type="number" placeholder="price">
        <button class="btn btn--primary absolute right-0 bottom-0 mb-4 mr-4">Create Product</button>
      </aside>
    </section>
    </form>
  </div>
</template>
<script>

import { mapActions } from 'vuex';

export default {

  data() {
    return {
      product: {
        name: "",
        description: "",
        price: null
      }
    }
  },

  methods: {
    ...mapActions({
      store: 'vendor/storeProduct'
    }),

    submit() {
      return this.store(this.product)
      .then(response => {
        this.$router.replace(`/products/${response.id}`)
        this.$toast.success('Product Added')
      })
    }
  }
}
</script>