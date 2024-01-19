<template>
  <div class="mt-3 manf-treatment container" style="margin-top: 80px">
    <div class="page-header clearfix">
      <h3 class="page-title pl-5 float-left">{{translation.Entit_1_945}}</h3>
    </div>
    <div class="h-tabs large-tabs rounded-table manf-treatment-body">
      <a-tabs type="card" :animated="false">
        <a-tab-pane key="1" :tab="translation.Hospi_1_47">
          <organization :alias="hospAlias" :field-name="'Hospital'" :title-text="translation.Hospi_1_47" />
        </a-tab-pane>
        <a-tab-pane key="2" :tab="translation.Manuf_1_89">
          <organization :alias="manfAlias" :field-name="'Manufacturer'" :title-text="translation.Manuf_1_89" />
        </a-tab-pane>
        <a-tab-pane key="3" :tab="translation.Logis_1_146">
          <organization :alias="logAlias" :field-name="'Logistic'" :title-text="translation.Logis_1_146" />
        </a-tab-pane>
        <a-tab-pane key="4" :tab="translation._1_440"> 
          <organization :alias="smartLabAlias" :field-name="'SmartLab'" :title-text="translation._1_440" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
// import hospitals from '~/components/root/superAdmin/Entities/hospital'
// import manufacturer from '~/components/root/superAdmin/Entities/manufacturer'
// import logistic from '~/components/root/superAdmin/Entities/logistics'
import organization from '~/components/root/superAdmin/entities/organization'
import {
  LOGISTIC_ALIAS,
  HOSPITAL_ALIAS,
  MANUFACTURER_ALIAS,
  SMARTLAB_ALIAS,
} from '~/services/Constant'
export default {
  components: { organization },
  data() {
    return {
      hospAlias: HOSPITAL_ALIAS,
      manfAlias: MANUFACTURER_ALIAS,
      logAlias: LOGISTIC_ALIAS,
      smartLabAlias: SMARTLAB_ALIAS
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
