<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <FormActionButton :loading="btnLoading" :is-created="isCreated" />
    </a-form>
  </div>
</template>

<script>
// import TreatmentService from '~/services/API/TreatmentTypeServices'
// import OrganizationServices from '~/services/API/OrganizationServices'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'

// import withCrud from '~/mixins/with-crud'
//  mixins: [withCrud],
export default {
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
      apiService: ScreeningTemplateServices,
      gotoLink: '/manufacturer/administration/screening',
    }
  },
  mounted() {},
  methods: {},
}
</script>
