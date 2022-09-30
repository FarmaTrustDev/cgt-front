<template>
  <div class="mt-3 manf-treatment container" style="margin-top:80px">
    <div class="page-header clearfix">
      <h3 class="page-title pl-5 float-left">
        Entities
      </h3>
    </div>
    <div class="h-tabs large-tabs rounded-table manf-treatment-body">
      <a-tabs type="card" :animated="false">
        <a-tab-pane key="1" tab="Hospital">
          <hospitals />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Manufacturer">
          <manufacturer />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Logistic">
            <logistic/>
          </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>
<script>
import hospitals from '~/components/root/superAdmin/Entities/hospital'
import manufacturer from '~/components/root/superAdmin/Entities/manufacturer'
import logistic from '~/components/root/superAdmin/Entities/logistics'
export default {
    components:{hospitals,manufacturer,logistic},
      computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>