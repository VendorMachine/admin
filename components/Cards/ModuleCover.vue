<template>
    <nuxt-link :to="module.link + `/edit`" class="module-cover" :style="backgroundImage">
        <div class="module-cover__body">
            <div class="module-cover__category">Category</div>
            <h3 class="module-cover__name">{{ module.name }}</h3>
        </div>
    </nuxt-link>
</template>

<script>
    export default {
        props: ['module'],

        computed: {
            backgroundImage() {
                return `background-image: url(${this.module.image})`;
            }
        }
    }
</script>