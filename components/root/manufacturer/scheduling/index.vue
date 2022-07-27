<template>
  <div class="grey-card enrollment-page schedule-create-tabs">
    <a-card :bordered="false" class="default-border-radius  pt-0">
    <a-skeleton :loading="loading" >
    <a-tabs
      tab-position="left"
      :default-active-key="activeTab"
      @change="tabChange"
    >
      <a-tab-pane :key="1" class="m-3"
        >
        <div slot="tab" class="tab-title">
            {{ translation['Detai_1_346'] }}
          </div>
        <Form :treatment="treatment" @getEntity="getEntity" />
      </a-tab-pane>
      <a-tab-pane :key="2" :disabled="!isCreated" class="m-3"
        >
        <div slot="tab" class="tab-title">
            {{ translation['Avail_1_450'] }}
          </div>
        <Availability v-if="isCreated" :manufacturer-treatment="entity" />
      </a-tab-pane>
    </a-tabs>
    </a-skeleton>
    </a-card>
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
      loading:false,
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
