<template>
  <div>
    <a-tabs
      tab-position="left"
      :default-active-key="activeTab"
      @change="tabChange"
    >
      <a-tab-pane :key="1" tab="Detail"
        ><Form :treatment="treatment" @getEntity="getEntity" />
      </a-tab-pane>
      <a-tab-pane :key="2" :disabled="!isCreated" tab="Availability"
        ><Availability v-if="isCreated" :manufacturer-treatment="entity" />
      </a-tab-pane>
    </a-tabs>
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
