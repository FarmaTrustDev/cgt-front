<template>
  <div>
    <div :style="{ marginBottom: '16px' }">
      <a-button @click="add"> Add Category </a-button>
    </div>
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      >
        <a-button slot="tabBarExtraContent" type="primary"
          >tabBarExtraContent</a-button
        >
        {{ pane.content }}
      </a-tab-pane>
    </a-tabs>

    <a-modal
      v-model="showCategoryModal"
      :destroy-on-close="true"
      title="Category"
      :footer="null"
      @cancel="handleCategoryModal(false)"
    >
      <Form
        :template-id="templateId"
        @close="handleCategoryModal"
        @upsert="handleCategory"
      />
    </a-modal>
  </div>
</template>
<script>
import Form from '~/components/pages/manufacturer/screening/categories/Form'
export default {
  components: { Form },
  props: {
    templateId: {
      required: true,
      type: Number,
    },
  },
  data() {
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    ]
    return {
      activeKey: null,
      panes,
      newTabIndex: 0,
      showCategoryModal: false,
    }
  },
  methods: {
    handleCategoryModal(show) {
      this.showCategoryModal = show
    },
    handleCategory(response) {
      this.handleCategoryModal(false)
    },
    callback(key) {
      // console.log(key)
    },
    onEdit(targetKey, action) {
      this[action](targetKey)
    },
    add() {
      this.handleCategoryModal(true)
    },
    remove(targetKey) {},
  },
}
</script>
