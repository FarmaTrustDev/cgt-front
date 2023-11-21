<template>
    <page-layout
      :create="false"
      :bordered="false"
      :loading="loading"
      :title="translation.Repor_1_786"
      class="container page-search-input-container"
      :back="false" 
    >
      <template slot="content">
        <a-card style="margin-top: -80px;">
            <a-col  :span="24" class="report-head">
                <center><h2 >Chain of Custody and Condition Report</h2></center>
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Sample Collection Information</b></h3>
            </a-col>
            <a-col :span="10" class="report-head">
               <h3 class="ml-10">Sample ID: {{ sampleData.id }}</h3>  
            </a-col>
            <a-col :offset="4" :span="10" class="report-head">
               <h3 class="ml-10">Collection Date: {{ sampleData.collectionDate }}</h3>  
            </a-col>
            <a-col :span="10" class="report-head mt-10">
               <h3 class="ml-10">Sample Type: {{ sampleData.sampleType }}</h3>  
            </a-col>
            <a-col :offset="4" :span="10" class="report-head mt-10">
               <h3 class="ml-10">Collection Time:  {{ sampleData.collectionTime }}</h3>  
            </a-col>
            <a-col :span="10" class="report-head mt-10">
               <h3 class="ml-10">Sample Quantity: {{ sampleData.sampleQuantity }}</h3>  
            </a-col>
            <a-col :offset="4" :span="10" class="report-head mt-10">
               <h3 class="ml-10">Collected By: {{ sampleData.collectedBy }}</h3>  
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Donor Information</b></h3>
            </a-col>
            <a-col :span="10" class="report-head">
               <h3 class="ml-10">Donor ID: {{ donorData.id }}</h3>  
            </a-col>
            <a-col :offset="4" :span="10" class="report-head">
               <h3 class="ml-10">Donor Name: {{ donorData.name }}</h3>  
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Chain of Custody</b></h3>
            </a-col>
            <a-col :span="24">
                <a-table style="border-radius: none;"
                        :columns="columnsCOC"
                        :loading="loading"
                        :data-source="dataCOC"
                        class="rounded-table pt-10 users-list"
                        :pagination="false"
                        >
                </a-table>
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Chain of Condition</b></h3>
            </a-col>
            <a-col :span="24">
                <a-table style="border-radius: none;"
                        :columns="columnsCOCondition"
                        :loading="loading"
                        :data-source="dataCOCondition"
                        class="rounded-table pt-10 users-list"
                        :pagination="false"
                        >
                </a-table>
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Equipment Information</b></h3>
            </a-col>
            <a-col :span="24">
                <a-table style="border-radius: none;"
                        :columns="columnsEI"
                        :loading="loading"
                        :data-source="dataEI"
                        class="rounded-table pt-10 users-list"
                        :pagination="false"
                        >
                </a-table>
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Equipment Usage Log</b></h3>
            </a-col>
            <a-col :span="24">
                <a-table style="border-radius: none;"
                        :columns="columnsEUL"
                        :loading="loading"
                        :data-source="dataEUL"
                        class="rounded-table pt-10 users-list"
                        :pagination="false"
                        >
                </a-table>
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Storage Information</b></h3>
            </a-col>
            <a-col :span="4">
               <h3 class="ml-10 mt-10">Humidity: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head ">
               <h3 class="ml-10 "> {{ sampleData.humidity }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="ml-10 mt-25">Temperature: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 "> {{ sampleData.temperature }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="ml-10 mt-25">Storage Location: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 ">{{ sampleData.storageLocation }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="ml-10 mt-10">Monitoring Sensors: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 "> {{ sampleData.monitoringSensor }}</h3>  
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Maintenance Schedule</b></h3>
            </a-col>
            <a-col :span="4">
               <h3 class=" mt-10">Maintenance Date: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head ">
               <h3 class="ml-10 "> {{ sampleData.maintenanceDate }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="mt-20">Last Maintenance: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 "> {{ sampleData.maintenanceDueDate }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="mt-20">Next Maintenance Due: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 ">{{ sampleData.maintenanceNextDate }}</h3>  
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Quality Control and Integrity</b></h3>
            </a-col>
            <a-col :span="4">
               <h3 class=" mt-10">Sample Quality: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head ">
               <h3 class="ml-10 "> {{ sampleData.sampleQuality }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="mt-10">Contamination Checks: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 "> {{ sampleData.contaminationCheck }}</h3>  
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Sample Usage</b></h3>
            </a-col>
            <a-col :span="24">
                <a-table style="border-radius: none;"
                        :columns="columnsSampleUsage"
                        :loading="loading"
                        :data-source="[sampleData]"
                        class="rounded-table pt-10 users-list"
                        :pagination="false"
                        >
                </a-table>
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Consent and Ethical Compliance</b></h3>
            </a-col>
            <a-col :span="4">
               <h3 class=" mt-10">Consent Date: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head ">
               <h3 class="ml-10 "> {{ consentData.consentDate }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="mt-20">Type of Consent: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 "> {{ consentData.typeOfConsent }}</h3>  
            </a-col>
            <a-col :span="4">
               <h3 class="mt-10">Consent Document: </h3>  
            </a-col>
            <a-col :offset="1" :span="19" class="report-head mt-10">
               <h3 class="ml-10 "> {{ consentData.consentDocument }}</h3>  
            </a-col>
            <a-col :span="24" class="mt-15">
                <h3><b>Additional Information</b></h3>
            </a-col>
            <a-form-item>
                <a-textarea placeholder="Additional Note">

                </a-textarea>
            </a-form-item>
            <a-col :span="24" class="mt-15">
                <h3><b>Signatures and Approvals</b></h3>
            </a-col>
            <a-col :span="24">
                <a-table style="border-radius: none;"
                        :columns="columnsSampleApproval"
                        :loading="loading"
                        :data-source="[sampleData]"
                        class="rounded-table pt-10 users-list"
                        :pagination="false"
                        >
                </a-table>
            </a-col>
            <a-col :offset="17"  :span="7" class="mt-40"><h3>e-signature with timestamp</h3></a-col>
            <a-col :span="8" class="mt-20"><h3>Generated by smartlabshataali.net</h3></a-col>
            <a-col :offset="8" :span="8" class="mt-20"><h3>Report Generated On: 31st Oct, 2023</h3></a-col>
            
        </a-card>
        <a-col :offset="19" :span="2" class="mt-20">
                <div style="width: 25%; display: inline">
                <a-button
                type="primary"
                @click="goto('patients/create')"
                >QP Release</a-button
                >
                </div>
        </a-col>
        <a-col  :span="2" :offset="1" class="mt-20">
                <div style="width: 25%; display: inline">
                <a-button
                type="primary"
                @click="goto('patients/create')"
                >Cancel</a-button
                >
                </div>
        </a-col>
      </template>
      </page-layout
    >
  </template>
  <script>
  
  import PageLayout from '~/components/layout/PageLayout'
  // import Table from '~/components/labeling/Listing'
  import routeHelpers from '~/mixins/route-helpers'
  import LabelServices from '~/services/API/LabelServices'
  export default {
    components: {
      'page-layout': PageLayout,
    },
    mixins:[routeHelpers],
    data() {
      return {
        data: [],
        loading: true,
        sampleData:{
            id:'BG8180E',
            collectionDate:'21-10-2023',
            sampleType:'Plasma',
            collectionTime:'09:00 AM',
            sampleQuantity:'3 vials',
            collectedBy:'Christy Walter',
            humidity:'90% RH',
            monitoringSensor:'Active',
            temperature:'-80’C',
            storageLocation:'Freezer Atara 001, Shelf 3, Box A1,A3,A7',
            maintenanceDate:'10th of every month',
            maintenanceNextDate:'24-11-2023',
            maintenanceDueDate:'23-11-2024',
            sampleQuality:'Heigh',
            contaminationCheck:'Non Detected',
            date:'22-112023',
            detail:'DNA Sample',
            purpose:'Research Study',
            project:'Motor Neurone Disease - Study',
            note:'none',
            approver:'Dr. Michael',
            signature:'Henry Bob'
        },
        donorData:{
            id:'BG8180E',
            name:'Tom Stone'
        },
        consentData:{
            id:1,
            consentDate:'11-11-2023',
            typeOfConsent:'Informed Consent',
            consentDocument:'DocumentLink'
        },
        dataCOC: [
          {
            id: 'DAC49784',
            date: '21-10-2023',
            location: 'Collection Site B',
            personal: 'Lily Watson',
            purpose: 'Sample Collected',
            coe: '-75C',
            note: 'none',
          },
          {
            id: 'DAC49784',
            date: '30-10-2023',
            location: 'Transport Vehicle',
            personal: 'John Snow',
            purpose: 'Transportation',
            coe: '-80C',
            note: 'none',
          },
          {
            id: 'DAC49784',
            date: '01-11-2023',
            location: 'Biobank Facility',
            personal: 'Adam Smith',
            purpose: 'Storage',
            coe: '-80C',
            note: 'none',
          },
          
        ],
        dataEUL: [
          {
            id: 'DAC49784',
            date: '21-10-2023',
            temperature: '-75C',
            personal: 'Lily Watson',
            purpose: 'Sample Storage',
          },
          {
            id: 'DAC49784',
            date: '30-10-2023',
            temperature: 'Transport Vehicle',
            personal: 'John Snow',
            purpose: 'Transportation',
          },
          
        ],
        dataEI: [
          {
            id: 'EQP-023',
            name: 'Freezer Atara 001',
            location: 'Storage Room 5',
            type: 'Ultra Low Temperature Freezer',
            condition: 'Good',
            temperature: '-80C',
          },
          
        ],
        dataCOCondition: [
          {
            id: 1,
            description:'Sample collected in good condition',
            condition:'Collection Condition',
            temperature:'-75C'
          },
          {
            id: 2,
            description:'Temperature maintained for sample during transportation',
            condition:'Transportation Condition',
            temperature:'-80C'
          },
          {
            id: 3,
            description:'Sample stored in at Freezer Atara 001, shelf 3, box A-1, A-4, A-7',
            condition:'Storage Condition',
            temperature:'-80C'
          },
          
        ],
        columnsCOC: [
          {
            title: 'Date/Time',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
          },
          {
            title: 'Personal',
            dataIndex: 'Personal',
            key: 'Personal',
          },
          {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
          },
          {
            title: 'COE',
            dataIndex: 'coe',
            key: 'coe',
          },
          {
            title: 'Comments/Notes',
            dataIndex: 'note',
            key: 'note',
          },
          
        ],
        columnsSampleUsage: [
          {
            title: 'Date/Time',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Sample Detail',
            dataIndex: 'detail',
            key: 'detail',
          },
          {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
          },
          {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
          },
          {
            title: 'Comments/Notes',
            dataIndex: 'note',
            key: 'note',
          },
          
        ],
        columnsSampleApproval: [
          {
            title: 'Signature',
            dataIndex: 'signature',
            key: 'signature',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Approver',
            dataIndex: 'approver',
            key: 'approver',
          },
          {
            title: 'Comments/Notes',
            dataIndex: 'note',
            key: 'note',
          },
          
        ],
        columnsEUL: [
          {
            title: 'Date/Time',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Personal',
            dataIndex: 'Personal',
            key: 'Personal',
          },
          {
            title: 'Purpose',
            dataIndex: 'purpose',
            key: 'purpose',
          },
          {
            title: 'Temperature',
            dataIndex: 'temperature',
            key: 'temperature',
          },
          
        ],
        columnsCOCondition: [
        {
            title: 'Condition',
            dataIndex: 'condition',
            key: 'condition',
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Temperature',
            dataIndex: 'temperature',
            key: 'temperature',
          },
        ],
        columnsEI: [
        {
            title: 'Equipment ID',
            dataIndex: 'id',
            key: 'id',
          },
        {
            title: 'Equipment Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Equipment Type',
            dataIndex: 'type',
            key: 'type',
          },
          {
            title: 'Equipment Location',
            dataIndex: 'location',
            key: 'location',
          },
          {
            title: 'Equipment Temperature',
            dataIndex: 'temperature',
            key: 'temperature',
          },
          {
            title: 'Equipment Condition',
            dataIndex: 'condition',
            key: 'condition',
          },
        ],
      }
    },
    mounted() {
      this.fetch()
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    
    methods: {
      fetch() {
        this.loading = true
        LabelServices.hospital()
          .then((response) => {
            this.data = response.data
          })
          .finally(() => (this.loading = false))
      },
      fetchSearch(params) {
        this.loading = true
        LabelServices.hospital(params)
          .then((response) => {
            this.data = response.data
          })
          .finally(() => (this.loading = false))
      },
      searchLabel(e) {
        const search = e.target.value
        if (search !== '') {
          this.fetchSearch({
            patientEnrollmentNumber: search,
            TreatmentTypeName: search,
          })
        } else {
          this.fetch()
        }
      },
    },
  }
  </script>
  