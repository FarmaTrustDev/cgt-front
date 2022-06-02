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
        isManufacturer() {
            const user = this.getStoreUserDetails();
            return user.organizationTypeAlias === "MANUFACTURER";
        },
        isHospital() {
            const user = this.getStoreUserDetails();
            return user.organizationTypeAlias === "HOSPITAL";
        },
        isLogistic() {
            const user = this.getStoreUserDetails();
            return user.organizationTypeAlias === "LOGISTIC";
        },
        isSmartLab(){
            const user = this.getStoreUserDetails();
            return user.organizationTypeAlias === "SMARTLAB";
        },
        getStoreUserDetails() {
            return this.$store.getters.getUser
        }
    },
}
