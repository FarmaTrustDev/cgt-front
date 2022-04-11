<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
    <a-tabs v-model="activeKey" hide-add type="editable-card">
      <a-tab-pane
        v-for="(category) in categories"
        :key="category.globalId"
        :closable="false"
        :tab="category.name"
        :force-render="true"
      >
      
        <tabContent :screenings="category.screenings" />
        <FormActionButton :disabled="disabled" :text="getButtonText(category.name)" @click="getNextTab" class="mt-15" />
      
      </a-tab-pane>
    </a-tabs>
    </a-form>  
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
