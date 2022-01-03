<template>
  <div>
    <a-form :form="form" layout="horizontal" @submit="onSubmit">
      <a-form-item label="Process step">
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Please input Process!' }],
              initialValue: entity.name,
            },
          ]"
          size="large"
          placeholder="input Process!"
        />

        <a-input
          v-decorator="[
            'treatmentTypeId',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your treatmentTypeId!',
                },
              ],
              initialValue: treatmentType.id,
            },
          ]"
          type="hidden"
        />
      </a-form-item>
      <FormActionButton />
    </a-form>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import CollectionServices from '~/services/API/CollectionServices'

export default {
  mixins: [withCrud],
  props: {
    treatmentType: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'CollectionForm',
      }),
      apiService: CollectionServices,
      fetchIdFromParams: false,
      entity: {},
      isScheduled: false,
    }
  },
  mounted() {},
  methods: {
    afterCreate(response) {
      this.$emit('handlesShowModal', false)
    },
  },
}
</script>
