<template>
  <div>
    <FormActionButton text="Add Question" class="mt-5" @click="handleCategoryModal(true)" />
    <a-alert
      v-if="data.length <= 0"
      type="info"
      :message="translation.NoScree_3_475"
    >
    </a-alert>
    <a-list v-else item-layout="horizontal" :data-source="data" class="admin-screenging-questions">
      <a-list-item slot="renderItem" slot-scope="item"
        >
        {{ item.name }}
        <a slot="actions">
          <a-dropdown>
            <a-icon type="more" />
            <a-menu slot="overlay">
              <a-menu-item key="1"> <a-icon type="edit" />{{translation.Edit_1_450}} </a-menu-item>
              <a-menu-item key="2" >
                <a-popconfirm
              :title="translation.Areyou_4_484"
              :ok-text="translation.yes_1_654"
              :cancel-text="translation.no_1_656"
              placement="topLeft"
              @confirm="deleteScreening(item.id)"
            >
                <a-icon type="delete" />{{translation.Delet_1_451}}</a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- <a-button type="link"><a-icon type="more" /></a-button> -->
        </a>
      </a-list-item>
    </a-list>

    <a-modal
      v-model="showScreeningModal"
      :destroy-on-close="true"
      title="Category"
      :footer="null"
      @cancel="handleCategoryModal(false)"
    >
      <Form
        :category="category"
        @close="handleCategoryModal"
        @upsert="handleUpsert"
      />
    </a-modal>
  </div>
</template>
<script>
import Form from '~/components/root/manufacturer/screening/formField/index.vue'
import ScreeningServices from '~/services/API/ScreeningServices'
import nullHelper from '~/mixins/null-helpers'
import routeHelpers from '~/mixins/route-helpers'

const data = []
export default {
  components: { Form },
  mixins: [nullHelper,routeHelpers],
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
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    if (!this.isEmpty(this.category)) {
      this.fetch()
    }
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
      ScreeningServices.destroy(id).then((response)=>{
        this.goto('/manufacturer/administration/screening')
      })
      // alert(name)
    },
  },
}
</script>
