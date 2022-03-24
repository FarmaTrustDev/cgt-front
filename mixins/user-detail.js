import { setUserDetails } from '~/services/Auth'
import UserService from '~/services/API/UserServices'
export default {
    methods: {
        getUserDetails() {
            UserService.detail()
                .then((user) => {
                    setUserDetails(user)
                    this.$store.commit('setUser', user)
                })
                .then(() => {
                    // this.$router.go()
                })
        },
    },
}
