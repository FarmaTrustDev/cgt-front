
export default {
    data() {
        return { translation: this.$store.getters.getTranslation }
    },
    methods: {
        getTranslations() {
            return this.$store.getters.getTranslation
        },
    },
}
