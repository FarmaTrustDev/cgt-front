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
              `categoryId`,
              {
                rules: [{ required: true, message: 'Please input your name!' }],
                initialValue: category.id,
              },
            ]"
            type="hidden"
          />
        </a-form-item>
        <FormActionButton :loading="btnLoading" :is-created="isCreated">
          <FormDeleteButton v-if="isCreated" slot="extra" @delete="onDelete" />
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
    // categoryId: {
    //   type: String,
    //   required: true,
    // },
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
  mounted() {
    if (!this.isEmpty(this.category)) {
      // this.isCreated = true
      // this.loading = true
      // ScreeningServices.get({ category: this.category.id })
      //   .then((response) => {
      //     this.entity = response.data
      //     this.entityId = this.entity.globalId
      //   })
      //   .finally(() => (this.loading = false))
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
