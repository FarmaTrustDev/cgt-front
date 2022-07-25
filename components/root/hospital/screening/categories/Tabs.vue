<template>
  <div>
    <!-- Tabs -->
    <a-spin :spinning="loading">
      <a-tabs
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
        </a-tab-pane>
        <!-- // adding button -->
      </a-tabs>

      <!-- Tabs -->
    </a-spin>
  </div>
</template>
<script>
import TabContent from '~/components/root/hospital/screening/categories/TabContent'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
export default {
  components: { TabContent },
  props: {
    templateId: {
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
    }
  },
  mounted() {
    this.fetchList()
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
  },
}
</script>
