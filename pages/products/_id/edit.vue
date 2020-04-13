<template>
  <div class="page">
    <section>
      <form class="card mt-4 lg:w-4/5" @submit.prevent="save">
        <section class="card__header">
          <h1 v-if="product && product.name">{{ product.name }}</h1>
        </section>
        <section v-if="freshProduct" class="flex">
          <main class="p-5">
            <input  v-model="product.name" placeholder="Product Name" type="input">
          <textarea v-model="product.description" class="input--bordered" placeholder="Description"></textarea>
          </main>
          <aside class="p-5 bg-grey-200 relative">
            <input v-model="product.price" type="number" placeholder="price">
            <button class="btn btn--primary absolute right-0 bottom-0 mb-4 mr-4">Save</button>
          </aside>
        </section>
        <section class="p-5" v-else>Loading...</section>
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"

export default {
  data() {
    return {
      busy: false,
      product: null,
      freshProduct: false
    }
  },

  created() {
    const productId = this.$route.params.id
    this.product = _.find(this.$store.state.vendor.products.list, { id: productId })
    this.getProduct(productId).then(response => {
      this.product = { ...response }
      this.freshProduct = true
    })
  },

  computed: {
    ...mapState({
      products: "products/list",
    }),
  },

  methods: {
    ...mapActions({
      getProduct: "vendor/getProduct",
      updateProduct: 'vendor/updateProduct'
    }),

    save() {
      if (this.busy) { return false }
      this.busy = true
      this.updateProduct(this.product)
      .then(()=>{
        this.$toast.success('Updated');
      })
      .finally(() => {
        this.busy = false
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>