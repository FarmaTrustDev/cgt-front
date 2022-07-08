<template>
  <div class="grey-card enrollment-page">
    <a-skeleton :loading="loading" >
    <a-tabs
      class="ant-card schedule-create-tabs"
      tab-position="left"
      :default-active-key="activeTab"
      @change="tabChange"
    >
      <a-tab-pane :key="1" :tab="translation.Detai_1_346" class="m-3"
        ><Form :treatment="treatment" @getEntity="getEntity" />
      </a-tab-pane>
      <a-tab-pane :key="2" :disabled="!isCreated" :tab="translation.Avail_1_450" class="m-3"
        ><Availability v-if="isCreated" :manufacturer-treatment="entity" />
      </a-tab-pane>
    </a-tabs>
    </a-skeleton>
  </div>
</template>

<script>
import Form from '~/components/root/manufacturer/scheduling/Form'
// import Calendar from '~/components/root/manufacturer/scheduling/Calendar'
import Availability from '~/components/root/manufacturer/scheduling/Availability'
export default {
  components: {
    Form,
    Availability,
  },
  data() {
    return {
      activeTab: 1,
      treatment: {},
      entity: {},
      isCreated: false,
    }
  },
  mounted() {
    // this.isTreatmentCreate()
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  methods: {
    getEntity(entity) {
      // eneity yahen fetch kar k childs ko pass karni hai
      this.entity = entity
      this.isCreated = true
    },
    tabChange(a, b, c) {
      console.log(a, b, c)
    },
  },
}
</script>
