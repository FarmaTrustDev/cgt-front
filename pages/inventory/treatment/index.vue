<template>
<div>
    <div class="page-header clearfix">
        <h3 class="page-title pl-5 float-left">Treatment List</h3>
        <!-- {{translation['All-_3_400']}} -->
        <a-select class="float-right page-search-input" :placeholder="translation.TreatType_2_67">
            <a-select-option v-for="treatmentType in treatmentTypes" :key="treatmentType.id">{{ treatmentType.name }}</a-select-option>
        </a-select>
    </div>
    <div class="h-tabs large-tabs">
        <a-tabs type="card" :animated="false">
            <a-tab-pane key="1" :tab="translation.NewTreat_2_260">
                <standard-table class="rounded-table" :columns="[{
    title: `Patient ID`,
    dataIndex: 'patientEnrollmentNumber',
    key: 'patientEnrollmentNumber',
  },
   {
    title: `Treatment Type`,
    dataIndex: 'treatmentType',
    key: 'treatmentType',
  },
  {
    title: `Organizations`,
    dataIndex: 'hospital',
    key: 'hospital',
  },
  {
    title: `Collection - Delivery Date`,
    dataIndex: 'collectionDateDeliveryDate',
    key: 'collectionDateDeliveryDate',
  },
  {
                    title: `Actions`,
                    dataIndex: 'action',
                    scopedSlots: {
                    customRender: 'action'
                    },
                },
  ]"
  :dump-data="[{patientEnrollmentNumber: 1, treatmentType: 'ABC', hospital: 'Agha Khan Hospital', collectionDateDeliveryDate: '12/12/2022' }]" :should-fetch="false" />
            </a-tab-pane>
            <a-tab-pane key="2" :tab="translation.PendiTreat_2_300">
                <a-table class="rounded-table" :columns="[{
                  title: `Patient ID`,
                  dataIndex: 'patientEnrollmentNumber',
                  key: 'patientEnrollmentNumber',
                },
                {
                  title: `Treatment Type`,
                  dataIndex: 'treatmentName',
                  key: 'treatmentName',
                },
                {
                  title: `Production Line`,
                  dataIndex: 'productionLine',
                  key: 'productionLine',
                },
                {
                  title: `Organizations`,
                  dataIndex: 'hospital',
                  key: 'hospital',
                },
                {
                  title: `Collection - Delivery Date`,
                  dataIndex: 'collectionDateDeliveryDate',
                  key: 'collectionDateDeliveryDate',
                },
                 {
                  title: 'Action',
                  key:'action',
                  scopedSlots: { customRender: 'action' },
                 },
              ]" :data-source="[{patientEnrollmentNumber: 1,treatmentName: 'abc', productionLine: 'Prod', hospital: 'CellFuse', collectionDateDeliveryDate: '12/10/2022'}]" >
<span slot="action" slot-scope="record">
        <!-- //Steps -->
        <div class="treatment-steps">
          <a-steps
            :initial="1"
            :current="1"
            size="small"
          >
            <a-step
              v-for="phase in phases"
              :key="phase.id"
              :title="phase.name"
              @click="stepClick(record)"
            />
          </a-steps>
        </div>

        <!-- //Steps -->
      </span>
                </a-table>
            </a-tab-pane>
            <a-tab-pane key="3" :tab="translation.ComplTreat_2_844">
                <standard-table class="rounded-table" :columns="[{
                  title: `Patient ID`,
                  dataIndex: 'patientEnrollmentNumber',
                  key: 'patientEnrollmentNumber',
                },
                {
                  title: `Treatment Type`,
                  dataIndex: 'treatmentType',
                  key: 'treatmentType',
                },
                {
                  title: `Organizations`,
                  dataIndex: 'hospital',
                  key: 'hospital',
                },
                {
                  title: `Collection - Delivery Date`,
                  dataIndex: 'collectionDateDeliveryDate',
                  key: 'collectionDateDeliveryDate',
                },
              ]" :dump-data="[{patientEnrollmentNumber: 1,treatmentType: 'ABC', hospital: 'AKU', collectionDateDeliveryDate: '12/22/2022'  }]" :should-fetch="false"
              />
            </a-tab-pane>
            <a-tab-pane key="4" :tab="translation['All-_3_400']">
                <standard-table class="rounded-table" :columns="[
  {
    title: `Patient ID`,
    dataIndex: 'patientEnrollmentNumber',
    key: 'patientEnrollmentNumber',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: `Treatment Type`,
    dataIndex: 'treatmentType',
    key: 'treatmentType',
  },
  {
   title: `Organizations`,
    dataIndex: 'hospital',
    key: 'hospital',
  },
  {
    title: `Collection - Delivery Date`,
    dataIndex: 'collectionDateDeliveryDate',
    key: 'collectionDateDeliveryDate',
  },

  // {
  //   title: 'Action',
  //   dataIndex: 'action',
  //   scopedSlots: { customRender: 'action' },
  // },
]"
:dump-data="[{patientEnrollmentNumber: 1, treatmentType: 'ABC', hospital: 'AKUH', collectionDateDeliveryDate: '12/10/2022'}]" :should-fetch="false"
 />
            </a-tab-pane>
        </a-tabs>
    </div>
</div>
</template>

<script>
// import newRequests from '~/components/root/manufacturer/treatments/listing/NewRequest'
// import All from '~/components/root/manufacturer/treatments/listing/All'
// import Completed from '~/components/root/manufacturer/treatments/listing/Completed'
// import inProgress from '~/components/root/manufacturer/treatments/listing/InProgress'
import StandardTable from '~/components/common/StandardTable'
import { MANUFACTURER_TREATMENT_PENDING_PHASES } from '~/services/Constant/Phases'
import routeHelpers from '~/mixins/route-helpers'
// @todo for Naveed here optimize in 1 table single component can handle the calls
export default {
  
    components: {
        // 'new-request': newRequests,
        // 'in-progress': inProgress,
        // all: All,
        // completed: Completed,
        StandardTable,
    },
    mixins: [routeHelpers],    
    data() {      
        return {
            loading: false,
            treatmentTypes: [],
            phases: MANUFACTURER_TREATMENT_PENDING_PHASES,
        }
    },
    computed: {
        translation() {
            return this.$store.getters.getTranslation
        },
    },
    methods: {
        searchTreatment() {},
        stepClick(record) {
            this.goto(`/inventory/treatment/process`)
        },
    },
}
</script>
