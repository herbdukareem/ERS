<template>
  <ion-page>
    <ion-content>
      <div class="px-4">             
          <button
            class="skip-button text-md mx-auto"            
            @click="submit"
            style="color:#606060;background:#D4D4D4">
            Generate Voucher
          </button>          
        </div>        
      </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { post } from "@/api/client";
import {
  IonTabBar,
  IonLoading,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { useUserStore } from "@/stores/user";
export default {
  components: {
    IonTabBar,
    IonLoading,
    IonTabButton,
    IonTabs,
    IonLabel,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  data() {
    return {
      state: false,
      disabled: true,
      userStore: useUserStore(),
    };
  },
  methods:{
      async submit(){
        let res = post('gen-voucher');
      }
  },
  created() {
    this.$globals.pageName = "Voucher Page"   
  },
};
</script>
<style scoped>
.tab-selected span {
  fill: #f1c111 !important;
}

.tab-selected ion-label {
  color: #f1c111 !important;
}

ion-tab-button span,
ion-tab-button > ion-label {
  fill: #333333;
}

ion-tab-bar {
  padding: 15px 24px;
}
.skip-button {
  border-radius: 8px;
  background: #2464a3;
  width: 50%;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 25px;
  margin-bottom: 12px;
}
.cta {
  display: flex;
  background-color: rgba(220, 220, 220, 0.541);
  margin: auto;
  justify-content: space-between;
  border-radius: 10px;
  padding: 2px;
  margin-top: 20px;
}

.auth-tab {
  color: #09101d;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  width: 50%;
  padding: 5px;
  background-color: white;
  border-radius: 10px;
}
</style>