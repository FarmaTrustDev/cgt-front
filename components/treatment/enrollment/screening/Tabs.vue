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
          v-if="isHidden"
          html-type="button"
          :text="getButtonText(category.name)"
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
export default {
  components: { tabContent, alert },
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
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      formLayout: 'vertical',
      showCategoryModal: false,
      loading: true,
      disabled: false,
      filledData: 0,
      catName: '',
      isHidden: true,
      showValidationError: false,
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
          this.isHidden = true
        }
      }
    },
    getButtonText(val) {
      return this.$store.getters.getTranslation.ComplScree_3_469 + val
    },
    getNextTab(index, screening) {
      this.showValidationError = true
      if (this.filledData === screening.length) {
        this.isHidden = false
        this.setCurrentTab(index + 1)
        this.showValidationError = false
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
