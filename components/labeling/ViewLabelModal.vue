<template>
  <div class="view-label-modal">
    
    <a-modal v-model="visible" title="Sample form" @ok="handleOk" :afterClose="handleCancel">
      
      <a-row class="sample-form-container">
        <a-col :span="12" class="left">
          <div class="bar-code-container">
            <img class="img-fluid" :src="bardCode1Url">
          </div>
          <div class="hospital-name">
            <span class="">Cellfuse</span>
          </div>
          <div class="collection-datetime">
            <span class="collection-time">
                Collection Date and Time
            </span>

            <span class="_collectionDate">11/12/2021 02:15</span>
          </div>
          <h6 class="text-center irradiate"><strong>Do Not Irradiate</strong></h6>
          <div class="bar-code-container sec-barcode">
            <img class="img-fluid" :src="bardCode2Url">
          </div>

          <div class="manufacturer">
            <span class="manufacturer-name from">Baystate Clinic</span>
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
                  Patient ID  : <span class="patient_id">DAC61010</span>
              </strong>
              <div>Patient Name: <span class="patient_name">christina braun</span></div>
              <div>Patient DOB:<span class="patient_dob">08/12/2021</span></div>
          </div>

          <div class="Expiration-detail">
              <span>Expiration Date/Time  </span>
              (2020-01-17 18:08 UTC)
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
              <img class="img-fluid" id="bag-qr-" :src="qrUrl">
          </div>
        </a-col>
      </a-row>


      <template #footer>
        <a-button class="footer-btn-label" key="submit" type="primary" >Print</a-button>
        <a-button class="footer-btn-label footer-btn-label-cancelled" key="back" >Cancel</a-button>
      </template>

    </a-modal>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: true,
        bardCode1Url: 'https://cgt-dev-ft.microsysx.com/images/sample-bar-code.png',
        bardCode2Url: 'https://cgt-dev-ft.microsysx.com/images/sample-bar-code.png',
        qrUrl: 'https://cgt-dev-ft.microsysx.com/begs/637745519710493965.png'
      }
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        console.log(e);
        this.visible = false;
      },
      handleCancel(e){
        this.$parent.showViewModal= false
      },
    }
  }
</script>