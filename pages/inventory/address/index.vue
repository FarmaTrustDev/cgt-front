<template>
    <page-layout
      :create="false"
      :loading="loading"
      :bordered="false"
      title="Address List"
      class="specific container page-search-input-container"
    >
      <template slot="headerMenus">
        <!-- <a-input
          ref="userNameInput"
          class="page-search-input"
          placeholder="search address"
          @change="searchUser"
        > 
          <a-icon slot="prefix" type="search" />
        </a-input>-->
        <a-button type="primary" class="" @click="visibleUploadModal(true)">Upload Addresses</a-button>
      </template>
      <div slot="content">
        <!-- <template slot="content"> -->
        <!-- <h3 class="page-title float-left">
              {{ translation.LabList_2_551 }}
            </h3> -->
  
        <!-- </template> -->
        <a-table
          :columns="columns"
          :data-source="dataSource"
          class="rounded-table"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
          <!-- <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="edit">
                  <a @click="goto(`/inventory/lab/${action.globalId}`)">Edit</a>
                </a-menu-item>
                <a-menu-item key="delete">
                  <a @click="goto(`/inventory/lab/${action.globalId}`)">Delete</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template> -->
        </a-table>
        <a-modal 
       :visible="visibleUpload"
        :loading="loading"
        @cancel="visibleUploadModal(false)"
        @ok="submitFiles"
        >
        <a-upload-dragger
        :file-list="fileList" 
        :remove="handleRemove" 
        :before-upload="beforeUpload"
        :extensions="allowedExtensions"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload <br>(only (.xls, .xlsx, .csv) are allowed)
          </p>
        </a-upload-dragger>
        </a-modal>
      </div>
    </page-layout>
  </template>
  <script>
  import CompanyAddressServices from '~/services/API/CompanyAddressServices'
  // import { success } from '~/services/Helpers/notifications'
  import { preventDefault } from '~/services/Helpers'
  import { EXCEL_DOCUMENT } from '~/services/Constant'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: {
      PageLayout,
    },
    mixins: [routeHelpers],
    data() {
      return {
        visibleUpload:false,
        allowedExtensions: EXCEL_DOCUMENT,
        dataSource: [],
        columns: [
          {
            title: `Company Name`,
            dataIndex: 'companyName',
            key: 'companyName',
          },
          {
            title: `Address`,
            dataIndex: 'address',
            key: 'address',
          },
          {
            title: `Complete Address`,
            dataIndex: 'completeAddress',
            key: 'completeAddress',
          },
          {
            title: `State`,
            dataIndex: 'state',
            key: 'state',
          },
          {
            title: `Country`,
            dataIndex: 'country',
            key: 'country',
          },
          {
            title: `Phone No`,
            dataIndex: 'phoneNo',
            key: 'phoneNo',
          },
          /* {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          }, */
        ],
        loading: false,
        fullName: [],
        fileList:[],
      }
    },
    computed: {
      // ...mapGetters(['getUser']),
      user() {
        return this.$store.getters.getUser
      },
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    /* watch: {
      translation(newValues, oldValue) {
        if (newValues !== oldValue) {
          this.columns[0].title = newValues.Lab_1_566
          this.columns[1].title = newValues.Addre_1_559
          this.columns[2].title = newValues.Headof_3_549
          this.columns[3].title = newValues.City_1_446
          this.columns[4].title = newValues.Count_1_49
          this.columns[5].title = newValues.Actio_1_220
        }
      },
    }, */
    mounted() {
      this.fetch()
      // this.getTranslationData()
    },
    methods: {
        getTranslationData() {
            this.columns[0].title = this.translation.Lab_1_566
            this.columns[1].title = this.translation.Addre_1_559
            this.columns[2].title = this.translation.Headof_3_549
            this.columns[3].title = this.translation.City_1_446
            this.columns[4].title = this.translation.Count_1_49
        },
        preventDefault,
        visibleUploadModal(e){
            this.visibleUpload = e
        },
        fetch() {
        CompanyAddressServices.get()
            .then((response) => {
                this.dataSource = response.data
            })
            .finally(() => (this.loading = false))
        },
        beforeUpload(file) {
            const strName = file.name
            const ext = strName.split('.').pop()
            console.log(this.allowedExtensions)
            const isAllowedExtension = this.allowedExtensions.includes('.' + ext)
            if (!isAllowedExtension) {
                this.$message.error('Extension not allow')
                this.fileList=[]
            }else{
                this.fileList = [...this.fileList, file]
            }
            // return false;
        },
        handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
        },
        submitFiles(){
            this.loading= true
            const formData = new FormData()
            this.fileList.forEach((files) => {
                formData.append('files', files)
            })
            CompanyAddressServices.create(formData).then((response)=>{
                this.visibleUploadModal(false)
                this.fetch()
            }).catch(this.error)
            this.loading= false
            this.fileList=[]
            this.visibleUpload=false
        },
    },
  }
  </script>
<style scoped>
.ant-card-extra {
  /* Customize the styling of the event content here */
    float: right;
    margin-right: -50px;
    padding: 16px 0;
    color: rgba(0, 0, 0, 0.65);
    font-weight: normal;
    font-size: 14px;
}
</style>
  