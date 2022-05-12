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
      
        <tabContent :screenings="category.screenings" @getFilledDatas="getFilledData" />
        <FormActionButton :disabled="filledData==category.screenings.length && category.name==catName" :text="getButtonText(category.name)" @click="getNextTab(index,category.screenings,category.name)" class="mt-15" />
      
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
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      formLayout: 'vertical',
      showCategoryModal: false,
      loading: true,
      disabled:false,
      filledData:0,
      catName:'',
    }
  },
  mounted() {
    this.setCurrentTab(this.newTabIndex)
  },
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.disabled=true
        } else {
          this.loading = false
        }
        this.loading = false
      })
    },
    setCurrentTab(key) {
      const categories = this.categories
      if (!this.isEmpty(this.categories)) {
        if(!this.isEmpty(this.categories[key])){
          this.activeKey = categories[key].globalId
        }
      }
    },
    getButtonText(val){
      return "Complete Screening for "+ val
    },
    getNextTab(index,screening, categoryName) {
      if(this.filledData===screening.length){
        this.setCurrentTab(index+1)
        this.catName=categoryName
      }    
    },
    getFilledData(vals){
      this.filledData=vals
    },
    tabChange(key) {
      this.newTabIndex = key+1
    },
  },
}
</script>
