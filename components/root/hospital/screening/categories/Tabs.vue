<template>
  <div>
    <!-- Tabs -->
    <a-spin :spinning="loading">
      <a-tabs
        v-if="!isEmpty(panes)"
        v-model="activeKey"
        hide-add

        @tabClick="tabClick"
      >
        <a-tab-pane
          v-for="pane in panes"
          :key="pane.globalId"
          :tab="pane.name"
        >
          <TabContent :category="pane" />
          <a-form-item class="text-right"><a-button type="primary" class="w-min-200" v-if="!active" @click="markAcceptance">Accept</a-button></a-form-item>
        </a-tab-pane>
        <!-- // adding button -->
      </a-tabs>
      <a-alert
      v-else
      type="info"
      message="No screening question added by manufacturer">
    </a-alert>
      <!-- Tabs -->
    </a-spin>
  </div>
</template>
<script>
import TabContent from '~/components/root/hospital/screening/categories/TabContent'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'
import nullHelper from '~/mixins/null-helpers'
export default {
  mixins:[routeHelpers,notifications,nullHelper],
  components: { TabContent },
  props: {
    templateId: {
      required: true,
      type: Number,
    },
    manufacturerId: {
      required: true,
      type: Number,
    },
    treatmentTypeId: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      currentCategoryId: null,
      activeKey: null,
      panes: [],
      newTabIndex: 0,
      showCategoryModal: false,
      loading: true,
      active:false,
    }
  },
  mounted() {
    this.fetchList()
    this.getScreeningTempStatus()
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  methods: {
    tabClick() {},
    handleCategoryModal(show) {
      this.showCategoryModal = show
    },
    handleCategory(response) {
      this.fetchList()
      this.handleCategoryModal(false)
    },
    onEdit(targetKey, action, r) {
      this[action](targetKey)
    },
    callback(key) {
      // console.log(key)
    },
    remove(key) {
      this.setCurrentId(key)
      this.handleCategoryModal(true)
    },
    setCurrentId(key) {
      this.currentCategoryId = key
    },
    add() {
      this.setCurrentId(null)
      this.handleCategoryModal(true)
    },
    fetchList() {
      this.loading = true
      ScreeningCategoryServices.get({
        screeningTemplateId: this.templateId,
      })
        .then((response) => {
          this.panes = response.data
        })
        .finally(() => {
          this.loading = false
        })
    },
    getScreeningTempStatus() {
      this.loading = true
      ScreeningTemplateServices.getHospitalTempStatus(this.templateId, this.treatmentTypeId, this.manufacturerId)
        .then((response) => {
          this.active = response.data
        })
        .finally(() => {
          this.loading = false
        }) 
    },
    markAcceptance() {
      this.loading = true
      ScreeningTemplateServices.markAcceptance(this.templateId, this.treatmentTypeId, this.manufacturerId)
        .then((response) => {
          this.success(response.message)
          this.goto('/hospital/administration/screening')
        })
        .finally(() => {
          this.loading = false
        }) 
    },
  },
}
</script>
