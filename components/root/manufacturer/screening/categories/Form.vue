<template>
  <div>
    <a-skeleton :loading="loading">
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <a-form-item label="Group Name">
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
                initialValue: entity.name,
              },
            ]"
            size="large"
            placeholder="Group Name"
          />
          <a-input
            v-decorator="[
              `templateId`,
              {
                rules: [{ required: true, message: 'Please input your name!' }],
                initialValue: templateId,
              },
            ]"
            type="hidden"
          />
        </a-form-item>
        <FormActionButton :loading="btnLoading" :text="isCreated===true ? 'Update' : 'Submit'" :is-created="isCreated" />
          <!-- <FormDeleteButton v-if="isCreated" slot="extra" @delete="onDelete" /> -->
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
    templateId: {
      required: true,
      type: Number,
    },
    // eslint-disable-next-line vue/require-default-prop
    categoryId: {
      type: String,
    },
  },
  data() {
    return {
      entityId: null,
      loading: false,
      entity: {},
      form: this.$form.createForm(this, {
        name: 'screeningCategory',
      }),
      formLayout: 'vertical',
      apiService: ScreeningCategoryServices,
      fetchIdFromParams: false,
      isCreated: false,
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
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
    afterDelete(response) {
      this.$emit('upsert', response)
    },
  },
}
</script>
