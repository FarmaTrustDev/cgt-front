import { BASE_URL } from '~/services/Constant'
export default {
    methods: {
        getImageUrl(slug) {
            return `${BASE_URL}${slug}`
        },
    },
}
