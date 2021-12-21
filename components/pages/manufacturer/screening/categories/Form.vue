<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please input your Email!' }],
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
              initialValue: templateId,
            },
          ]"
          type="hidden"
        />
      </a-form-item>
      <FormActionButton :loading="btnLoading" :is-created="isCreated" />
    </a-form>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
export default {
  mixins: [withCrud],
  props: {
    templateId: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      loading: false,
      entity: {},
      form: this.$form.createForm(this, {
        name: 'screeningCategory',
      }),
      formLayout: 'vertical',
      apiService: ScreeningCategoryServices,
      shouldCheckCreated: false,
    }
  },
  methods: {
    afterCreate(response) {
      this.$emit('upsert', response)
    },
  },
}
</script>
