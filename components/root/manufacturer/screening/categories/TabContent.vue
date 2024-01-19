<template>
  <div>
    <FormActionButton
      text="Add Question"
      class="mt-5"
      @click="handleCategoryModal(true)"
    />
    <a-alert
      v-if="data.length <= 0"
      type="info"
      :message="translation.Thereare_8_1004"
    >
    </a-alert>
    <a-list
      v-else
      item-layout="horizontal"
      :data-source="data"
      class="admin-screenging-questions"
    >
      <a-list-item slot="renderItem" slot-scope="item" :class="!item.active ? 'amended-category' : ''">
        <div>{{ item.name }}</div>
        <a slot="actions">
          <a-dropdown>
            <a-icon type="more" />
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a-icon type="edit" @click ="edit(item.id)" />{{ translation.Edit_1_450 }}
              </a-menu-item>
              <a-menu-item key="2">
                <!-- <a-popconfirm
                  title="Are you sure you want to delete this question?"
                  :ok-text="translation.yes_1_654"
                  :cancel-text="translation.no_1_656"
                  placement="topLeft"
                  @confirm="deleteScreening(item.id)"
                > -->
                  <span @click="stepDeleteModal(true,item.id)"><a-icon type="delete" />{{
                    translation.Delet_1_451
                  }}</span>
                  <!-- </a-popconfirm> -->
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <!-- <a-button type="link"><a-icon type="more" /></a-button> -->
        </a>
      </a-list-item>
    </a-list>
    <a-modal
      :visible="visibleDeleteModal"
      :ok-text="translation.Ok_1_663"
      :footer="null"
      class="error-model"
      @cancel="stepDeleteModal(false, '')"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
        <h3>{{translation.Areyou_10_900}}</h3>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="stepDelete()"
            >{{translation.Confi_1_646}}</a-button
          >
          <a-button
            class="ant-btn"
            style="padding: 5px 50px"
            type="danger"
            @click="stepDeleteModal(false, '')"
          >
            Cancel
          </a-button>
        </footer>
      </center>
    </a-modal>
    <a-modal
      v-model="showScreeningModal"
      :destroy-on-close="true"
      :title="translation.Categ_1_1154"
      :footer="null"
      @cancel="handleCategoryModal(false)"
    >
      <Form
        :category-id="categoryId"
        :category="category"
        @close="handleCategoryModal"
        @upsert="handleUpsert"
        @getScreenTempStatusIndex="getScreenTempStatus"
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
  mixins: [nullHelper, routeHelpers],
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
      visibleDeleteModal: false,
      showScreeningModal: false,
      deleteStep:'',
      categoryId : null
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch: {
    category(newData, oldData) {
      if (newData.globalId !== oldData.globalId) {
        this.fetch()
      }
    },
  },
  mounted() {
    if (!this.isEmpty(this.category)) {
      this.fetch()
    }
  },
  methods: {
    stepDelete() {
      this.deleteScreening(this.deleteStep)
      this.stepDeleteModal(false, '')
    },
    stepDeleteModal(e, step) {
      this.deleteStep = step
      this.visibleDeleteModal = e
    },
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
    getScreenTempStatus() {
      this.$emit('getScreenTempStatusTabCon')
    },
    deleteScreening(id) {
      ScreeningServices.destroy(id).then((response) => {
        this.goto('/manufacturer/administration/screening')
      })
      // alert(name)
    },
    edit(key)
    {
      this.categoryId = key
      this.handleCategoryModal(true)
    },
  },
}
</script>
