<template>
  <div>
    <a-tabs v-model="activeKey" hide-add type="editable-card">
      <a-tab-pane
        v-for="(category, index) in categories"
        :key="category.globalId"
        :closable="false"
        :force-render="true"
        :tab="category.name"
      >
        <tabContent
          :form="form"
          :screenings="category.screenings"
          @getFilledDatas="getFilledData"
        />

        <FormActionButton
          v-if="!tabsSubmitButton[`${index}`] && !isEmpty(category.screenings)"
          html-type="button"
          :text="getButtonText(category.name)"
          class="mt-15 screening-btn"
          @click="getNextTab(index, category.screenings, category.name)"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import tabContent from '~/components/treatment/enrollment/screening/TabsContent'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import { isEmpty } from '~/services/Helpers'

export default {
  components: { tabContent },
  mixins: [nullHelper, notifications],
  props: {
    categories: {
      required: true,
      type: Array,
      default: () => [],
    },
    form: {
      required: true,
      type: Object,
      default: () => {},
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

      tabsSubmitButton: {},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
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
      return this.$store.getters.getTranslation.ComplScree_3_469 + ' ' + val
    },
    getNextTab(index, screening) {
      if (this.validateAllList(this.filledData, screening)) {
        this.isHidden = false
        this.setCurrentTab(index + 1)
        this.tabsSubmitButton = JSON.stringify(this.tabsSubmitButton)
        this.tabsSubmitButton = JSON.parse(this.tabsSubmitButton)

        this.tabsSubmitButton[index] = true
      } else {
        this.confirm(this.translation.Thescree_13_720)
      }
    },
    validateAllList(data, screening) {
      //  check if data is not empty
      if (!isEmpty(data) && data) {
        //  remove the empty undefinde from data

        const filterData = data.filter((n) => n)

        //  check if the screen lenth all validation equals
        if (filterData.length === screening.length) {
          const incompleteScreening = filterData.filter(function (screening) {
            return !screening.value && isEmpty(screening.notes)
          })

          return isEmpty(incompleteScreening)
        }
      }
      return false
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
<style scoped>
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active {
  border: none;
}
</style>
