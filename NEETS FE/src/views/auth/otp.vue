<template>
  <ion-page>
    <ion-content :fullscreen="true" :scroll-y="true">
      <br/>
      <div class="d-flex pt-5" style="">        
        <ion-grid>
          <ion-row>
            <ion-col size="6" size-xs="12" size-sm="12">
              <div class="d-flex flex-column align-items-center mb-0" >
                <img src="/logo.jpg" style="width: 100px;">
                <h5 class="text-center px-4">NiCare Enrolee Encounter Tracking System</h5>
                <!-- <h5 class="text-success mt-5">LGA: RIJAU</h5> -->
              </div>
            </ion-col>
            <ion-col size="6" size-xs="12" size-sm="12">
              <div class=" px-4 d-flex align-items-center flex-column" style="height: 198px;">
                <h4 class="secondary-info-regular">Enter you credentials</h4>
                <div class="row">
                    <div class="col-12 mb-3">    
                    <div class="w-100">
                            <label for="name_of_enrolee">NiCare Code</label>
                            <InputText :class="{'p-invalid':required.nicare_code}" id="name_of_enrolee" v-model="user.nicare_code" aria-describedby="name_of_enrolee-help" />
                            <small class="d-none" id="name_of_enrolee-help">Enter your NiCare Code</small>
                        </div>
                    </div>
                    <div class="col-12 mb-3">    
                        <div class="w-100">
                            <label for="password">Password</label>
                            <InputText :class="{'p-invalid':required.password}" id="sex" v-model="user.password" aria-describedby="sex-help" />
                            <small class="d-none" id="sex-help">Enter your Password</small>
                        </div>
                    </div>
                </div>
              <!--   <div class="d-flex justify-content-center otp-box mx-2">
                  <v-otp-input ref="otpInput" input-classes="otp-input" separator="" :num-inputs="6" :should-auto-focus="true"
                    :is-input-num="true" @on-complete="handleOnComplete" />
                </div> -->
                <button class="skip-button text-md"  @click="verifyOtp" style="background:#2464a3;color:#fff">Login</button>
                <p @click="resendOTP" class="label" style="color: #8A8C8F;border-bottom: 1px solid #8A8C8F;letter-spacing: 0;cursor:pointer;">
                  Click here to reset
                </p>              
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>       
      </div>    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent,IonCol, IonGrid, IonRow  } from "@ionic/vue";
import VOtpInput from "vue3-otp-input";
import { chevronBackOutline } from "ionicons/icons";
import { showModal } from "@/plugins/modal";
import { post } from "@/api/client";
import InputText from 'primevue/inputtext';
import { useAuthStore } from '@/stores/auth'
export default {
  components: { IonPage, IonContent, VOtpInput,IonCol, IonGrid, IonRow,InputText  },
  data() {
    return {
      otp: "",
      email: localStorage.getItem('userEmail'),
      user:{
        nicare_code:'',
        password:''
      },
      required:{
        nicare_code:false,
        password:false
      }
    };
  },
  setup() {
    return { chevronBackOutline };
  },
  methods: {
 
    handleOnComplete(value) {
      this.otp = value;
    },
    async verifyOtp() {
      if(this.user.nicare_code==''){
          this.toast('bottom', 'NiCare Code Required', 'danger')
          return false
      }

      if(this.user.password==''){
          this.toast('bottom', 'Password Required', 'danger')
          return false
      }

      const authStore = useAuthStore()
      this.$globals.loading2 = true
      let res = await authStore.verifyOTP(this.user)
      this.$globals.loading2 = false
      if (res) {
        await showModal({
          title: 'Authentication is Successfull',
          text: "Click on continue to proceed ",
          icon: true,
          iconSVG: this.$globals.icons.check,
          closeOnClickOutside: false,
          confirmText: 'Continue'
        });
        this.$router.push("/home")
      }


    },
    // async verifyOtp() {
    //   const authStore = useAuthStore();
    //   this.$globals.loading2 = true;

    //   await post("sendOTP", {
    //     otp: this.otp,
    //     unique_id: authStore?.userId,
    //     password: authStore.password,
    //   }).then((response) => {
    //     if (response.status === "success") {
    //       const userStore = useUserStore();
    //       userStore.setUser(response.user);
    //       userStore.setSchool(response.school);
    //       authStore.setStoreToken(response.authorisation.token);
    //       initializeEcho(window.baseUrl, response.authorisation.token);
    //       localStorage.setItem("userInfo", JSON.stringify(response?.user));
    //       localStorage.setItem(
    //         "schoolInfo",
    //         JSON.stringify(response?.high_school)
    //       );
    //       localStorage.setItem("user", response.authorisation.token);
    //       localStorage.setItem("userToken", response.authorisation.token);
    //       this.$router.push("/home");
    //     }
    //     this.$globals.loading2 = false;
    //   });
    // },
  },
  computed: {
    disabled() {
      if (this.otp == "" && this.otp.length < 4) {
        return false;
      }
      return true;
    },
  },

  created() {
    const store = useAuthStore()
    store.loadState = false
    this.$globals.footer = false;
    this.$globals.sideBar = false;
    this.$globals.navBar = false;
  },
};
</script>

<style scoped>
.skip-button {
  border-radius: 8px;
  background: #2464a3;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 25px;
  margin-bottom: 12px;
}
</style>
<style >


.otp-box div  .otp-input{
    margin-left: 5px !important;
    margin-right: 5px !important;
    width: 39px;
    height: 39px;
}

</style>
