<template>
  <div class="logistics-page">
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
    <a-row :gutter="16" class="grey-card-x">
      <a-col>
        <a-card :bordered="false" class="default-card-x logistic-container">
            <h1 class="page-title heading">{{translation.SelecPartn_2_458}} </h1>
            <br>
            <a-form-item>
              <a-select
                v-decorator="[
                  'LogisticsId',
                  {
                    initialValue: entity.logisticsId,
                    rules: [
                      {
                        required: true,
                        message: translation.seleclogis_3_516,
                      },
                    ],
                  },
                ]"
                mode="multiple"
                :placeholder="translation.seleclogis_3_516"
                style="width: 100%"
                class="default-select"
              >
                <a-select-option v-for="logistic in logistics" :key="logistic.id">
                  {{ logistic.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-checkbox
        v-decorator="[
          `accepted`,
        ]"
        :checked="checked"
        @change="checkChanged"
        :disabled="false"
      >
              <!-- Apply Checkbox -->
                <h3><b>{{translation.Applyto_3_459}}</b></h3>
              </a-checkbox>
            </a-form-item>
            <a-col class="text-right mt-15">
              <FormActionButton :loading="btnLoading" :custom-text="translation['Submi_1_248']" :is-created="isCreated" />
            </a-col>

          </a-card>
      </a-col>

    </a-row>
    </a-form>
  </div>
</template>

<script>
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import { LOGISTIC_ALIAS } from '~/services/Constant'
import OrganizationServices from '~/services/API/OrganizationServices'
import HospitalLogisticServices from '~/services/API/HospitalLogisticServices'
  export default{
    mixins: [routeHelpers, nullHelper, notifications],
    data() {
      return {
        // value: ['fastlink'],
        entityId: null,
        entity:{},
        formLayout: 'vertical',
        logistics: [],
        hospitalLoading: true,
        btnLoading: false,
        isCreated: false,
        checked:false,
        form: this.$form.createForm(this, {
          name: 'screening',
        }),
      };
    },
    computed:{
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.fetchOrganization()
      this.fetchLogistics()
    },    
    methods:{
      fetchOrganization() {
        OrganizationServices.get({ organizationTypeAlias: LOGISTIC_ALIAS })
          .then((response) => {
            this.logistics = response.data
          })
          .finally(() => (this.hospitalLoading = false))
      },     
      save(){
        this.success("Contract Added!")
      },
      fetchLogistics(){
        HospitalLogisticServices.get().then((response)=>{
          this.entity=response.data
          if(this.entity.logisticsId.length>0){
            this.checked=true
          }
        })
      },
      checkChanged(e){
        this.checked=e.target.checked;
      },
      onSubmit(e) {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            if(this.checked){
              this.create(values)
            }else{
              this.destroy()
            }
          } else {
            this.loading = false
          }
        })
        // this.loading = false
      },      
      create(values) {
        this.btnLoading = true
        this.loading = true
        HospitalLogisticServices.create(values).then((response) => {
            this.success(response.message)
            this.btnLoading = false
            this.loading = false
            this.goto('/manufacturer/Administration/logistics')
          })
          .catch(this.error)
          .finally(() => {
            // this.btnLoading = false
            // this.loading = false
            this.loading = false
          })
      },
      destroy() {
        this.btnLoading = true
        this.loading = true
        HospitalLogisticServices.destroyAll().then((response) => {
            this.success(response.message)
            this.btnLoading = false
            this.loading = false
            this.goto('/manufacturer/Administration/logistics')
          })
          .catch(this.error)
          .finally(() => {
            // this.btnLoading = false
            // this.loading = false
            this.loading = false
          })
      },      
    },
  }
</script>