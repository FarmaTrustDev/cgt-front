<template>
  <div>
    <div class="halfNHalf">
      <a-row>
        <a-col :span="24">
          <a-card class="white-card" :bordered="false">
            <a-row>
              <a-col :span="9"
                ><span class="dated-time">
                  {{ _getFormatMoment().format('HH:mm') }}</span
                >
              </a-col>
              <a-col :span="10">
                <div class="dateTimeBox">
                  <span class="daysName">{{
                    _getFormatMoment().format('dddd')
                  }}</span>
                  <br />
                  <span class="TodaysDate">{{
                    _getFormatMoment().format('Do MMM YYYY')
                  }}</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <!-- // treatment list -->
      <div v-if="removeList">
        <a-col :span="24">
          <a-card
            v-if="user.organizationTypeAlias != 'SMARTLAB'"
            class="white-card"
            :bordered="false"
          >
            <a-row>
              <a-col :span="24" class="px-10">
                <div>
                  <a-col :span="10">
                    <span class="float-left">
                      {{ translation.Treat_1_29 }}</span
                    >
                  </a-col>
                  <a-col :span="4"></a-col>
                  <a-col :span="10">
                    <span class="float-right">{{
                      translation.Colle_1_23
                    }}</span>
                  </a-col>
                </div>
              </a-col>
            </a-row>
            <div class="default-border-radius border mt-15 timebox">
              <a-list v-if="isTreatment == false">
                <a-list-item class="p-0">
                  <div class="">
                    <p class="pt-1 mt-15 ml-15">{{ translation.Thereare_6_565 }}</p>
                  </div>
                </a-list-item>
              </a-list>
              <a-list v-if="isTreatment == true" :data-source="treatments">
                <a-list-item slot="renderItem" slot-scope="item"
                  ><a-list-item-meta>
                    <a
                      slot="title"
                      @click="
                        goto(
                          `/manufacturer/treatments/process/${item.globalId}`
                        )
                      "
                      >{{ item.patientPUID }}
                      {{ getDateOnly(item.collectionDate) }} /
                      {{ getDateOnly(item.deliveryDate) }}</a
                    >
                  </a-list-item-meta>
                </a-list-item>
              </a-list>
            </div>
            <div
              class="text-center red-div-size mt-5"
              style="cursor: pointer"
              @click="goto(`/inventory/treatment`)"
            >
              {{ translation.Showmore_2_534 }}
            </div>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card
            v-if="user.organizationTypeAlias == 'SMARTLAB'"
            class="white-card"
            :bordered="false"
          >
            <a-row>
              <a-col :span="24">
                <div>
                  <a-col :span="24">
                    <span class="float-left ml-10">
                      {{ translation.Sampl_1_310 }}
                    </span>
                  </a-col>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <div class="h-tabs large-tabs float-right sample-tabs-small">
                  <a-tabs type="card" :animated="false">
                    <a-tab-pane key="1" tab="Inbound">
                      <nuxt-link
                        to="/inventory/treatment/process?view=INBOUND_ACCEPTANCE_DETAILS"
                      >
                        <a-table
                          class="rounded-table"
                          :columns="newSampleColumns"
                          :data-source="inbound"
                          :should-fetch="false"
                        >
                          <span
                            slot="action"
                            slot-scope="text, record"
                            @click="goto('/test')"
                          >
                            <!-- //Steps -->
                            <div class="treatment-steps">
                              <span class="step-col" functional>
                                <a-steps :initial="1" size="small">
                                  <a-step
                                    v-for="phase in phases"
                                    :key="phase.id"
                                    :title="phase.name"
                                    :status="
                                      phase.id === 2 &&
                                      record.processSample == 'red'
                                        ? 'wait'
                                        : ''
                                    "
                                    :class="
                                      phase.id === 2 &&
                                      record.processSample == 'red'
                                        ? 'ant-steps-item-error'
                                        : phase.id === 2 &&
                                          record.processSample !== 'red'
                                        ? 'ant-steps-item-active-blue'
                                        : phase.id !== 3
                                        ? 'ant-steps-item-finish'
                                        : ''
                                    "
                                    @click="
                                      phase.id === 2 &&
                                      record.processSample == 'red'
                                        ? stepClick(
                                            'error',
                                            '/inventory/storage/quarantine/status'
                                          )
                                        : stepClick(record, phase)
                                    "
                                  />
                                </a-steps>
                              </span>
                            </div>

                            <!-- //Steps -->
                          </span>
                        </a-table>
                      </nuxt-link>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="Outbound">
                      <nuxt-link
                        to="/inventory/treatment/outboundProcess?view=OUTBOUND_PROCESS"
                      >
                        <a-table
                          class="rounded-table"
                          :columns="completedColumns"
                          :data-source="outbound"
                        >
                          <!-- ==== steps === -->
                          <span slot="status-steps" slot-scope="text, record">
                            <div class="treatment-steps">
                              <span class="step-col" functional>
                                <a-steps :initial="1" :current="2" size="small">
                                  <a-step
                                    v-for="phase in outboundSteps"
                                    :key="phase.id"
                                    :title="phase.name"
                                    :class="
                                      phase.id === 2
                                        ? 'ant-steps-item-active-blue'
                                        : ''
                                    "
                                    @click="stepClick(record, phase)"
                                  />
                                </a-steps>
                              </span>
                            </div>
                          </span>

                          <!-- ==== steps === -->
                        </a-table></nuxt-link
                      >
                    </a-tab-pane>
                  </a-tabs>
                </div>
              </a-col>
            </a-row>
            <div
              class="text-center p-15 red-div-size"
              style="cursor: pointer"
              @click="goto(`/inventory/treatment`)"
            >
              {{ translation.Showmore_2_534 }}
            </div>
          </a-card>
        </a-col>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Helpers'
import {
  _getFormatMoment,
  getMomentByStandardFormat,
} from '~/services/Helpers/MomentHelpers'
import routeHelpers from '~/mixins/route-helpers'
import CustomDisplay from '~/components/inventory/treatment/customDisplay'
import {
  SMART_LAB_TREATMENT_PENDING_PHASES,
  INVENTORY_OUTBOUND_STATUS_STEPS,
} from '~/services/Constant/Phases'
import { isNumber } from '~/services/Helpers'
import StatusDetail from '~/components/inventory/treatment/statusDetail'
import imagesHelper from '~/mixins/images-helper'

export const newSampleData = [
  {
    patientEnrollmentNumber: 'DAC7993',
    // treatmentType: 'Human Cells ',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '26/09/2022 - 29/09/2022',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample: 'green',
  },
  {
    patientEnrollmentNumber: 'DAC7986',
    // treatmentType: 'Human Cells ',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '25/09/2022 - 28/09/2022',
    print: 'Uploads/DocumentURL/shipping notice.jpg',
    processSample: 'green',
  },
]
export const completedSampleData = [
  {
    patientEnrollmentNumber: 'DAC6519',
    // treatmentType: 'Human Cells',
    // productionLine: 'Zone A',
    hospital: 'Adaptimmune',
    collectionDateDeliveryDate: '24/09/2022 - 27/09/2022',
    // dispatchedBy: 'Ben Hawkins',
  },
  {
    patientEnrollmentNumber: 'DAC2237',
    // treatmentType: 'Human Cells',
    // productionLine: 'Zone C',
    hospital: 'Kite',
    collectionDateDeliveryDate: '23/09/2022 - 26/09/2022',
    // dispatchedBy: 'Shawn David',
  },
]
export const allSampleData = [
  {
    patientEnrollmentNumber: 'DAC7993',
    // treatmentType: 'Human Cells ',
    // productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '05/06/2022 - 08/07/2022',
    // dispatchedBy: 'In Progress',
  },
  {
    patientEnrollmentNumber: 'DAC21362',
    // treatmentType: 'Human Cells ',
    // productionLine: 'Zone C',
    hospital: 'Baystate Clinic',
    collectionDateDeliveryDate: '30/05/2022 - 02/07/2022',
    // dispatchedBy: 'In Progress',
  },
]

export default {
  components: [
    StatusDetail,
    // treatmentTable,
    CustomDisplay,
  ],
  mixins: [routeHelpers, imagesHelper],
  props: {
    removeList: { type: Boolean, default: true },
    type: { type: String, required: false, default: 'info' },
  },
  data() {
    return {
      treatments: [],
      isTreatment: true,
      moment,
      loading: false,
      treatmentTypes: [],
      filters: {},
      qrUrl: '/Uploads/DocumentURL/shipping notice.png',
      showModalImage: false,
      showModal: false,
      phases: SMART_LAB_TREATMENT_PENDING_PHASES,
      outboundSteps: INVENTORY_OUTBOUND_STATUS_STEPS,
      // customDisplayData,
      // customDisplayDataMat,
      completedColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
          dataIndex: 'treatmentType',
          key: 'treatmentType',
        },
        {
          title: `${this.$store.getters.getTranslation.StoraArea_2_504}`,
          dataIndex: 'productionLine',
          key: 'productionLine',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
      ],

      pendingSampleData: [
        {
          patientEnrollmentNumber: 'DAC7986',
          treatmentName: 'Human Cells',
          productionLine: 'Zone A',
          hospital: 'Baystate Clinic',
          collectionDateDeliveryDate: '10/06/2022 - 14/08/2022',
        },
        {
          patientEnrollmentNumber: 'DAC9874',
          treatmentName: 'Human Cells',
          productionLine: 'Zone C',
          hospital: 'Novartis',
          collectionDateDeliveryDate: '15/06/2022 - 20/07/2023',
        },
      ],

      newSampleColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
          dataIndex: 'treatmentType',
          key: 'treatmentType',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
      ],
      pendingColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
          dataIndex: 'treatmentName',
          key: 'treatmentName',
        },
        {
          title: `${this.$store.getters.getTranslation.StoraArea_2_504}`,
          dataIndex: 'productionLine',
          key: 'productionLine',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],

      inbound: newSampleData,
      outbound: completedSampleData,
      allSample: allSampleData,
      statusDetails: [
        {
          clientID: 'DAC-654',
          projectID: '123456a',
          protocolD: 'T1',
          arn: 'ARN-0633-003',
          createdBy: 'David Handerson',
          client: 'Novartis',
          project: 'Texas Test Project',
          protocol: 'Kiet Test',
          description: 'Novartis Receipt',
          createdOn: '27/06/2022',
          location: 'Cryoport - London',
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    if (this.removeList) {
      this.fetchTreatments()
    }
  },
  methods: {
    fetchTreatments() {
      TreatmentServices.get({ onlyTodayTreatment: true }).then((response) => {
        this.treatments = response.data
        if (isEmpty(this.treatments)) {
          this.isTreatment = false
        }
      })
    },
    getDateOnly(date) {
      return moment(date).format('DD-MM-yyyy')
    },
    _getFormatMoment,
    getMomentByStandardFormat,
    inboundSearch(value, key) {
      // console.log(value.toUpperCase())
      let filters = this.filters
      filters[key] = value.toUpperCase()
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          const filterValue = filters[filter]

          storages = newSampleData.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              return storage[filter].match(value.toUpperCase())
            }
            // eslint-disable-next-line eqeqeq
            return (
              storage[filter].match(value.toUpperCase()) ===
              filterValue.toUpperCase()
            )
          })
        }
        storages = JSON.stringify(storages)
        this.inbound = JSON.parse(storages)
      } else {
        this.inbound = newSampleData
      }
    },
    outboundSearch(value, key) {
      let filters = this.filters
      filters[key] = value.toUpperCase()
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          // console.log(filters)
          const filterValue = filters[filter]
          storages = completedSampleData.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              // console.log(storage[filter])
              return storage[filter].match(value.toUpperCase())
            }
            // eslint-disable-next-line eqeqeq
            return (
              storage[filter].match(value.toUpperCase()) ===
              filterValue.toUpperCase()
            )
          })
        }

        storages = JSON.stringify(storages)
        this.outbound = JSON.parse(storages)
      } else {
        this.outbound = completedSampleData
      }
    },
    allSampleSearch(value, key) {
      let filters = this.filters
      filters[key] = value
      filters = JSON.stringify(filters)
      filters = JSON.parse(filters)
      this.filters = filters

      if (!isEmpty(filters)) {
        let storages = []
        for (const filter in filters) {
          const filterValue = filters[filter]

          storages = allSampleData.filter((storage) => {
            if (isEmpty(filterValue) && !isNumber(filterValue)) {
              return storage[filter].match(value)
            }
            // eslint-disable-next-line eqeqeq
            return storage[filter].match(value) == filterValue
          })
        }
        storages = JSON.stringify(storages)
        this.allSample = JSON.parse(storages)
      } else {
        this.allSample = allSampleData
      }
    },
  },
}
</script>
<style scoped>
.bound-btns {
  padding: 5px 8px;
  background: #f2f5fb !important;
  border: solid 1px #9dc5ff !important;
  border-radius: 22px;
  font-weight: 400;
  margin-right: 5px;
  color: #7c8db5;
}
.bound-btns:hover {
  color: #a7a7a7;
}
</style>
