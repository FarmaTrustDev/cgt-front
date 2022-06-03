<template>
  <div>
    <a-descriptions :title="translation.ColleDetai_2_816">
      <a-descriptions-item :label="translation.SamplColle_3_518">
        {{ entity.collectionDate }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.DelivDispa_3_728">
        {{ entity.pickupDateTime }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.SamplDeliv_3_730">
        {{ entity.deliveryDate }}
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions :title="translation.ExterEntit_2_760">
      <a-descriptions-item :label="translation.Manuf_1_89">
        {{ entity.manufacturerName }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.LogisProvi_2_380">
        {{ entity.logisticName }}
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions :title="translation.TreatSched_3_764">
      <a-descriptions-item :label="translation.TreatStart_3_732">
        {{ entity.manufacturerTreatmentStartDate }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.ComplDate_3_734">
        {{ entity.completionDate }}
      </a-descriptions-item>
      <a-descriptions-item :label="translation.Durat_1_484">
        {{ entity.duration }} Days
      </a-descriptions-item>
      <a-descriptions-item :label="translation.DelivArriv_4_736">
        {{ entity.deliveryArrivalDate }}
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions :title="translation.Notes_1_350">
      <a-descriptions-item>
        {{ entity.notes }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    entity: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
}
</script>
