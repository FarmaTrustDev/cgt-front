<template>
  <div>
    <FormActionButton text="Add Screening" @click="handleCategoryModal(true)" />
    {{ category }}
    <a-alert
      v-if="data.length <= 0"
      type="info"
      message="No Screenings available"
    ></a-alert>
    <a-list v-else item-layout="horizontal" :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item"
        >{{ item.title }}
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
const data = []
export default {
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
    console.log('tabKey', this.tabKey)
  },
  methods: {
    handleCategoryModal(show) {
      this.showScreeningModal = show
    },
    handleUpsert(response) {
      console.log('response', response)
    },
  },
}
</script>
