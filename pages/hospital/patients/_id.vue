<template>
	<div class="grey-card enrollment-page">
 		<a-card :bordered="false" class="default-border-radius">
 			<Enrollment />
 		</a-card>
 	</div>
</template>

<script>
import Enrollment from '~/components/root/patient/enrollment'
export default {
  components: { Enrollment },
  middleware: 'auth',
  mounted() {},
}
</script>
