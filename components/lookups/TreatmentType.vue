<template>
  <a-form-item>
    <a-select
      v-decorator="[
        'treatmentTypeId',
        {
          initialValue: treatmentTypeId,
          rules: [
            {
              required: true,
              message: 'Please select your Treatment Type!',
            },
          ],
        },
      ]"
      :disabled="isCreated"
      :loading="typeLoading"
      placeholder="Select Treatment Type"
      style="width: 100%"
      size="large"
      class="default-select"
    >
      <a-select-option v-for="type in treatmentType" :key="type.id">
        {{ type.name }}
      </a-select-option>
    </a-select></a-form-item
  >
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
export default {
  data() {
    return {
      treatmentTypes: {},
      typeLoading: false,
    }
  },
  mounted() {
    this.fetchTreatmentTypes()
  },
  methods: {
    fetchTreatmentTypes() {
      this.typeLoading = true
      TreatmentService.get()
        .then((response) => {
          this.treatmentType = response.data
        })
        .finally(() => (this.typeLoading = false))
    },
  },
}
</script>
