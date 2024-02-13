<template>
  <div>
    <a-skeleton :loading="loading">
      <a-col :span="12">
        <a-card :bordered="false" class="default-card">
          <article class="article">
            <h4 class="heading pl-0">{{ translation.ExterEntit_2_760 }}</h4>
          </article>
          <dl class="ant-row common-detail">
            <dt>{{ translation.TreatType_2_67 }}:</dt>
            <dd>{{ treatment.treatmentTypeName }}</dd>
            <dt>{{ translation.Docto_1_236 }}:</dt>
            <dd>Dr. Comfort</dd>
            <dt>{{ translation.Clini_1_762 }}:</dt>
            <dd>Dr. Ryan Katz</dd>
            <dt>{{ translation.Hospi_1_47 }}:</dt>
            <dd>{{ treatmentData.hospitalName }}</dd>
          </dl>
        </a-card>
      </a-col>
      <a-col v-if="treatment.treatmentTypeName==='IVF/ICSI'" :span="12">
        <a-card :bordered="false" class="default-card">
          <article class="article">
            <h4 class="heading pl-0">{{ translation.TreatDetai_2_304 }}</h4>
          </article>
          <dl class="row common-detail">
            <dt>Project ID:</dt>
            <dd>IVP3425</dd>
            <dt>Partner ID:</dt>
            <dd>{{ treatment.patient.partnerID }}</dd>
            <dt>Partner Name:</dt>
            <dd>{{ treatment.patient.partnerName }}</dd>
            <dt>Partner DoB:</dt>
            <dd>{{ treatment.patient.partnerDoB }}</dd>
          </dl>
        </a-card>
      </a-col>
      <a-col v-else :span="12">
        <a-card :bordered="false" class="default-card">
          <article class="article">
            <h4 class="heading pl-0">{{ translation.TreatDetai_2_304 }}</h4>
          </article>
          <dl class="row common-detail">
            <dt>{{ translation.Manuf_1_89 }}:</dt>
            <dd>
              {{
                treatmentData.manufacturerName == null
                  ? 'N/A'
                  : treatmentData.manufacturerName
              }}
            </dd>
            <dt>{{ translation.ContaNumbe_2_404 }}:</dt>
            <dd>
              {{treatmentData.manufacturerContact}}
            </dd>
            <dt>{{ translation.Logis_1_146 }}:</dt>
            <dd>
              {{
                treatmentData.logisticName == null
                  ? 'N/A'
                  : treatmentData.logisticName
              }}
            </dd>
            <dt>{{ translation.ContaNumbe_2_404 }}:</dt>
            <dd>
              {{treatmentData.logisticContact}}
            </dd>
          </dl>
        </a-card>
      </a-col>
    </a-skeleton>
  </div>
</template>
<script>
import SchedulingServices from '~/services/API/SchedulingServices'
import { isEmpty } from '~/services/Helpers'
export default {
  props: {
    treatment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { treatmentData: {}, loading: false }
  },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  mounted() {
    this.fetchByTreatmentId(this.treatment.id)
  },
  methods: {
    fetchByTreatmentId(id) {
      if (!isEmpty(id)) {
        if (this.treatment.isSchedule) {
          // this.loading = true
          SchedulingServices.getByTreatment(id)
            .then((response) => {
              this.treatmentData = response.data
            })
            // .finally(() => (this.loading = false))
        }
      }
    },
  },
}
</script>
