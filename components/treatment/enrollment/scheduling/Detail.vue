<template>
  <div>
    
    <a-descriptions title="Collection Details">
      <a-descriptions-item label="Sample Collection Date">
        {{ entity.hospitalCollectionDate }}
      </a-descriptions-item>
      <a-descriptions-item label="Delivery Dispatch Date">
        {{ entity.pickupDateTime }}
      </a-descriptions-item>
      <a-descriptions-item label="Samples Delivery Date">
        {{ entity.deliveryDate }}
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions title="External Entities">
      <a-descriptions-item label="Manufacturer">
        {{ entity.manufacturerName }}
      </a-descriptions-item>
      <a-descriptions-item label="Logistics Provider">
        {{ entity.logisticName }}
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions title="Treatment Schedule Details">
      <a-descriptions-item label="Treatment Start Date">
        {{ entity.manufacturerTreatmentStartDate }}
      </a-descriptions-item>
      <a-descriptions-item label="Completion Date (est.)">
        {{ entity.completionDate }}
      </a-descriptions-item>
      <a-descriptions-item label="Duration">
        {{ entity.duration }} Days
      </a-descriptions-item>
      <a-descriptions-item label="Delivery Arrival Date (est.)">
        {{ entity.deliveryArrivalDate }}
      </a-descriptions-item>
    </a-descriptions>

    <a-descriptions title="Notes">
      <a-descriptions-item >
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
}
</script>
