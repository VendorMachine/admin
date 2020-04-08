<template>
  <div class="page">
    <form class="card mt-4 lg:w-3/5" @submit.prevent="">
    <section class="card__header">
      <h1>New Product</h1>
    </section>
    <section class="flex">
      <main class="p-5">
        <input placeholder="Product Name" type="input">
        <textarea class="input--bordered" placeholder="Description"></textarea>
      </main>
      <aside class="p-5 bg-grey-200 relative">
        <input type="input" v-model="product.name">
        <button class="btn btn--primary absolute right-0 bottom-0 mb-4 mr-4">Create Product</button>
      </aside>
    </section>
    </form>
  </div>
</template>
<script>
export default {

  data() {
    return {
      product: {
        name: ""
      }
    }
  },

}
</script>