<template>
  <div>
    <a-table :data-source="data" :pagination="false" class="rounded-table" :columns="column" />
  </div>
</template>
<script>
import ScreeningServices from '~/services/API/ScreeningServices'
import nullHelper from '~/mixins/null-helpers'
const data = []
export default {
  mixins: [nullHelper],
  props: {
    // categoryId: {
    //   type: String,
    //   required: true,
    // },
    category: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      data,
      column:[
        {
          title:'Questions',
          dataIndex: 'name',
          key: 'name',
        },
      ],      
      showScreeningModal: false,
    }
  },
  mounted() {
    if (!this.isEmpty(this.category)) {
      this.fetch()
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {
    fetch() {
      this.loading = true
      ScreeningServices.get({ screeningCategoryId: this.category.id })
        .then((response) => {
          this.data = response.data
        })
        .finally(() => (this.loading = false))
    },
    handleCategoryModal(show) {
      this.showScreeningModal = show
    },
    handleUpsert(response) {
      this.fetch()
      this.handleCategoryModal(false)
    },
    deleteScreening(id){
      ScreeningServices.destroy(id)
      // alert(name)
    },
  },
}
</script>
