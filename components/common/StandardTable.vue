<template>
  <a-table
    :loading="loading"
    :pagination="{
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50', '100'],
    }"
    :columns="columns"
    :data-source="data"
    :class="{ 'rounded-table': rounded, 'patient-table': patient }"
  >
    <template slot="customTitle">
      <div class="text-left treatment-title">Treatment Type</div>
      <div class="text-left treatment-title">Treatment Status</div>
    </template>

    <template slot="name" slot-scope="name">
      <strong>{{ name }}</strong>
    </template>

    <span slot="treatment_status" slot-scope="text, record">
      <div class="treatment-steps">
        <span v-for="treatment in record.treatments" :key="treatment.id">
          <!-- <span class="treatment-name-col">

          </span> -->
          <span class="step-col">
            <span class="treatment-name-col">{{
              treatment.treatmentTypeName
            }}</span>
            <a-steps :current="getCurrentStep(treatment)" size="small">
              <a-step title="Screening" @click="stepClick(record, treatment)" />
              <span class="sep-line sep-line-active"></span>
              <a-step
                title="Scheduling"
                @click="stepClick(record, treatment)"
              />
              <span class="sep-line"></span>
              <a-step
                class="ant-steps-item-active"
                title="Collection"
                @click="gotoCollectionScreen(record, treatment)"
              />
              <a-step
                title="Shipment"
                @click="gotoCollectionScreen(record, treatment)"
              />
              <a-step
                title="Treatment"
                @click="gotoCollectionScreen(record, treatment)"
              />
              <span class="sep-line"></span>
              <a-step title="Shipment" @click="stepClick(record, treatment)" />
              <span class="sep-line"></span>
              <a-step title="Treatment" @click="stepClick(record, treatment)" />
              <span class="sep-line"></span>
              <a-step
                title="After care"
                @click="gotoCollectionScreen(record, treatment)"
              />
            </a-steps>

            <a-button
              class="btn-view-timeline"
              type="primary"
              size="small"
              @click="gotoView(record, treatment)"
              >View</a-button
            >
          </span>
        </span>
      </div>
    </span>

    <span slot="action" slot-scope="text, record">
      <a-button type="link" @click="goto(`${actionLink}/${record.globalId}`)">
        <a-icon type="edit" />
      </a-button>
    </span>

    <span slot="upsertDropdown" slot-scope="text, record">
      <a-dropdown>
        <a-button class="action-button" @click="preventDefault">
          <b><a-icon type="more" /></b>
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="clickUpdate(record)">
            <a-icon type="edit" />Update
          </a-menu-item>

          <a-menu-item key="3"
            ><a-popconfirm
              title="Are you sure delete ?"
              ok-text="Yes"
              cancel-text="No"
              placement="topLeft"
              @confirm="clickDelete(record)"
            >
              <a-icon type="delete" />Delete
            </a-popconfirm></a-menu-item
          >
        </a-menu>
      </a-dropdown>
    </span>

    <span slot="patientAction" slot-scope="text, record">
      <a-dropdown :trigger="['click']">
        <a-button class="action-button" @click="preventDefault">
          Admin <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a>Open Ticket</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a @click="goto(`/hospital/patients/${record.globalId}`)"
              >Add New Treatment</a
            >
          </a-menu-item>
          <a-menu-item key="3"> Hide Patient </a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>

    <span slot="nameTags" slot-scope="tags">
      <a-tag v-for="tag in tags" :key="tag.id">{{ tag.name }}</a-tag>
    </span>
  </a-table>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'
import { isEmpty, preventDefault } from '~/services/Helpers'

export default {
  mixins: [routeHelpers, notifications],
  props: {
    columns: { type: Array, default: () => [] },
    // data: { type: Array, default: () => [] },
    pagination: { type: Boolean, default: false },
    actionLink: { type: String, default: '' },
    apiService: { type: Object, required: true },
    // eslint-disable-next-line vue/require-default-prop
    fetchFrom: { type: Function, required: false },
    params: { type: Object, default: () => ({}) },
    rounded: { type: Boolean, default: false },
    patient: { type: Boolean, default: false },
  },
  data() {
    return {
      data: [],
      loading: false,
    }
  },
  mounted() {
    this.fetch()
    this.getFetchMethod()
  },
  methods: {
    preventDefault,
    fetch(params = {}) {
      this.loading = true
      const fetchFrom = this.getDataApiService()
      fetchFrom(this.params)
        .then((response) => {
          this.$emit('afterFetch', response)
          if (response.data && response.data.data) {
            this.data = response.data.data
          } else {
            this.data = response.data
          }
        })
        .catch(this.error)
        .finally(() => {
          this.$emit('finally')
          this.loading = false
        })
    },
    getDataApiService() {
      return isEmpty(this.fetchFrom) ? this.apiService.get : this.fetchFrom
    },
    getCurrentStep(treatment) {
      if (treatment.isSCheduled) {
        return 1
      }
      return 3
    },
    stepClick(patient, treatment) {
      this.goto(`/hospital/patients/${patient.globalId}`, {
        treatment_id: treatment.globalId,
      })
    },
    gotoCollectionScreen(patient, treatment) {
      if (!isEmpty(treatment)) {
        this.goto(`/hospital/patients/collection/${treatment.globalId}`, {
          treatment_id: treatment.globalId,
        })
      }
    },
    gotoView(patient, treatment) {
      if (!isEmpty(treatment)) {
        this.goto(`/hospital/patients/treatment/${treatment.globalId}`)
      }
    },
    clickUpdate(record) {
      this.$emit('clickUpdate', record)
    },
    clickDelete(record) {
      this.$emit('clickDelete', record)
    },
    getFetchMethod() {
      this.$emit('getFetch', this.fetch)
    },
  },
}
</script>
