<template>
    <div>
        <h1 v-if="vendor && vendor.name">{{ vendor.name }}</h1>
        <section v-if="freshVendor">
            {{vendor}}
        </section>
        <section v-else>
            Loading...
        </section>
    </div>
</template>
<script>

import { mapActions, mapState } from 'vuex'

export default {
    
    data() {
        return {
            vendor: null,
            freshVendor: false,
        }
    },

    created() {
        const vendorId = this.$route.params.id
        // @todo stm figure out why this mapped state isnt working
        // this.vendor = _.find(this.vendors, { id: vendorId })
        this.vendor = _.find(this.$store.state.vendors.list, { id: vendorId })    
        this.getVendor(vendorId)
        .then(respose => {
            this.vendor = respose
            this.freshVendor = true
        })
    },

    computed: {
        ...mapState({
            vendors: 'vendors/list'
        }),
    },

    methods: {
        ...mapActions({
            getVendor: 'vendors/get'
        }),
    },
}
</script>