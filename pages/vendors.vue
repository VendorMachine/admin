<template>
  <div>
    <h1>Vendors</h1>
    <div>
      <div class="flex">
        <button class="ml-auto btn btn--primary" @click="newVendor"><i class="fa fa-plus"></i> New</button>
      </div>
      <AddVendorModal />
    </div>
  </div>
</template>

<script>
  import AddVendorModal from '@/components/Vendors/AddVendorAccountModal';

  export default {
    components: {
      AddVendorModal
    },

    methods: {
      newVendor() {
        return this.$modal.show('add-vendor');
      }
    },
  }
</script>