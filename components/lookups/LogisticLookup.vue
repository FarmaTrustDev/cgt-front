<template>
  <a-form-item :label="translation.LogisProvi_2_380">
    <a-select
      v-decorator="[
        'logisticId',
        {
          initialValue: logisticId,
          rules: [
            {
              required: true,
              message: 'Please select your LogisticProvider!',
            },
          ],
        },
      ]"
      :loading="typeLoading"
      placeholder= "Select Logistic Provider"
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
import OrganizationService from '~/services/API/OrganizationServices'
import { LOGISTIC_ALIAS } from '~/services/Constant'
export default {
  props: {
    logisticId: { type: Number, default: null },
    disabled: { type: Boolean, default: false },
    params: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      LOGISTIC_ALIAS,
      treatmentTypes: {},
      typeLoading: false,
    }
  },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.typeLoading = true
      OrganizationService.get({
        ...this.params,
        OrganizationTypeAlias: this.LOGISTIC_ALIAS,
      })
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
