<template>
  <span :loading="loading">
      <h1 v-if="!isEmpty(treatmentTypeName)" class="page-title">{{translation['TreatType_2_67']}}: {{treatmentTypeName}}</h1>
    <a-tabs class="screening-tabs">
      <a-tab-pane
        v-for="category in categories"
        :key="category.id"
        :tab="category.name"
      >
        <standardTable
          :columns="column"
          :dump-data="category.screenings"
          :should-fetch="false"
          :show-pagination="false"
        />
      </a-tab-pane>
       </a-tabs
  ></span>
</template>
<script>
import standardTable from '~/components/common/StandardTable'
import { isEmpty } from '~/services/Helpers'
export default {
  components: { standardTable },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    treatmentTypeName:{
      type: String,
    },
  },
  data() {
    return {
      column: [
        {
          title: `${this.$store.getters.getTranslation.Detai_1_346}`,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: `${this.$store.getters.getTranslation.Notes_1_350}`,
          dataIndex: 'notes',
          key: 'notes',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'isCheck',
          key: 'isCheck',
          scopedSlots: { customRender: 'check' },
        },
      ],
      loading: true
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[0].title=newValues.Detai_1_346
        this.column[1].title=newValues.Notes_1_350
        this.column[2].title=newValues.Actio_1_220
      }
    }
  },    
  methods:{
    isEmpty,
  }
}
</script>
