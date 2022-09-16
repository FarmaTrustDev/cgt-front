<template>
  <div  class="ant-list-grid-item">
      <a-row>
      <a-col :span="23">
      <a-list :grid="{ gutter: 16, column: 6}" :data-source="panes">
        <a-list-item slot="renderItem" slot-scope="item" >
        <div class="cursor-pointer" @click="paneData(item)"> {{item.name}}</div>
        <a slot="actions">
          <a-dropdown>
            <a-icon type="more" />
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="edit(item.globalId)"> <a-icon type="edit" />{{translation.Edit_1_450}} </a-menu-item>
              <a-menu-item key="2" >
                <a-popconfirm
                  title="Are you sure you want to delete this group?"
                  :ok-text="translation.yes_1_654"
                  :cancel-text="translation.no_1_656"
                  placement="topLeft"
                  @confirm="checkReference(item.globalId)"
                  >
                <a-icon type="delete" />{{translation.Delet_1_451}}</a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a>
        </a-list-item>
      </a-list>
      </a-col>
      <a-col :span="1">
      <a-icon type="plus-circle" theme="filled" class="float-right" :style="{ fontSize: '30px', color: '#08c' }" @click="add"/>
      </a-col>
      </a-row>
      <TabContent v-if="dataAvailable" :category="fillData"  @getScreenTempStatusTabCon="getScreenTempStatus" />
    <a-modal
      v-model="showCategoryModal"
      :destroy-on-close="true"
      :title="catagoryModalTitle"
      :footer="null"
      @cancel="handleCategoryModal(false)"
    >
      <Form
        :category-id="currentCategoryId"
        :template-id="templateId"
        @close="handleCategoryModal"
        @upsert="handleCategory"
      />
    </a-modal>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import Form from '~/components/root/manufacturer/screening/categories/Form'
import TabContent from '~/components/root/manufacturer/screening/categories/TabContent'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
export default {
  components: { Form, TabContent },
  mixins: [withCrud],
  props: {
    templateId: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      currentCategoryId: null,
      activeKey: null,
      panes: [],
      fillData : '',
      newTabIndex: 0,
      apiService: ScreeningCategoryServices,
      dataAvailable : false,
      current : '',
      showCategoryModal: false,
      loading: true,
      isCreated: false,
      catagoryModalTitle: 'Add Group Name'
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    tabClick(){},
    onChange(current) {
      this.current = current;
    },
    checkReference(id)
    {
    if (!this.isEmpty(id)) {
      this.isCreated = true
      this.loading = true
      ScreeningCategoryServices.getById(id)
        .then((response) => {
          this.entity = response.data
          this.entityId = this.entity.globalId
          this.onDelete()
        })
        .finally(() => (this.loading = false))
    }
    },
    handleCategoryModal(show) {
      this.showCategoryModal = show
    },
    handleCategory(response) {
      this.fetchList()
      this.handleCategoryModal(false)
    },
    onEdit(targetKey, action, r) {
      this[action](targetKey)
    },
    callback(key) {
      // console.log(key)
    },
    paneData(data)
    {
      this.fillData = data
      this.dataAvailable = true
    },
    edit(key) {
      this.setCurrentId(key)
      this.catagoryModalTitle = 'Update Group Name'
      this.handleCategoryModal(true)
    },
    setCurrentId(key) {
      this.currentCategoryId = key
    },
    afterDelete(response)
    {
      this.handleCategory(response)
    },
    add() {
      this.setCurrentId(null)
      this.catagoryModalTitle = 'Add Group Name'
      this.handleCategoryModal(true)
    },
    getScreenTempStatus(){
      this.$emit('getScreenTempStatusTab')
    },
    fetchList() {
      this.loading = true
      ScreeningCategoryServices.get({
        screeningTemplateId: this.templateId,
      })
        .then((response) => {
          this.panes = response.data
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
