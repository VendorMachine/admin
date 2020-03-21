<template>
  <modal :name="modal" width="600" height="auto" :click-to-close="true" :scrollable="true" :adaptive="true">
    <div class="modal">
      <h1 class="text-white">Add track</h1>

      <form class="w-full" method="POST" @submit.prevent="submit">
        <div class="form__row">
          <label>Name</label>
          <input type="text" v-model="form.name" required />
          <Validation :errors="errors" name="name"></Validation>
        </div>

        <div class="form__row">
          <label>Track number</label>
          <input type="number" v-model="form.number" required>
          <Validation :errors="errors" name="number"></Validation>
        </div>

        <div class="form__row">
          <label>Audio file</label>
          <label class="input w-full block cursor-pointer flex justify-between">
            <input ref="fileInput" type="file" id="media" class="hidden" @change="upload">

            <span>
              <span v-if="!form.file" class="text-grey-500">Select audio file</span>
              <span v-else>{{ form.file.name }}</span>
            </span>

            <span v-if="form.file">
              <button @click.prevent="clear">
                <i class="far fa-times-circle"></i>
              </button>
            </span>
          </label>
          <Validation :errors="errors" name="file"></Validation>
        </div>

        <div class="text-right">
          <button @click.prevent="close" class="mr-4">Cancel</button>
          <SubmitButton :busy="busy" label="Save"></SubmitButton>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    props: ['module'],

    data() {
      return {
        modal: 'add-track',
        busy: false,
        errors: [],
        form: {
          module_id: null,
          name: null,
          file: null,
        },
      }
    },

    created() {
      this.form.module_id = this.module;
    },

    methods: {
      ...mapActions({
        store: 'tracks/store'
      }),

      close() {
        this.$modal.hide(this.modal);
      },

      reset() {
        this.form = {
          module_id: this.module,
          name: null,
          file: null,
          number: null,
        }
      },

      upload(e) {
        let files = e.target.files;
        if (! files.length) return;

        this.form.file = files[0];
      },

      clear() {
        this.form.file = null;
        this.$refs.fileInput.value = '';
      },

      submit() {
        let data = new FormData();
        data.append('file', this.form.file, this.form.file.name);
        data.append('module_id', this.form.module_id);
        data.append('name', this.form.name);
        data.append('number', this.form.number);
        this.busy = true;

        this.store(data)
          .then((response) => {
            this.reset();
            this.$modal.hide(this.modal);
          })
          .catch(error => {
            if (error.response.data.errors) {
              this.errors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.busy = false
          });
      }
    }
  }
</script>
