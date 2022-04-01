<template>
  <a-card>
    <a-row>
      <a-col :span="24">
        <ImageHeading :detail="{ img: '4', heading: 'Dresden Hospital' }" />
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import ImageHeading from '~/components/cards/ImageHeading'
export default {
  components: {
    ImageHeading,
  },
}
</script>
