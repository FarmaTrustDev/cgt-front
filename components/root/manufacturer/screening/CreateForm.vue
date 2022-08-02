<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-form-item>
        <a-select
          v-decorator="[
            'treatmentTypeId',
            {
              initialValue: entity.treatmentTypeId,
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

      <a-form-item>
        <a-select
          v-decorator="[
            'HospitalsId',
            {
              initialValue: entity.hospitalsId,
              rules: [
                {
                  required: false,
                  message: 'Please select your Hospital!',
                },
              ],
            },
          ]"
          :loading="hospitalLoading"
          mode="multiple"
          placeholder="Select Hospital"
          style="width: 100%"
          size="large"
          class="default-select"
        >
          <a-select-option v-for="hospital in hospitals" :key="hospital.id">
            {{ hospital.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <FormActionButton :loading="btnLoading" :is-created="isCreated" />
    </a-form>

    <span v-if="isCreated">
      <a-divider>{{translation.AssocScree_2_489}}</a-divider>

      <CategoryTabs v-if="entity.id" :template-id="entity.id"
    /></span>
  </div>
</template>

<script>
import TreatmentService from '~/services/API/TreatmentTypeServices'
import OrganizationServices from '~/services/API/OrganizationServices'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
import { HOSPITAL_ALIAS } from '~/services/Constant'
import CategoryTabs from '~/components/root/manufacturer/screening/categories/Tabs'
import withCrud from '~/mixins/with-crud'
export default {
  components: { CategoryTabs },
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
      fetchTreatmentTypess:true,
      form: this.$form.createForm(this, {
        name: 'screening',
      }),
      hospitals: [],
      formLayout: 'vertical',
      apiService: ScreeningTemplateServices,
      gotoLink: '/manufacturer/administration/screening',
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  mounted() {
    // this.fetchTreatmentTypes()
    this.fetchOrganization()
    this.getActiveWithOutScreening()
  },
  updated() {
    if (this.isCreated && this.fetchTreatmentTypess) {
      this.fetchTreatmentTypess = false
      this.getTreatmentTypes()
    }
  },
  methods: {
    getActiveWithOutScreening() {
      this.typeLoading = true
      TreatmentService.getActiveWithOutScreening()
        .then((response) => {
          this.treatmentType = response.data
        })
        .finally(() => (this.typeLoading = false))
    },
    getTreatmentTypes() {
      if (this.isCreated) {
        this.fetchTreatmentTypes({ Ids: [this.entity.treatmentTypeId] })
      } else {
        this.getActiveWithOutScreening()
      }
    },
    fetchTreatmentTypes(params = {}) {
      TreatmentService.get(params).then((response) => {
        this.treatmentType = response.data
      })
    },
    fetchOrganization() {
      this.hospitalLoading = true
      OrganizationServices.get({ organizationTypeAlias: HOSPITAL_ALIAS })
        .then((response) => {
          this.hospitals = response.data
        })
        .finally(() => (this.hospitalLoading = false))
    },
  },
}
</script>
