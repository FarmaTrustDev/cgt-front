<template>
  <a-form-item label="Treatment Type">
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
      :loading="typeLoading"
      placeholder="Select Treatment Type"
      class="default-select w-100"
      size="large"
      :disabled="disabled"
      @change="onchange"
    >
      <a-select-option
        v-for="type in treatmentTypes"
        :key="type.id"
        :data-globalId="type.globalId"
      >
        {{ type.name }}
      </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
export default {
  props: {
    treatmentTypeId: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
  },

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
          this.treatmentTypes = response.data
        })
        .finally(() => (this.typeLoading = false))
    },
    onchange(value, e) {
      this.$emit('onChange', value)
    },
  },
}
</script>
