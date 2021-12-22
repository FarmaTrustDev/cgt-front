<template>
  <div>
    <a-tabs v-model="activeKey" hide-add type="editable-card">
      <a-tab-pane
        v-for="category in categories"
        :key="category.globalId"
        :closable="false"
        :tab="category.name"
      >
        <tabContent :screenings="category.screenings" />
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
    this.setCurrentTab()
  },
  methods: {
    setCurrentTab() {
      console.log('categories', this.isEmpty(this.categories))
      const categories = this.categories
      if (!this.isEmpty(this.categories)) {
        this.activeKey = categories[0].globalId
      }
    },
  },
}
</script>
