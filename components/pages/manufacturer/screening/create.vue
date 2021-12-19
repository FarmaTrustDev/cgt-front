<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-form-item>
        <a-select
          v-decorator="[
            'bloodType',
            {
              initialValue: screeningTemplate.treatmentType,
              rules: [
                {
                  required: true,
                  message: 'Please select your Gender!',
                },
              ],
            },
          ]"
          placeholder="Select Blood Type"
          style="width: 100%"
          size="large"
          class="default-select"
        >
          <a-select-option v-for="type in treatmentType" :key="type.id">
            {{ type.name }}
          </a-select-option>
        </a-select></a-form-item
      >
    </a-form>
  </div>
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
export default {
  props: {
    screeningTemplate: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      treatmentType: {},
      form: this.$form.createForm(this, {
        name: 'screening',
      }),
    }
  },
  mounted() {
    this.fetchTreatmentTypes()
  },
  methods: {
    fetchTreatmentTypes() {
      TreatmentService.get().then((response) => {
        this.treatmentType = response.data
      })
    },
  },
}
</script>
