<template>
  <ion-page>
    <ion-content>
      <div class="px-4">
        <div class="cta">
          <button
            class="auth-tab"
            @click="state = false"
            :style="
              state
                ? 'background-color: rgba(220, 220, 220, 0);'
                : 'background-color: white;'
            "
          >
            Un-Synced
          </button>
          <button
            class="auth-tab"
            @click="getSyncData"
            :style="
              state
                ? 'background-color: white;'
                : 'background-color: rgba(220, 220, 220, 0);'
            "
          >
            Synced
          </button>
        </div>
        <div v-if="!state">
          <button
            class="skip-button text-md mx-auto"
            :disabled="unsyncData.length < 1"
            @click="submit"
            :style="
              unsyncData.length < 1
                ? 'color:#606060;background:#D4D4D4'
                : 'background:#2464a3;color:#fff'
            "
          >
            Sync
          </button>
          <table class="table table-condensed mt-3">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Nicare ID</th>
                    <th>Full Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dat,x) in unsyncData" :key="x">
                    <td>{{ x+1}}</td>
                    <td>{{ dat.nicare_id }}</td>
                    <td>{{ dat.name_of_enrolee }}</td>                    
                </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
            <table class="table table-condensed mt-3">
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Nicare ID</th>
                    <th>Full Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dat,x) in syncData" :key="x">
                    <td>{{ x+1}}</td>
                    <td>{{ dat.nicare_id }}</td>
                    <td>{{ dat.name_of_enrolee }}</td>                    
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script  lang="ts">
import { post, get } from "@/api/client";
import {
  IonTabBar,
  IonLoading,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  toastController,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import { useAuthStore } from "@/stores/auth";
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
      userStore: useAuthStore(),
      syncData: [],
      unsyncData: [],
    };
  },
  methods:{
    async toast(position, msg, type='success',timing= 2000){
      const toast = await toastController.create({
        message:msg,
        color:type,
        duration:timing,
        position:position,
        animated:true,
        mode:'ios'        
      })
      await toast.present();
    },
    async getSyncData(){
      this.state = true
      let res2 = await get('enrolee-visits');        
      if(res2){        
        this.userStore.live = res2
        this.syncData = res2
      }
    },
      async submit(){
        this.$globals.loading2 = true
        let user = JSON.parse(localStorage.getItem('userInfo')||'{}');
        let res = await post('enrolee-visits/bulk',{enrolee_visits:this.userStore.local,activated_user_id:user.id});                
        if(res){          
          this.userStore.local = [];
          this.unsyncData = []
          this.getSyncData();
          this.toast('bottom','Synced Successfully')
        }
        this.$globals.loading2 = false        
      }
  },
  created() {
    this.$globals.pageName = "Sync Page"
    this.syncData = this.userStore.live;
    this.unsyncData = this.userStore.local;
    this.userStore.loadState = false
  },
  watch:{

  }
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