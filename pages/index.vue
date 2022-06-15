<template>
<div class="home-page">
    <h1 class="title ml-80" ><strong>{{translation['Mydashb_2_7']}}</strong></h1>

    <manufacturerHome v-if="isManufacturer()" />
    <hospitalHome v-if="isHospital()" />
    <logisticHome v-if="isLogistic()" />
    <smartLabHome v-if="isSmartLab()" />
</div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
import manufacturerHome from '~/components/root/manufacturer/home'
import hospitalHome from '~/components/root/hospital/home'
import logisticHome from '~/components/root/logistic/home'
import smartLabHome from '~/components/root/smartlab/home'
export default {
    components: {
        manufacturerHome,
        hospitalHome,
        logisticHome,
        smartLabHome
    },
    mixins: [routeHelpers, userDetail],
    middleware: 'auth',
    data() {
        return {}
    },
    mounted() {},
    computed: {
        translation() {
            return this.$store.getters.getTranslation
        },
    },
    methods: {
        gotoView(uri) {
            this.goto(`/${uri}`)
        },
    },
}
</script>
