<template>
    <page-layout
      :loading="false"
      title="Projects/Studies"
      subTitle="Nurse"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      <template slot="headerMenus">
       
        <!-- <a-input
          ref="userNameInput"
          class="page-search-input"
          placeholder="Search Project"
        >
          <a-icon slot="prefix" type="search" />
        </a-input> -->
        <a-button type="primary" @click="goto('/project/create')">Add New Project</a-button>
      </template>
      <div slot="content">
        <a-table
          :columns="columns"
          :data-source="datasource"
          :loading="loading"
          class="rounded-table pt-10 users-list"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        <template slot="projectId" slot-scope="projectId">
          <span>
            <a @click="goto(`/project/newProcess?id=${projectId.globalId}`)">{{
                    projectId.projectId
                  }}</a>
          </span>
        </template>
        <template slot="projectName" slot-scope="projectName">
          <span>
            <a @click="goto(`/project/newProcess?id=${projectName.globalId}`)">{{
                    projectName.description
                  }}</a>
          </span>
        </template>
        <template slot="qp" slot-scope="qp">
          <span>
            <a-button
              class="print-btn"
              type="primary"
              size="small"
              @click="goto(`/project/qpProcess?id=${qp.globalId}`)"
              >Create QP</a-button
            >
          </span>
        </template>
        <template slot="projectDate" slot-scope="projectDate">
          <span>
            {{ moment(projectDate.projectDate).format('DD/MM/YYYY') }}
          </span>
        </template>
        <template slot="investigator" slot-scope="investigator">
          <span v-for="ivestigator,index in investigator.investigators" :key="index+'inv'">
            {{ivestigator.investigatorName + " "}}
          </span>
        </template>
          <template slot="action" slot-scope="action">
            <a-dropdown>
              <a-button class="action-button" @click="preventDefault">
                Admin <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="goto(`/project/${action.globalId}`)">Edit</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <!-- <a-popconfirm
                    :title="translation.Areyou_4_484"
                    :ok-text="translation.yes_1_654"
                    :cancel-text="translation.no_1_656"
                    placement="topLeft"
                    @confirm="deleteUser(`${action.globalId}`)"
                  >
                  </a-popconfirm> -->
                  <span>Delete</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        <a-modal
          :visible="userDeleteModal"
          :footer="null"
          class="error-model"
        >
          <center>
            <p class="cross-img">
              <span class="inner-mark">
                <span class="line-left line"></span>
                <span class="line-right line"></span>
              </span>
            </p>
            <h3>Are you sure you want to delete this user ?</h3>
            <footer class="mt-6">
              <a-button
                class="ant-btn ant-btn-primary"
                style="padding: 5px 50px"
                >{{translation.Confi_1_646}}</a-button
              >
              <a-button
                class="ant-btn"
                style="padding: 5px 50px"
                type="danger"
              >
              {{translation.cance_1_296}}
              </a-button>
            </footer>
          </center>
        </a-modal>
      </div>
    </page-layout>
  </template>
  <script>
  import moment from 'moment'
  import ProjectServices from '~/services/API/ProjectServices'
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        datasource: [],
        dummyDataSource:[
          {
            id:'123-456',
            name:'Cancer Treatment',
            projectDate:'2023-03-01',
            projectInvestigator:'McGrath',
          },
          {
            id:'785-456',
            name:'Cell Treatment',
            projectDate:'2023-03-01',
            projectInvestigator:'McGill',
          },
        ],
        columns: [
          {
            title: 'Project ID',
            key: 'id',
            scopedSlots: { customRender: 'projectId' },
          },
          {
            title: 'Project Name',
            key: 'description',
            scopedSlots: { customRender: 'projectName' },
          },
          {
            title: 'Task',
            key: 'taskName',
            dataIndex: 'taskName',
          },
          {
            title:'Date',
            key: 'projectDate',
            scopedSlots: { customRender: 'projectDate' },
          },
          {
            title: 'Principle Investigator',
            key: 'projectInvestigator',
            scopedSlots: { customRender: 'investigator' },
          },
          {
            title: 'Create QP',
            key: 'qp',
            scopedSlots: { customRender: 'qp' },
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        userDeleteModal: false,
        loading: true,
        fullName: [],
        userId: '',
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.fetch()
    },
    methods: {
      preventDefault,
      moment,
      fetch() {
        ProjectServices.get()
          .then((response) => {
            this.datasource = response.data
          }).catch(this.error)
          .finally(() => (this.loading = false))
      },
    },
  }
  </script>
  