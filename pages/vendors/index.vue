<template>
  <div>
    <h1>Vendors</h1>
    <div>
      <div class="flex">
        <button class="ml-auto btn btn--primary" @click="newVendor"><i class="fa fa-plus"></i> New</button>
      </div>
      <AddVendorModal />
      <section class="flex flex-wrap p-4 " v-if="! $fetchState.pending">
       <div :key="vendor.id" v-for="vendor in vendors" class="mt-2 w-1/2 p-1">
        <nuxt-link class="" :to="`/vendors/${vendor.id}/edit`">
          <div class="card p-4 no-underline">
            <div class="card__header">
              <span class="card__status border-green-400"></span>
              <h2 class="font-bold text-lg text-grey-600">{{ vendor.name }}</h2>
            </div>
            <div class="card__body">
              {{vendor}}
            </div>
          </div>
        </nuxt-link>
       </div>
      </section>
      <section v-else>
        Loading
      </section>
    </div>
  </div>
</template>

<script>
  import AddVendorModal from '@/components/Vendors/AddVendorAccountModal';
  import {mapActions, mapState} from 'vuex';
  export default {
    components: {
      AddVendorModal
    },

    methods: {
      ...mapActions({
        vendorsList: 'vendors/index'
      }),
      newVendor() {
        return this.$modal.show('add-vendor');
      }
    },

    fetch() {
      this.vendorsList();
    },

    computed: {
      ...mapState({
        vendors: 'vendors/list',
      }),
      vendors() {
        return this.$store.state.vendors.list;
      }
    },
  }
</script>