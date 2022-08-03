<template>
  <div>
    <span v-if="isCreated" class="admin-screening-page">
      <!-- <a-divider>Screening Questions</a-divider> -->
      <CategoryTabs
        v-if="entity.id"
        :template-id="entity.id"
        :manufacturerId="entity.manufacturerId"
        :treatmentTypeId="entity.treatmentTypeId"
        class="grey-card"
    /></span>
  </div>
</template>

<script>
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
import CategoryTabs from '~/components/root/hospital/screening/categories/Tabs'
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
      gotoLink: '/hospital/administration/screening',
      isActive: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.getHospitalStatus()
  },
  methods: {
    getHospitalStatus() {
      // console.log(this.entity)
    },
  },
}
</script>
