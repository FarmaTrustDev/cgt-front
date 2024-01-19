<template>
    <div>
        <a-button type="primary" @click="goto('/superAdmin/entities/addOrganization/form?name='+orgType)">+ {{translation.Add_1_488}} {{buttonName}}</a-button>
        <a-table :columns="columns" :data-source="organization">
         <template slot="action" slot-scope="action">
          <a-dropdown>
            <!-- <a-button class="action-button" @click="preventDefault"> -->
               <a-icon type="more" @click="preventDefault" />
            <!-- </a-button> -->
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a 
                @click="goto(`/superAdmin/entities/addOrganization/${action}?name=`+orgType)"
                >{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
              <a-menu-item key="2">
                <!-- <a-popconfirm
                  :title="translation.Areyou_4_484"
                  :ok-text="translation.yes_1_654"
                  :cancel-text="translation.no_1_656"
                  placement="topLeft"
                  @confirm="deleteUser(`${action}`)"
                >
                  {{ translation.Delet_1_451 }}
                </a-popconfirm> -->
                <span @click="orgDelete(true, action.globalId)">{{ translation.Delet_1_451 }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
        </a-table>
        <a-modal
      :visible="orgDeleteModal"
      :footer="null"
      class="error-model"
      @cancel="orgDelete(false, '')"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
        <h3>
          {{translation.Areyou_10_942}}
        </h3>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="orgDeleteMethod()"
            >{{translation.Confi_1_646}}</a-button
          >
          <a-button
            class="ant-btn"
            style="padding: 5px 50px"
            type="danger"
            @click="orgDelete(false, '')"
          >
            {{translation.cance_1_296}}
          </a-button>
        </footer>
      </center>
            </a-modal>
    </div>
</template>
<script>
import OrganizationServices from '~/services/API/OrganizationServices'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
export default {
    mixins:[routeHelpers],
    props:{
        alias:{
            type: String,
            require: true,
            default:''
        },
        fieldName:{
            type: String,
            default:'',
            require: true
        },
        titleText:{
            type: String,
            default:'',
            require: true
        },
    },
    data()
    {
        return{
         organization :[],
         buttonName : this.titleText,
         orgType:this.fieldName,
        columns:[
        {            
            title: this.titleText,
            dataIndex:'name',
            key:'name'
        },
        {
            title:`${this.$store.getters.getTranslation.Conta_1_542}`,
            dataIndex: 'phone',
            key: 'contact'
        },
        {
            title: `${this.$store.getters.getTranslation.Email_1_511}`,
            dataIndex:'email',
            key:''
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'globalId',
          scopedSlots: {
            customRender: 'action',
          },
        },
         ],
         orgDeleteModal: false,
         orgId : ''

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
          this.columns[0].title=this.titleText
          this.columns[1].title=newValues.Conta_1_542
          this.columns[2].title=newValues.Email_1_511
          this.columns[3].title=newValues.Actio_1_220
          this.buttonName = this.titleText
        }
      },
      organization(newValue, oldValue)
      {
        if(newValue !== oldValue)
        {
          this.organization = newValue
        }
      }
    },
    mounted(){
        this.fetch();
    },
    methods:{
        preventDefault,
            orgDeleteMethod() {
      this.deleteUser(this.orgId)
      this.userDeleteModal = false
    },
    orgDelete(e, record) {
      this.orgId = record
      this.orgDeleteModal = e
    },
    fetch()
    {
        OrganizationServices.get({ organizationTypeAlias: this.alias })
            .then((response) => {
                this.organization = response.data
                })
    },
    deleteUser(id)
    {
      OrganizationServices.destroy(id)
      .then((response)=>{
        this.fetch();
        })
    }
    }
}
</script>