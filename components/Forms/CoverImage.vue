<template>
  <div class="cover-image" :style="backgroundImage" @click="openFileInput">
    <span v-if="image" class="cover-image__remove" @click.stop="remove">
      <i class="fas fa-times-circle"></i>
    </span>
    <div class="cover-image__label">
      <span v-if="!preview && !image">Add cover</span>
      <span v-else>Change cover</span>
    </div>
    <span v-show="busy" class="cover-image__loader">
      <span class="loader"></span>
    </span>
    <input type="file" ref="file" accept="image/*" class="hidden" @change="mediaUpload">
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['moduleId', 'coverImage'],

    data() {
      return {
        busy: false,
        image: null,
        preview: null,
      }
    },

    mounted() {
      this.image = this.coverImage;
    },

    computed: {
      backgroundImage() {
        if (this.image && ! this.preview){
          return { backgroundImage: `url(${this.image})`, maxWidth: '300px'  }
        }
        return this.preview ? { backgroundImage: `url(${this.preview})`, maxWidth: '300px' } : {}
      },
    },

    methods: {
      ...mapActions({
        storeCover: 'modules/storeCover',
        deleteCover: 'modules/deleteCover',
      }),

      clear() {
        this.$refs.file.value = '';
        this.preview = null;
      },

      openFileInput() {
        this.$refs.file.click();
      },

      mediaUpload(event) {
        let files = event.target.files;
        if (!files.length) return;

        this.image = files[0];
        let reader = new FileReader();

        reader.onload = (e) => {
          this.preview = e.target.result;
          this.store();
        };

        reader.readAsDataURL(files[0]);
      },

      store() {
        if (this.busy) return;
        let payload = new FormData();
        payload.append('file', this.image);

        this.busy = true;

        this.storeCover({ id: this.moduleId, data: payload })
          .then(() => {
            this.clear();
          })
          .catch(error => {
            this.$toast.error('Failed to store cover, please try again.');
          })
          .finally(() => this.busy = false)
      },

      remove() {
        if (this.busy) return;
        this.busy = true;

        this.deleteCover(this.moduleId)
          .then(() => {
            this.image = null;
            this.clear();
          })
          .catch(error => {
            this.$toast.error('Failed to remove cover, please try again.');
          })
          .finally(() => this.busy = false)
      },
    }
  }
</script>