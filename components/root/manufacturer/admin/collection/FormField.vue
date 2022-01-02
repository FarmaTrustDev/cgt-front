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
              initialValue: entity.treatmentTypeId,
            },
          ]"
          type="hidden"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import SchedulingServices from '~/services/API/SchedulingServices'

export default {
  mixins: [withCrud],
  props: {},
  data() {
    return {
      form: this.$form.createForm(this, {
        name: 'TreatmentSchedulingForm',
      }),
      apiService: SchedulingServices,
      fetchIdFromParams: false,
      entity: {},
      isScheduled: false,
    }
  },
  mounted() {
    this.validateIsCreated()
  },
  methods: {},
}
</script>
