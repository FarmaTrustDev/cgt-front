<template>
    <div>
        <a-button type="primary" @click="goto('/superAdmin/entities/addOrganization/form?name='+buttonName)">+ Add {{buttonName}}</a-button>
        <a-table :columns="columns" :data-source="organization">
         <template slot="action" slot-scope="action">
          <a-dropdown>
            <!-- <a-button class="action-button" @click="preventDefault"> -->
               <a-icon type="more" @click="preventDefault" />
            <!-- </a-button> -->
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <!-- @click="goto(`/superAdmin/entities/addHospital/${action}`)" -->
                <a >{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
              <a-menu-item key="2">
                <a-popconfirm
                  :title="translation.Areyou_4_484"
                  :ok-text="translation.yes_1_654"
                  :cancel-text="translation.no_1_656"
                  placement="topLeft"
                  @confirm="deleteUser(`${action.globalId}`)"
                >
                  {{ translation.Delet_1_451 }}
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
        </a-table>
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
    },
    data()
    {
        return{
         organization :[],
         buttonName : this.fieldName,
        columns:[
        {            
            title: this.fieldName,
            dataIndex:'name',
            key:'name'
        },
        {
            title:'Contact',
            dataIndex: 'phone',
            key: 'contact'
        },
        {
            title: 'Email',
            dataIndex:'email',
            key:''
        },
        {
          title: ``,
          dataIndex: 'globalId',
          scopedSlots: {
            customRender: 'action',
          },
        },
         ]
        }
    },
    computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
    mounted(){
        this.fetch();
    },
    methods:{
        preventDefault,
        fetch()
        {
            OrganizationServices.get({ organizationTypeAlias: this.alias })
                .then((response) => {
                    this.organization = response.data
                    })
        }
    }
}
</script>