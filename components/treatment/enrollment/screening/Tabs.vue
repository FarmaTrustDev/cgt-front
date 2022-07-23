<template>
  <div>
    <a-tabs v-model="activeKey" hide-add type="editable-card">
      <a-tab-pane
        v-for="(category, index) in categories"
        :key="category.globalId"
        :closable="false"
        :tab="category.name"
        :force-render="true"
      >
        <tabContent
          :screenings="category.screenings"
          @getFilledDatas="getFilledData"
        />
        <FormActionButton
          v-if="!tabsSubmitButton[`${index}`]"
          html-type="button"
          :text="getButtonText(category.name) + '-' + index"
          class="mt-15"
          @click="getNextTab(index, category.screenings, category.name)"
        />
        <alert
          v-if="showValidationError"
          type="warning"
          message="All fields are Required"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import tabContent from '~/components/treatment/enrollment/screening/TabsContent'
import nullHelper from '~/mixins/null-helpers'
import alert from '~/components/alert'
import notifications from '~/mixins/notifications'
export default {
  components: { tabContent, alert },
  mixins: [nullHelper, notifications],
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
      disabled: false,
      filledData: 0,
      catName: '',
      isHidden: true,
      showValidationError: false,
      tabsSubmitButton: {},
    }
  },
  mounted() {
    this.setCurrentTab(this.newTabIndex)
  },
  methods: {
    setCurrentTab(key) {
      const categories = this.categories
      if (!this.isEmpty(this.categories)) {
        if (!this.isEmpty(this.categories[key])) {
          this.activeKey = categories[key].globalId
          // this.isHidden = true this button active
        }
      }
    },
    getButtonText(val) {
      return this.$store.getters.getTranslation.ComplScree_3_469 + val
    },
    getNextTab(index, screening) {
      if (this.filledData === screening.length) {
        this.isHidden = false
        this.setCurrentTab(index + 1)
        this.showValidationError = false

        this.tabsSubmitButton = JSON.stringify(this.tabsSubmitButton)
        this.tabsSubmitButton = JSON.parse(this.tabsSubmitButton)
        this.tabsSubmitButton[index] = true
      } else {
        this.confirm(
          'The screening checklist will not proceed with the No answer(s).Correct them.'
        )
      }
      
    },
    getFilledData(vals) {
      this.filledData = vals
    },
    tabChange(key) {
      this.newTabIndex = key + 1
    },
  },
}
</script>
