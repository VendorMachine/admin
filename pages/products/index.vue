<template>
  <div class="page">
    <h1>Products</h1>
    <div class="flex">  
        <input @input="search()" v-model="searchTerm" class="input__search w-1/3" placeholder="Search">
        <nuxt-link tag="button" to="/products/create" class="ml-auto btn btn--primary" ><i class="fa fa-plus"></i> New</nuxt-link> 
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchTerm: "",
    }
  },
}
</script>