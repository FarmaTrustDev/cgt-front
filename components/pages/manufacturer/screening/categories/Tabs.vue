<template>
  <div>
    <!-- Tabs -->
    <a-spin :spinning="loading">
      <a-tabs
        v-model="activeKey"
        hide-add
        type="editable-card"
        @tabClick="tabClick"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="pane in panes"
          :key="pane.globalId"
          :tab="pane.name"
          :closable="pane.closable"
          :editable="pane.closable"
        >
          <TabContent :category="pane" />
        </a-tab-pane>
        <!-- // adding button -->
        <a-button slot="tabBarExtraContent" type="primary" @click="add">
          Add Category
        </a-button>
      </a-tabs>

      <!-- Tabs -->
    </a-spin>
    <a-modal
      v-model="showCategoryModal"
      :destroy-on-close="true"
      title="Category"
      :footer="null"
      @cancel="handleCategoryModal(false)"
    >
      <Form
        :category-id="currentCategoryId"
        :template-id="templateId"
        @close="handleCategoryModal"
        @upsert="handleCategory"
      />
    </a-modal>
  </div>
</template>
<script>
import Form from '~/components/pages/manufacturer/screening/categories/Form'
import TabContent from '~/components/pages/manufacturer/screening/categories/TabContent'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
export default {
  components: { Form, TabContent },
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
    remove(key, asd) {
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
