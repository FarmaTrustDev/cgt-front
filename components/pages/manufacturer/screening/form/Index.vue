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
                    message: 'Please input your Category Name!',
                  },
                ],
                initialValue: entity.name,
              },
            ]"
            size="large"
            placeholder="Insert Category Name"
          />
          <a-input
            v-decorator="[
              `templateId`,
              {
                rules: [{ required: true, message: 'Please input your name!' }],
                initialValue: categoryId,
              },
            ]"
            type="hidden"
          />
        </a-form-item>
        <FormActionButton :loading="btnLoading" :is-created="isCreated">
          <FormDeleteButton slot="extra" @delete="onDelete" />
        </FormActionButton>
      </a-form>
    </a-skeleton>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
import nullHelper from '~/mixins/null-helpers'
export default {
  mixins: [withCrud, nullHelper],
  props: {
    categoryId: {
      type: String,
      required: true,
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
      apiService: ScreeningCategoryServices,
      fetchIdFromParams: false,
      isCreated: false,
    }
  },
  mounted() {
    if (!this.isEmpty(this.categoryId)) {
      this.isCreated = true
      this.loading = true
      ScreeningCategoryServices.getById(this.categoryId)
        .then((response) => {
          this.entity = response.data
          this.entityId = this.entity.globalId
        })
        .finally(() => (this.loading = false))
    }
  },
  methods: {
    afterCreate(response) {
      this.$emit('upsert', response)
    },
    afterUpdate(response) {
      this.$emit('upsert', response)
    },
  },
}
</script>
