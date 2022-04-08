<template>
  <div>
    <a-table
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :data-source="[...data]"
      :class="{ 'rounded-table': rounded, 'patient-table': patient }"
    >
      <template slot="customTitle">
        <div class="text-left treatment-title">Treatment Status</div>
      </template>

      <template slot="name" slot-scope="name">
        <strong>{{ name }}</strong>
      </template>

      <template slot="check" slot-scope="flag">
        <!-- <strong>{{ flag }}</strong> -->
        <a-icon
          v-if="flag"
          type="check-circle"
          two-tone-color="#52c41a"
          theme="twoTone"
        />

        <a-icon
          v-else
          type="close-circle"
          two-tone-color="#eb2f96"
          theme="twoTone"
        />
      </template>
      <span slot="treatment_status" slot-scope="text, record">
        <div class="treatment-steps">
          <span
            v-for="treatment in record.treatments"
            :key="treatment.id"
            :class="record.isDead ? 'dead' : ''"
          >
            <steps
              :treatment="treatment"
              :phases="phases"
              :current-step="getCurrentStep"
              :patient="record"
              :goto-view="stepClick"
            ></steps>
            <a-dropdown>
              <a-button class="btn-view-timeline" type="primary" size="small"
                >Admin</a-button
              >
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="gotoView(record, treatment)"
                    ><a-icon type="search" /> View</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;"
                    ><a-icon type="minus-circle" /> Pause</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;"
                    ><a-icon type="minus-circle" /> Cancel</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;"><a-icon type="delete" /> Delete</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
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
            <a-menu-item key="Consent">
              <a
                @click="
                  goto(`/hospital/patients/${record.globalId}?view=Consent`)
                "
                >Add New Treatment</a
              >
            </a-menu-item>
            <a-menu-item key="3">
              <a-popconfirm
                title="Are you to hide patient?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="deletePatient(`${record.id}`)"
              >
                Hide Patient
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item key="4">
              <a-popconfirm
                title="Are you to hide patient?"
                ok-text="Yes"
                cancel-text="No"
                placement="topLeft"
                @confirm="deadPatient(record)"
              >
                <span v-if="record.isDead"> Undead</span>
                <span v-else>Mark Dead</span>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>

      <!-- // filter option -->
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, column, clearFilters }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="() => handleSearch(selectedKeys, column)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, column)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters, column)"
        >
          Reset
        </a-button>
      </div>

      <span slot="nameTags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag.id">{{ tag.name }}</a-tag>
      </span>
    </a-table>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'
import { isEmpty, preventDefault } from '~/services/Helpers'
import steps from '~/components/common/Steps'
import { PATIENT_TREATMENT_PHASES } from '~/services/Constant/Phases'
import PatientServices from '~/services/API/PatientServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import pagination from '~/mixins/pagination'
export default {
  components: { steps },
  mixins: [routeHelpers, notifications, pagination],
  props: {
    columns: { type: Array, default: () => [] },
    dumpData: { type: Array, default: () => [] },
    // eslint-disable-next-line vue/require-prop-types
    // pagination: { required: false, default: false },
    actionLink: { type: String, default: '' },
    // eslint-disable-next-line vue/require-default-prop
    apiService: { type: Object, required: false },
    // eslint-disable-next-line vue/require-default-prop
    fetchFrom: { type: Function, required: false },
    params: { type: Object, default: () => ({}) },
    rounded: { type: Boolean, default: false },
    patient: { type: Boolean, default: false },
    shouldFetch: { type: Boolean, default: true },
  },

  data() {
    return {
      data: [],
      loading: false,
      phases: PATIENT_TREATMENT_PHASES,
      filters: {},
    }
  },
  mounted() {
    if (this.shouldFetch) {
      this.fetch()
      this.getFetchMethod()
    } else {
      this.data = this.dumpData
    }
  },
  methods: {
    preventDefault,
    fetch(params = {}) {
      this.loading = true
      const fetchFrom = this.getDataApiService()
      fetchFrom({ ...this.params, ...this.pagination })
        .then((response) => {
          this.$emit('afterFetch', response)
          if (response.data && response.data.data) {
            this.data = response.data.data
            this.setPagination(response.data)
          } else {
            this.setPagination(response.data)
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
      // Most expensive Operation in whole application
      if (!isEmpty(treatment.phaseId)) {
        const closest = this.phases.reduce(function (prev, curr) {
          return Math.abs(curr.phaseId - treatment.phaseId) <
            Math.abs(prev.phaseId - treatment.phaseId)
            ? curr
            : prev
        })

        return closest.phaseId
      }
      return 1
    },
    stepClick(patient, treatment, phase) {
      // insane logic
      //  2 for patient
      if (
        phase.id !== 1 &&
        (treatment.phaseId == null || treatment.phaseId < 2)
      ) {
        return false
      }

      const routeModel =
        phase.url_type === 1 ? patient.globalId : treatment.globalId

      return this.goto(`${phase.url_slug}${routeModel}`, {
        treatment_id: treatment.globalId,
        ...phase.params,
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
    deletePatient(record) {
      PatientServices.destroy(record)
    },
    deadPatient(patient) {
      const isDead = !patient.isDead
      TreatmentServices.markDead(patient.globalId, isDead).then((response) => {
        this.$emit('deadPatient', response)
      })
    },
    handleSearch(value, column) {
      const filters = this.params
      filters[column.key] = value[0]
      this.setFilters(filters)
    },
    handleReset(clearFilters, column) {
      clearFilters()
      const filters = this.filters
      delete filters[column.key]
      this.setFilters(filters)
    },
    setFilters(params) {
      this.filters = params
      this.fetch(this.filters)
    },
  },
}
</script>
