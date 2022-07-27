<template>
  <span>
      <h1 class="page-title">Treatment Type: {{checkData(categories)}}</h1>
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
  },
  data() {
    return {
      treatmentTypeName : '',
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
    }
  },
  methods:{
    checkData(categories)
    {
        return !isEmpty(categories)?categories[0].treatmentTypeName: 'N/A' ;
    }
  }
}
</script>
