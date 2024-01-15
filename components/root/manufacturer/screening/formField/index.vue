<template>
  <div>
    <a-skeleton :loading="loading">
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <a-form-item>
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: translation.Pleasinput_5_1155,
                  },
                ],
                initialValue: entity.name,
              },
            ]"
            size="large"
            :placeholder="translation.InserCateg_3_1153"
          />
          <a-input
            v-decorator="[
              `categoryId`,
              {
                rules: [{ required: true, message: 'Please input your name!' }],
                initialValue: category.id,
              },
            ]"
            type="hidden"
          />
        </a-form-item>
        <FormActionButton :loading="btnLoading" :is-created="isCreated" :custom-text="translation.Creat_1_123">
          <!-- <FormDeleteButton v-if="isCreated" slot="extra" @delete="onDelete" /> -->
        </FormActionButton>
      </a-form>
    </a-skeleton>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import ScreeningServices from '~/services/API/ScreeningServices'
import nullHelper from '~/mixins/null-helpers'
export default {
  mixins: [withCrud, nullHelper],
  props: {
    categoryId: {
      required: false,
      type: Number,
    },
    category: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      entityId: null,
      loading: false,
      entity: {},
      form: this.$form.createForm(this, {
        name: 'screening',
      }),
      formLayout: 'vertical',
      apiService: ScreeningServices,
      fetchIdFromParams: false,
      isCreated: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    if (!this.isEmpty(this.categoryId)) {
      this.isCreated = true
      this.loading = true
      ScreeningServices.getById(this.categoryId )
        .then((response) => {
          this.entity = response.data
          this.entityId = this.entity.id
        })
        .finally(() => (this.loading = false))
    }
  },
  methods: {
    afterCreate(response) {
      this.$emit('getScreenTempStatusIndex')  
      this.$emit('upsert', response)
    },
    afterUpdate(response) {
      this.$emit('upsert', response)
    },
  },
}
</script>
