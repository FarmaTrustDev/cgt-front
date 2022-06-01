<template>
  <div class="view-label-modal">
    
    <a-modal v-model="visible" :title="translation.Samplfrom_2_87" :after-close="handleCancel" @ok="handleOk" >
      <a-row class="sample-form-container">
        <a-col :span="12" class="left">
          <div class="bar-code-container">
            <img class="img-fluid" :src="bardCode1Url">
          </div>
          <div class="hospital-name">
            <span class="">{{data.from}}</span>
          </div>
          <div class="collection-datetime">
            <span class="collection-time">
                {{translation.ColleDate_4_99}}
            </span>

            <span class="_collectionDate">{{data.collectionDate}}</span>
          </div>
          <h6 class="text-center irradiate"><strong>{{translation.DoNot_3_101}}</strong></h6>
          <div class="bar-code-container sec-barcode">
            <img class="img-fluid" :src="bardCode2Url">
          </div>

          <div class="manufacturer">
            <span class="manufacturer-name from">{{data.to}}</span>
            <span class="further">{{translation.ForFurth_3_103}} </span>
            <span class="manufacturer-detail">Total Volume ml, containing approx ml Citrate Store at 1 to 10 C</span>
          </div>
        </a-col>
        <a-col :span="12" class="right">
          <div class="usage right_to">
              {{translation.ForClini_5_91}} 
          </div>

          <div class="patient-detail">
              <strong>
                  {{translation.PatieID_2_264}}  : <span class="patient_id">{{data.patientEnrollmentNumber}}</span>
              </strong>
              <div>{{translation.PatieName_2_93}}: <span class="patient_name">{{patient.name}}</span></div>
              <div>{{translation.AddNew_3_631}} DOB:<span class="patient_dob">{{patient.dob}}</span></div>
          </div>

          <div class="Expiration-detail">
              <span>{{translation.ExpirDate/_2_95}}  </span>
              ()
          </div>

          <div class="mt-2">
              <span>
                  COI:23456ADCASAD
              </span>
              <br>
              <span>
                  Protcol :23456ADCASAD
              </span>
          </div>

          <div class="bag-qr">
              <img id="bag-qr-" class="img-fluid" :src="qrUrl">
          </div>
        </a-col>
      </a-row>


      <template #footer>
        <a-button key="submit" class="footer-btn-label" type="primary" >{{translation.Print_1_111}}</a-button>
        <a-button key="back" class="footer-btn-label footer-btn-label-cancelled" >{{translation.cance_1_296}}</a-button>
      </template>

    </a-modal>

  </div>
</template>

<script>
  import LabelServices from '~/services/API/LabelServices'
  export default {
    props: {
    // data: { type: Object, default: () => ({}) },
    isCreated: { type: Boolean, default: false },
    },
    data() {
      return {
        visible: true,
        bardCode1Url: 'https://cgt-dev-ft.microsysx.com/images/sample-bar-code.png',
        bardCode2Url: 'https://cgt-dev-ft.microsysx.com/images/sample-bar-code.png',
        qrUrl: 'https://cgt-dev-ft.microsysx.com/begs/637745519710493965.png',
        data: [],
        treatment:[],
        hospital:[],
        patient:[],
        // schedulingId:null,
      }
    },
    mounted() {
      // alert(this.$parent.schedulingId)
      this.fetch(this.$parent.schedulingId)
    },
    computed:{
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    methods: {
      showModal(e) {
        this.visible = true;
      },
      openViewModal(row) {
      // Event.$emit('toggleModal', this.schedulingId);
      },
      handleOk(e) {
        this.visible = false;
      },
      handleCancel(e){
        this.$parent.showViewModal= false
      },
      fetch(id) {
      this.loading = true
      LabelServices.scheduling(id)
        .then((response) => {
          this.data = response.data
          this.hospital=response.data.hospital
          this.patient=response.data.patient
        })
        .finally(() => (this.loading = false))
      },
    }
  }
</script>