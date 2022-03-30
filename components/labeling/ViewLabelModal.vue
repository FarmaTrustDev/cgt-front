<template>
  <div class="view-label-modal">
    
    <a-modal v-model="visible" title="Sample form" :after-close="handleCancel" @ok="handleOk" >
      <a-row class="sample-form-container">
        <a-col :span="12" class="left">
          <div class="bar-code-container">
            <img class="img-fluid" :src="bardCode1Url">
          </div>
          <div class="hospital-name">
            <span class="">{{hospital.name}}</span>
          </div>
          <div class="collection-datetime">
            <span class="collection-time">
                Collection Date and Time
            </span>

            <span class="_collectionDate">{{data.collectionDate}}</span>
          </div>
          <h6 class="text-center irradiate"><strong>Do Not Irradiate</strong></h6>
          <div class="bar-code-container sec-barcode">
            <img class="img-fluid" :src="bardCode2Url">
          </div>

          <div class="manufacturer">
            <span class="manufacturer-name from">{{data.manufacturerName}}</span>
            <span class="further">For Further Processing </span>
            <span class="manufacturer-detail">Total Volume ml, containing approx ml Citrate Store at 1 to 10 C</span>
          </div>
        </a-col>
        <a-col :span="12" class="right">
          <div class="usage right_to">
              For Clinical trail Use only 
          </div>

          <div class="patient-detail">
              <strong>
                  Patient ID  : <span class="patient_id">{{data.patientEnrollmentNumber}}</span>
              </strong>
              <div>Patient Name: <span class="patient_name">{{patient.name}}</span></div>
              <div>Patient DOB:<span class="patient_dob">{{patient.dob}}</span></div>
          </div>

          <div class="Expiration-detail">
              <span>Expiration Date/Time  </span>
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
        <a-button key="submit" class="footer-btn-label" type="primary" >Print</a-button>
        <a-button key="back" class="footer-btn-label footer-btn-label-cancelled" >Cancel</a-button>
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