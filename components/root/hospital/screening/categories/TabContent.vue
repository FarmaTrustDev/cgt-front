<template>
  <div>
    <a-list item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" class="ml-80" slot-scope="item"
        >{{ item.name }}
      </a-list-item>
    </a-list>
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
