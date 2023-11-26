export default {
    data() {
        return {
            // translation: this.$store.getters.getTranslation
        }
    },
    methods: {
        getApproval() {
            return this.$store.getters.getApproval
        },
    },
    computed: {
        approval() {
            return this.$store.getters.getApproval
        },
    }
}