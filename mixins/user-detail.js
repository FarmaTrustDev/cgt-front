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
            return user.roleName === "MANUFACTURER_ADMIN";
        },
        isScientist() {
            const user = this.getStoreUserDetails();
            return user.roleName === "SCIENTIST_TYPE";
        },
        isReceptionist() {
            const user = this.getStoreUserDetails();
            return user.roleName === "RECEPTIONIST_TYPE";
        },
        isHospital() {
            const user = this.getStoreUserDetails();
            return user.roleName === "HOSPITAL_ADMIN";
        },
        isDoctor() {
            const user = this.getStoreUserDetails();
            return user.roleName==="DOCTOR_TYPE";
        },
        isNurse() {
            const user = this.getStoreUserDetails();
            return user.roleName==="NURSE_TYPE";
        },
        isLogistic() {
            const user = this.getStoreUserDetails();
            return user.organizationTypeAlias === "LOGISTIC_ADMIN";
        },
        isSmartLab(){
            const user = this.getStoreUserDetails();
            return user.organizationTypeAlias === "SMARTLAB_ADMIN";
        },
        getStoreUserDetails() {
            return this.$store.getters.getUser
        }
    },
}
