<template>
  <div>
    <FormActionButton text="Add Screening" @click="handleCategoryModal(true)" />

    <a-alert
      v-if="data.length <= 0"
      type="info"
      message="No Screenings available"
    ></a-alert>
    <a-list v-else item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item"
        >{{ item.name }}
        <a slot="actions">
          <a-dropdown>
            <a-icon type="more" />
            <a-menu slot="overlay">
              <a-menu-item key="1"> <a-icon type="edit" />Edit </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="delete" />Delete
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
import Form from '~/components/pages/manufacturer/screening/Form'
import ScreeningServices from '~/services/API/ScreeningServices'
import nullHelper from '~/mixins/null-helpers'
const data = []
export default {
  mixins: [nullHelper],
  components: { Form },
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

      console.log('response', response)
    },
  },
}
</script>
