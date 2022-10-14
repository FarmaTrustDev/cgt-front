<template>
<div>
  <page-layout
    title="Treatment Types"
    class="specific container page-search-input-container"
    :loading="loading"
    :create="false"
    :pagination="{
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50', '100'],
    }"
  >
    <template slot="headerMenus">
      <a-input
        class="page-search-input"
        ref="userNameInput"
        placeholder="Search"
      >
        <!-- @change="searchUser" -->
        <a-icon slot="prefix" type="search" />
      </a-input>
      <a-button type="primary" @click="showModal">Add Treatment Type</a-button>
    </template>
    <div slot="content">
      <a-table
        :columns="column"
        :data-source="treatmentTypes"
        :loading="loading"
        class="rounded-table pt-10 users-list"
      >
        <div slot="action" slot-scope="action, slot">
          <a-button type="danger" @click="treatTypeDelete(true ,slot.id)">Delete</a-button>
        </div>
      </a-table>
    </div>
  </page-layout>
  <a-modal
      title="Add Treatment Type"
      :visible="visible"
      :footer="null"
      @ok="handleOk"
      @cancel="handleCancel"
    >
    <a-form :form="form" @submit="handleSubmit">
           <a-form-item>
          <!-- v-model="treatmentCancelReason" -->
          <a-textarea
            v-decorator="[
              'treatmentType',
              {
                initialValue: treatmentTypes.name,
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            placeholder="Treatment Type"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="float-right"
          >
            Submit
          </a-button>
        </a-form-item>
        </a-form>
    </a-modal>
    <a-modal
    :visible = "responseModal"
    :footer="null"
    @cancel="handleResponseModal(false)"
    >
       <center> 
        <p class="cross-img">
        <span class="inner-mark">
          <span class="line-left line"></span>
          <span class="line-right line"></span>
        </span>
      </p>
      {{successResponse}}
      <footer class="mt-6">
        <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="handleResponseModal(false)"
            >Ok</a-button
          >
      </footer>
      </center>
    </a-modal>
     <a-modal
      :visible="treatTypeDeleteModal"
      :footer="null"
      class="error-model"
      @cancel="treatTypeDelete(false, '')"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
        <h3>
          Are you sure you want to delete this treatment type ?
        </h3>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="treatTypeDeleteMethod()"
            >Confirm</a-button
          >
          <a-button
            class="ant-btn text-cancel"
            style="padding: 5px 50px"
            @click="treatTypeDelete(false, '')"
          >
            Cancel
          </a-button>
        </footer>
      </center>
            </a-modal>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import TreatmentTypeService from '~/services/API/TreatmentTypeServices'
import PageLayout from '~/components/layout/PageLayout'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { PageLayout },
  mixins:[withCrud],
  data() {
    return {
      treatmentTypes: [],
      column: [
        {
          title: 'Treatment Type',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      visible: false,
      loading:false,
      responseModal: false,
      successResponse: '',
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'TreatmentTypeCreate',
      }),
      treatmentType: '',
      treatTypeDeleteModal: false,
      treatTypeId : ''

    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchTreamentTypes()
  },
  methods: {
    treatTypeDeleteMethod() {
      this.deleteType(this.treatTypeId)
      this.treatTypeDeleteModal = false
    },
    treatTypeDelete(e, record) {
      this.treatTypeId = record
      this.treatTypeDeleteModal = e
    },
    handleSubmit(e)
    {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err,values)=>{
            if(!err)
            {
                TreatmentTypeService.create(values.treatmentType)
                .then((response)=>{
                    success(response.message)
                    
                }).catch((e)=>
                {
                    if(!isEmpty(e.response))
                    this.handleResponseModal(true)
                    this.successResponse = e.response.data.message
                }).finally(this.loading=false)
                this.treatmentType = ''
                this.handleCancel();
            }
                this.fetchTreamentTypes();
        })
    },
    deleteType(id)
    {
        this.loading = true
        TreatmentTypeService.deleteById(id)
        .then((response)=>
            {
                this.fetchTreamentTypes();
            }
        ).catch((e)=>{
            if(!isEmpty(e.response))
            {
                    this.handleResponseModal(true)
                    this.successResponse = e.response.data.message
            }
        })
        .finally(this.loading = false)
    },
    showModal() {
      this.visible = true
    },
    fetchTreamentTypes() {
        this.loading = true
      TreatmentTypeService.getActive().then((response) => {
        this.treatmentTypes = response.data
      }).finally(this.loading = false)
    },
    handleResponseModal(e)
    {
        this.responseModal = e
    },
    handleOk(e) {
      this.visible = false
    },
    handleCancel(e) {
      this.visible = false
    },
  },
}
</script>
