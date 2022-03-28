<template>
  <div>
    <a-card class="default-border-radius">
      <p class="mb-4 BagID float-right">BagID: BG0000M7</p>
      <p class="mb-4 PUID">PUID: Emma Wilbrouke</p>
      <!-- ============ -->
      <a-card class="p-4 default-border-radius">
        <p class="SubjectMsg">The patient is too sick for further treatments</p>
        <p><span class="patientName">By: Emma Wilbrouke</span></p>
        <p><span class="Date">date: 17:47:16 12 January 2022 </span></p>
        <p>
          <span class="StackHolder">StakeHolder(s): Manufacturer,Courier</span>
        </p>
      </a-card>
      <!-- ============ -->
      <p class="mt-15">Users Involved</p>
      <a-tabs default-active-key="1" :animated="false">
        <a-tab-pane key="1" tab="Hospital">
          <a-row>
            <a-col :span="12">
              <span class="text-muted f">Doctor </span>
              <h6 class="f">Ms Jenny Stephan</h6>
              <h6 class="f">jenny@nhsonline.com</h6>
            </a-col>
            <a-col :span="12">
              <span class="text-muted f">Assist. Doctor </span>
              <h6 class="f">Dr Adam Smith</h6>
              <h6 class="f">adam_1233@nhsonline.com</h6>
            </a-col>
            <a-col :span="12">
              <span class="text-muted f">Nurse : </span>
              <h6 class="f">Cerry MacMillian</h6>
              <h6 class="f">cerry_mm@nhsonline.com</h6>
            </a-col>
            <a-col :span="12">
              <span class="text-muted f">Help Desk :</span>
              <h6 class="f">Rick Blackmore</h6>
              <h6 class="f">support@nhsonline.com</h6>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Manufacturer">
          <a-row>
            <a-col :span="12">
              <span class="text-muted f">Customer Satisfaction Manager </span>
              <h6 class="f">Jack Frost</h6>
              <h6 class="f">jack.frost@cellfuse.com</h6>
              <h6 class="f">+442082343953</h6>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Courier">
          <a-row>
            <a-col :span="12">
              <span>Head of Lab Logistics </span>
              <h6 class="f">Steve Emerson</h6>
              <h6 class="f">steve@fastlink.com</h6>
              <h6 class="f">+442036562473</h6>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="4" tab="Admin">
          <a-row>
            <a-col :span="12">
              <span>Super Admin </span>
              <h6 class="f">Jess Simpson</h6>
              <h6 class="f">jess.simpson@admin.com</h6>
              <h6 class="f">+4420378923487</h6>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
