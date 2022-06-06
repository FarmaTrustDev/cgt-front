<template>
  <page-layout
    :loading="false"
    title="Treatment Status"
    class="patient-page"
  >
    <template slot="content">
     
      <div class="grey-card" style="width:90%; margin-left:5%">
      <div class="patient-details-page">
        <a-row :gutter="18">
          <a-col :span="6">
            <a-card :bordered="false" class="qr-section default-card">
  <figure class="m-0">
    <img
      class="img-fluid"
      :src="`https://demoapi.qmaid.co/Uploads/patient/10/qr/637880405174699096.png`"
      alt="Christina Braun"
    />

    <figcaption>Patient ID: XYZ</figcaption>
  </figure>
            </a-card>
          </a-col>
          <a-col :span="18">
            <a-card :bordered="false" class="default-card details-section">
              <article class="article">
                <h2 class="heading pl-0">Patient Details</h2>
              </article>
              <div>
                <a-row :gutter="20" dir="ltr">
                  <a-col :span="4" class="mt-15">
                    <h6>
                      <span class="text-muted"> Hospital: </span>
                    </h6>
                  </a-col>
                  <a-col :span="6" class="mt-15">
                    <h6>
                      <span class="text-muted"> Baystate Clinic</span>
                    </h6>
                  </a-col>                  
                  <a-col :span="4" class="mt-15">
                    <h6><span class="text-muted">Treatment Type:</span></h6>
                  </a-col>
                  <a-col :span="4" class="mt-15">
                    <h6><span class="text-muted">Yescarta</span></h6>
                  </a-col>
                </a-row>
                <a-row :gutter="20" dir="ltr">
                  <a-col :span="4" class="mt-15">
                    <h6><span class="text-muted"> Email:</span></h6>
                  </a-col>
                  <a-col :span="4" class="mt-15">
                    <h6><span class="text-muted"> baystateclinic@gmail.com</span></h6>
                  </a-col>
                </a-row>
                <a-row :gutter="20" dir="ltr">
                  <a-col :span="4" class="mt-15">
                    <h6><span class="text-muted"> Phone:</span></h6>
                  </a-col>
                  <a-col :span="4" class="mt-15">
                    <h6><span class="text-muted"> +44 12345 1234</span></h6>
                  </a-col>
                </a-row>                
              </div>                          
            </a-card>
          </a-col>
        </a-row>
      </div>         
        <a-card :bordered="false" class="mt-15 default-card h-tabs">
          <a-tabs type="card">
            <a-tab-pane key="1" tab="Inbound Acceptance Details">
            <a-row>
              <a-col :span="12">                                

              <a-card :bordered="false" class="default-card">
                <article class="article">
                  <h4 class="heading pl-0">Shipping Details</h4>         
                </article>
                <div >
                  <table width="100%">
                    <tr>
                      <td width="50%">Dispatch Date</td><td>09/01/2022</td>
                    </tr>
                    <tr>
                      <td>Dispatch By</td><td>Sadaan Shahid</td>
                    </tr>
                    <tr>
                      <td>Carrier Status</td><td>In-Process</td>
                    </tr>
                    <tr>
                      <td>Estimated Arrival Date</td><td>12/01/2022</td>
                    </tr>
                  </table>
              </div>
              </a-card>
              </a-col>
              <a-col :span="12">
              <a-card :bordered="false" class="default-card">
                <article class="article">
                  <h4 class="heading pl-0">Treatment Receiving</h4>
                </article>
                <div >
                  <table width="100%">
                    <tr>
                      <td width="50%">Is Received</td><td>Done</td>
                    </tr>
                    <tr>
                      <td>Received By</td><td>Sadaan Shahid</td>
                    </tr>
                    <tr>
                      <td>Received Date</td><td>09/01/2022</td>
                    </tr>
                    <tr>
                      <td>Receiving Note</td><td>12/01/2022</td>
                    </tr>
                  </table>
              </div>
              </a-card>
              </a-col>
            </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Manufacturing"></a-tab-pane>
            <a-tab-pane key="3" tab="Outbound Shipment"></a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
// import shipment from '~/components/inventory/treatment/shipment'

export default {
  components: {
    'page-layout': PageLayout,
    // shipment,
  },
  middleware: 'auth',
  data() {
    return {
    }
  },
  mounted() {},
  methods: {
  },
}
</script>
