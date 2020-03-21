<template>
<div class="dashboard__grid-container">
  <header class="dashboard__header border-b border-grey-200 flex ml-auto px-6 items-center">
    <i class="far fa-bell mr-4 text-xl"></i>
    <span class="font-semibold">{{ user.name }}</span>
  </header>
  <aside class="dashboard__sidenav border-r border-grey-200">
    <div class="dashboard__sidenav-logo">
      <i class="fa fa-store text-bluegem-500"></i> <span class="font-bold text-bluegem-500">vendor</span><span class="font-normal">machine</span>
    </div>
    <div class="dashboard__sidenav-content">
      <ul>
        <li class="dashboard__sidenav-menu-item dashboard__sidenav-menu-item--selected"><i class="fa fa-store dashboard__sidenav-menu-item-icon"></i> Vendors</li>
        <li class="dashboard__sidenav-menu-item"><i class="fa fa-tools dashboard__sidenav-menu-item-icon"></i> Settings</li>
      </ul>
    </div>
  </aside>
  <main class="dashboard__main">
    <div class="dashboard__main-content">
      <nuxt/>
    </div>
  </main>
</div>
</template>

<script>
  import Sidebar from '@/components/Page/Sidebar';
  import AddVendorModal from '@/components/Modals/AddVendorAccount';
import { mapActions, mapGetters } from 'vuex';

  export default {
    components: { AddVendorModal, Sidebar },

    created() {
      if (this.$auth.loggedIn && ! this.activeVendor && this.user.vendors.data[0]) {        
        this.setActiveVendor(this.user.vendors.data[0].id)
      }
    },

    computed: {
      ...mapGetters({activeVendor: 'vendors/activeVendor'}),
      user() {
        if (this.$auth.loggedIn) {
          return this.$auth.user;
        }
      }
    },

    methods: {
      ...mapActions({setActiveVendor: 'vendors/setActive'})
    },
  }
</script>