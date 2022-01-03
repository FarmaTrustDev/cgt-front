<template>
  <div class="patient-details-page">
    <div class="grey-card">
      <a-row :gutter="18">
        <a-col :span="6">
          <a-card :bordered="false" class="qr-section default-card">
            <figure class="m-0">
              <img class="img-fluid" :src="qrUrl" alt="Christina Braun" />
              <figcaption>Christina Braun</figcaption>
            </figure>
          </a-card>
        </a-col>
        <a-col :span="18">
          <a-card :bordered="false" class="default-card details-section">
            <article class="article">
              <h4 class="heading pl-0">Patient Details</h4>
            </article>
            <a-row :gutter="20" dir="ltr">
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted"> Patient ID:</span> DAC61010</h6>
              </a-col>
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted">Gender:</span> Female</h6>
              </a-col>
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted"> Age:</span> 1 month</h6>
              </a-col>
            </a-row>
            <a-row :gutter="20" dir="ltr">
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted">Height:</span> 77 cm</h6>
              </a-col>
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted"> Weight:</span> 77 kg</h6>
              </a-col>
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted">Blood Type :</span> A-</h6>
              </a-col>
            </a-row>
            <a-row :gutter="20" dir="ltr">
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted">Location :</span> London</h6>
              </a-col>
              <a-col :span="8" class="mt-15">
                <h6><span class="text-muted">Email :</span> aana@gmail.com</h6>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="18" class="mt-15">
        <a-col :span="12">
          <a-card :bordered="false" class="default-card">
            <article class="article">
              <h4 class="heading pl-0">External Entities</h4>
            </article>
            <dl class="ant-row common-detail">
              <dt>Treatment Type:</dt>
              <dd>Zolgenzma</dd>
              <dt>Doctor:</dt>
              <dd>Dr. Comfort</dd>
              <dt>Clinician:</dt>
              <dd>Dr. Ryan Katz</dd>
              <dt>Hospital:</dt>
              <dd>Baystate Clinic</dd>
            </dl>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card :bordered="false" class="default-card">
            <article class="article">
              <h4 class="heading pl-0">Treatment Details</h4>
            </article>
            <dl class="row common-detail">
              <dt>Manufacturer:</dt>
              <dd>Cellfuse</dd>
              <dt>Contact:</dt>
              <dd>+44 0123456789</dd>
              <dt>Logistic:</dt>
              <dd>FastLink</dd>
              <dt>Contact:</dt>
              <dd>123456789</dd>
            </dl>
          </a-card>
        </a-col>
      </a-row>

      <a-row :gutter="18" class="mt-15">
        <a-col>
          <a-card :bordered="false" class="default-card">
            <a-tabs type="card">
              <a-tab-pane key="1" tab="Hospital">
                <a-timeline>
                  <a-timeline-item
                    >Create a services site 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Solve initial network problems 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Technical testing 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Network problems being solved 2015-09-01</a-timeline-item
                  >
                </a-timeline>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Logistics">
                <a-timeline>
                  <a-timeline-item
                    >Create a services site 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Solve initial network problems 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Technical testing 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Network problems being solved 2015-09-01</a-timeline-item
                  >
                </a-timeline>
              </a-tab-pane>
              <a-tab-pane key="3" tab="Manufacturer">
                <a-timeline>
                  <a-timeline-item
                    >Create a services site 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Solve initial network problems 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Technical testing 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Network problems being solved 2015-09-01</a-timeline-item
                  >
                </a-timeline>
              </a-tab-pane>
              <a-tab-pane key="4" tab="Logistics">
                <a-timeline>
                  <a-timeline-item
                    >Create a services site 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Solve initial network problems 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Technical testing 2015-09-01</a-timeline-item
                  >
                  <a-timeline-item
                    >Network problems being solved 2015-09-01</a-timeline-item
                  >
                </a-timeline>
              </a-tab-pane>
            </a-tabs>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qrUrl:
        'https://demoapi.qmaid.co/patient/8/treatment/qr/637765674125093892.png',
    }
  },
}
</script>
