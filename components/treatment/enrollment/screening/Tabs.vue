<template>
  <div>
    <a-tabs v-model="activeKey" hide-add type="editable-card">
      <a-tab-pane
        v-for="(category) in categories"
        :key="category.globalId"
        :closable="false"
        :tab="category.name"
        :force-render="true"
      >
        <tabContent :screenings="category.screenings" />
        <FormActionButton :text="getButtonText(category.name)" @click="getNextTab" class="mt-15" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import tabContent from '~/components/treatment/enrollment/screening/TabsContent'
import nullHelper from '~/mixins/null-helpers'
export default {
  components: { tabContent },
  mixins: [nullHelper],
  props: {
    categories: {
      required: true,
      type: Array,
      default: () => [],
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
    this.setCurrentTab(this.newTabIndex)
  },
  methods: {
    setCurrentTab(key) {
      const categories = this.categories
      if (!this.isEmpty(this.categories)) {
        this.activeKey = categories[key].globalId
      }
    },
    getButtonText(val){
      return "Complete Screening for "+ val
    },
    getNextTab() {
      this.newTabIndex=this.newTabIndex+1
      this.setCurrentTab(this.newTabIndex)
    },
    tabChange(key) {
      this.newTabIndex = key+1
    },
  },
}
</script>
