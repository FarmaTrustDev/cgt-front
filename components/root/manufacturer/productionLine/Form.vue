<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-form-item>
        <a-input
          v-decorator="[
            'name',
            {
              initialValue: entity.name,
              rules: [
                { required: true, message: translation.ProduLine_2_449 },
              ],
            },
          ]"
          size="large"
          :placeholder="translation.ProduLine_2_449"
        />
      </a-form-item>

      <FormActionButton :loading="btnLoading" :is-created="isCreated" />
    </a-form>
  </div>
</template>

<script>
import ProductionLineServices from '~/services/API/ProductionLineServices'
import withCrud from '~/mixins/with-crud'
export default {
  mixins: [withCrud],
  data() {
    return {
      screeningTemplate: {},
      entityId: null,
      isCreated: false,
      loading: false,
      treatmentType: {},
      entity: {},
      typeLoading: true,
      hospitalLoading: true,
      btnLoading: false,
      form: this.$form.createForm(this, {
        name: 'screening',
      }),
      hospitals: [],
      formLayout: 'vertical',
      apiService: ProductionLineServices,
      gotoLink: '/manufacturer/administration/productionLine',
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  mounted() {},
  methods: {},
}
</script>
