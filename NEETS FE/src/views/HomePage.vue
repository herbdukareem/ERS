<template>      
  <ion-page>
    <ion-content :fullscreen="true"> 
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <div v-if="userStore.loadState"  class="px-4 d-flex pt-5 align-items-center" style="height: 90vh;">                
        <ion-grid>
          <ion-row>
            <ion-col size="6" size-xs="12" size-sm="12">
              
              <div class="d-flex flex-column align-items-center mb-0" >
                <img src="/logo.jpg" style="width: 100px;">
                <h5 class="text-center px-4">NiCare Enrolee Encounter Tracking System</h5>                
              </div>
            </ion-col>
          <!--   <ion-col size="6" size-xs="12" size-sm="12">
              <div class=" px-0 d-flex align-items-center flex-column" style="height: 198px;">
                <div class="mt-5">            
                    <img src="@/assets/bg.jpeg" style="width:80px;height:80px;border-radius: 6px;" class="mx-2">
                    <img src="@/assets/tn.jpg" style="width:80px;height:80px;border-radius: 6px;" class="mx-2" >
                </div>
              </div>
            </ion-col> -->
          </ion-row>
        </ion-grid>       
      </div>   
      <div v-else >        
        <div  class="px-3 backgroundx"  >
          <div v-if="screen == 0" class="w-100">
            <img src="/logo.jpg" class="mx-auto d-block" style="width: 100px; border-radius:10px ;">        
            <div class="row">
              <ion-list lines="none" mode="ios"   style="background:transparent;">
                <ion-item color="transparent">
                  <ion-label>Total Un-syc</ion-label>
                  <ion-badge color="primary">{{ userStore.local.length}}</ion-badge>
                </ion-item>
                <ion-item color="transparent">
                  <ion-label>Total last Sync</ion-label>
                  <ion-badge color="secondary">{{ userStore.live.length}}</ion-badge>
                </ion-item>             
              </ion-list>
            </div>
            <div class="my-3 w-100 " @click="selectScreen(1)" :key="screen+'_'+screenSettings.first"  :data-aos="selectedScreen==0?'fade-up':selectedScreen==1?'new-animation':'fade-up'" data-aos-delay="0" data-aos-duration="500">
              <ion-button  style="height: 100px;" size="large" expand="full" color="primary" mode="md" shape="round">
                <ion-icon slot="start" size="large" :icon="receiptOutline"></ion-icon>
                Encounter Tracking</ion-button>
            </div>                       
          <div class="my-3"  @click="selectScreen(2)" :key="screen+'_'+screenSettings.second"  :data-aos="selectedScreen==0?'fade-up':selectedScreen==2?'new-animation':'fade-up'" :data-aos-delay="selectedScreen==0?300:0" data-aos-duration="500">
            <ion-button style="height: 100px;" size="large" expand="full" color="warning" mode="md" shape="round">                
                <ion-icon slot="start" color="danger" :icon="medkit"></ion-icon>
                 
                Medical Bill/Expenses</ion-button>          
          </div> 
          <div class="my-3" :key="screen+'_'+screenSettings.third"  :data-aos="selectedScreen==0?'fade-up':selectedScreen==3?'new-animation':'fade-up'" :data-aos-delay="selectedScreen==0?600:0" data-aos-duration="500">
            <ion-button style="height: 100px;" size="large" expand="full" color="danger" mode="md" shape="round">
                <ion-icon slot="start" :icon="settingsOutline"></ion-icon>
                Configuration</ion-button>                    
          </div>
        </div>
        <div v-if="screen != 0" style="height: 100%;padding: 30px 0px;">
          <button class="btn btn-light mb-2" @click="back()">Back</button>
          <ion-segment @ion-change="changeSegment" mode="ios" value="new">
            <ion-segment-button value="new">
              <ion-label>New</ion-label>
            </ion-segment-button>
            <ion-segment-button value="sync">
              <ion-label>Synced Data</ion-label>
            </ion-segment-button>
            <ion-segment-button value="unsync">
              <ion-label>Un-Sync Data</ion-label>
            </ion-segment-button>
          </ion-segment>          
          <div class="mt-3"></div>
          <div v-if="screen == 1" data-aos="zoom-in" data-aos-duration="500" data-aos-easing="ease-in-quad" style="height:90%; ">                      
            <div v-show="segmentTab == 'new'">          
              <Fieldset class="shadow" style="border:none !important; height: 96%;" :pt="{legend:{style:'border:none !important'}}">     
                <template #legend>
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="text-center mb-0 text-secondary badge text-center p-0">Encounter Tracking Form</h5>
                    
                  </div>
                </template>   
                
                  <p class="row w-100 mx-auto" >        
                    <div  class="col-12 mb-2 mt-4">    
                        <div class="w-100">
                            <label for="nicare_id">Nicare ID</label>
                            <InputText :class="{'p-invalid':required.nicare_id}" id="nicare_id" v-model="enrolee.nicare_id" aria-describedby="nicare_id-help" />
                            <center>
                              <Button v-show="!showfields" @click="fetchData"  class="mt-3" :disabled="showSubmit" label="Fetch Data" />
                            </center> 
                            <small class="d-none" id="nicare_id-help">Enter your Nicare ID</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="name_of_enrolee">Name of Enrolee</label>
                            <InputText disabled :class="{'p-invalid':required.name_of_enrolee}" id="name_of_enrolee" v-model="enrolee.name_of_enrolee" aria-describedby="name_of_enrolee-help" />
                            <small class="d-none" id="name_of_enrolee-help">Enter your Name of Enrolee</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="sex">Sex</label>
                            <InputText disabled :class="{'p-invalid':required.sex}" id="sex" v-model="enrolee.sex" aria-describedby="sex-help" />
                            <small class="d-none" id="sex-help">Enter your Sex</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="phone">Phone</label>
                            <div class="flex align-items-center p-2">
                                <Checkbox v-model="enablePhoneNumber" inputId="ingredient1"  :value="true" />
                                <label for="ingredient1" class="ml-2"> Change </label>
                            </div>
                            <InputText :disabled="enablePhoneNumber.length<1" :class="{'p-invalid':required.phone}" id="phone" v-model="enrolee.phone" aria-describedby="phone-help" />
                            <small class="d-none" id="phone-help">Enter your Phone</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="lga">LGA</label>
                            <InputText disabled :class="{'p-invalid':required.lga}" id="lga" :value="enrolee.lga" aria-describedby="lga-help" />
                            <small class="d-none" id="lga-help">Enter your LGA</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100-2">
                            <label for="ward">Ward</label>
                            <InputText disabled :class="{'p-invalid':required.ward}" id="ward" :value="enrolee.ward" aria-describedby="ward-help" />
                            <small class="d-none" id="ward-help">Enter your Ward</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="facility">Facility</label>
                            <InputText disabled :class="{'p-invalid':required.facility}" id="facility" :value="enrolee.facility" aria-describedby="facility-help" />
                            <small class="d-none" id="facility-help">Enter your Facility</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="reason_for_visit">Reason for Visit/Presenting Complaints</label>
                            <InputText placeholder="Enter Reason for Visit" id="reason_for_visit" v-model="enrolee.reason_for_visit" aria-describedby="facility-help" />                      
                            <small class="d-none" id="service_accessed-help23">Enter your Reason for Visit</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="reason_of_accessed">Service Accessed</label>
                            <Dropdown filter :class="{'p-invalid':required.service_accessed}" v-model="enrolee.service_accessed" :options="services" optionLabel="case_name" optionValue="id" placeholder="Select Service Accessed" class="w-100" />                
                            <small class="d-none" id="service_accessed-help">Enter your Accessed of Visit</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="date_of_visit">Date of Visit/Encounter</label>
                            <Calendar :pt="{input:{class:'w-100'}}" class="d-block" :class="{'p-invalid':required.date_of_visit}" id="date_of_visit" v-model="enrolee.date_of_visit"  dateFormat="dd-mm-yy" />                      
                            <small class="d-none" id="date_of_visit-help">Enter your Date of Visit</small>
                        </div>
                    </div>
                    <div v-show="showfields && enrolee.nicare_id !=''" class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="reporting_month">Reporting Month</label>
                            <Calendar :pt="{input:{class:'w-100'}}" class="d-block" :class="{'p-invalid':required.reporting_month}" id="reporting_month" v-model="enrolee.reporting_month" view="month" dateFormat="mm-yy" />                      
                            <small class="d-none" id="reporting_month-help">Enter your Reporting Month</small>
                        </div>
                    </div>
                    <center>
                      <Button v-show="showfields && enrolee.nicare_id !=''" @click="addRecord"  class="mt-3" :disabled="!(enrolee.date_of_visit && enrolee.service_accessed && enrolee.reporting_month)" label="Save Data" />
                    </center> 
                  </p>            
      
              </Fieldset>   
            </div>
            <div v-show="segmentTab == 'unsync'" style="height:90%">              
              <UnSyncPage type="form"></UnSyncPage>
            </div>
            <div v-show="segmentTab == 'sync'">
              <SyncPage type="form"></SyncPage>
            </div>
          </div>
          <div v-if="screen == 2" data-aos="zoom-in" data-aos-duration="500" data-aos-easing="ease-in-quad">
            <Fieldset class="shadow" style="border:none !important; height: 96%;" :pt="{legend:{style:'border:none !important'}}">     
                <template #legend>
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="text-center mb-0 text-secondary badge text-center p-0">Medical Bills</h5>
                    
                  </div>
                </template>   
                
                  <p class="row w-100 mx-auto" >        
                    <div  class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="reporting_month">Month</label>
                            <Calendar :pt="{input:{class:'w-100'}}" class="d-block" :class="{'p-invalid':required.reporting_month}" id="reporting_month" v-model="meds.month" view="month" dateFormat="mm-yy" />                      
                            <small class="d-none" id="reporting_month-help">Enter your Reporting Month</small>
                        </div>
                    </div>
                    <div class="col-12 mb-2">    
                        <div class="w-100">
                            <label for="name_of_enrolee">Amount</label>
                            <InputText type="number" :class="{'p-invalid':required.name_of_enrolee}" id="amount" v-model="meds.amount" aria-describedby="name_of_enrolee-help" />
                            <small class="d-none" id="name_of_enrolee-help-3">Enter your Amount</small>
                            <center>
                              <Button @click="saveMeds"  class="mt-3" :disabled="!(meds.amount && meds.month)" label="Save Data" />
                            </center> 
                        </div>
                    </div>
                    </p>
              </Fieldset>
          </div>
        </div>
        </div>
      </div>     
    </ion-content>
    </ion-page>
</template>

<script lang="ts">
import jquery from 'jquery';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Fieldset from 'primevue/fieldset';
import Calendar from 'primevue/calendar';
const $ = jquery
import {useAuthStore} from '@/stores/auth'
import { post } from "@/api/client";
import {get} from '@/api/client'
import SyncPage from '@/components/SyncPage.vue'
import UnSyncPage from '@/components/UnSyncPage.vue'
import { settingsOutline, medkit, receiptOutline, radio, library } from 'ionicons/icons';
import { IonContent,IonCardContent,IonRefresher,
          IonBadge, IonItem, IonLabel, IonList,
          IonSegment, IonSegmentButton,
          IonRefresherContent, IonHeader, IonPage, IonIcon,IonCard, toastController, IonButton} from '@ionic/vue';
export default {
  components:{
    IonIcon,
    IonButton,
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonRefresher,
    IonRefresherContent,
    Checkbox,
    InputText,
    Dropdown,
    Button,
    Fieldset,
    Calendar,
    IonBadge, IonItem, IonLabel, IonList,
    IonSegment, IonSegmentButton,
    SyncPage,UnSyncPage
  },
  computed:{
    showSubmit(){
      return this.enrolee.nicare_id == '';
    }
  },
  setup() {
      return { settingsOutline, medkit,receiptOutline };
    },
  data(){
    return {
      meds:{
        month:'',
        amount:0,
      },
      segmentTab:'new',
      radio,
      library,
      screenSettings:{
        first:0,
        second:0,
        third:0,
      },
      selectedScreen:0,
      screen:0,
      enrolee:{
        nicare_id:'',
        name_of_enrolee:'',
        sex:'',
        phone:'',
        lga:'',
        ward:'',
        facility:'',        
        reason_for_visit:'',
        service_accessed:'',
        date_of_visit:'',
        reporting_month:'',
        lga_id:'',
        ward_id:'',
        facility_id:'',
      },
      showfields:false,
      
      services:useAuthStore().services,
      enablePhoneNumber:[],
      userStore:useAuthStore(),
      disabled:true,
      required:{
        nicare_id:false,
        name_of_enrolee:false,
        sex:false,
        phone:false,
        lga:false,
        ward:false,
        facility:false,
        service_accessed:false,
        date_of_visit:false,
        reporting_month:false,
      },
      scannerObj:{},
      scanner:false,      
      ward_name:'',
      unit_name:'',
      errorCounter:0,
      clicked:false
    }
  },
  methods:{
    changeSegment(data){
      this.segmentTab = data.detail.value;
      if(data.detail.value == 'new'){
        this.clearRecord();
      }else if(data.detail.value == 'unsync'){

      }else{

      }
    },
    back(){
      this.screen=0
      this.selectedScreen = 0
      this.screenSettings = {
        first:0,
        second:0,
        third:0,
      }
    },
    selectScreen(t){
      this.selectedScreen = t;
      if(t == 1){
        this.screenSettings.first = 1;
      }
      if(t == 2){
        this.screenSettings.second = 2;
      }
      if(t == 3){
        this.screenSettings.third = 3;
      }
      setTimeout(()=>{
        this.screen = t
      },100)
    },
    async saveMeds(){
        this.$globals.loading2 = true
        let user = JSON.parse(localStorage.getItem('userInfo')||'{}');
        let res = await post('meds/save',{amount:this.meds.amount,month:this.meds.month,user_id:user.id});                
        console.log(res,43948)
        if(res){                              
          this.toast('bottom','Saved Successfully')
          this.meds.amount = 0;
          this.meds.month ='';
        }
        this.$globals.loading2 = false       
    },
    fetchData(){
      
      var res = this.userStore.confirmBookmarked( this.enrolee.nicare_id,'enrolees')
      if(res){
        this.showfields = true;
        this.enrolee.nicare_id = res.nicare_id
        this.enrolee.name_of_enrolee = res.name_of_enrolee
        this.enrolee.sex = res.sex
        this.enrolee.phone = res.phone_number
        this.enrolee.lga = res.lga_name
        this.enrolee.lga_id = res.lga
        this.enrolee.ward = res.ward_name
        this.enrolee.ward_id =res.ward
        this.enrolee.facility =res.facility       
        this.enrolee.facility_id =res.provider_id       
        this.enrolee.service_accessed =''
        this.enrolee.reason_for_visit =''
        this.enrolee.date_of_visit =''
        this.enrolee.reporting_month =''
        this.toast('bottom', 'matched', 'success')
      }else{
        this.toast('bottom', 'Invalid Verification', 'danger')
      }
    },
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
    clearRecord(){
     this.enrolee.nicare_id = '';   
     this.showfields = false;   
    },
    async handleRefresh(event) {      
        let res = await get('enrolees-data/'+this.userStore.userInfo.id)
        if(res){
          this.userStore.enrolees =res.enrolees
          this.userStore.services =res.services
        }
        event.target.complete();
    },  
      validateInput() {
          // Check if the input contains only numeric characters
          if (/^[0-9]+$/.test(this.enrolee.voter_id)) {

          } else {            
            this.toast('bottom', 'Invalid Input', 'danger')
            return false
          }
        },
        addRecord(){        
      /*   if(this.enrolee.beneficiary_code==''){
          this.toast('bottom', 'Scanning Required', 'danger')
          return false
        }else{          
          if(this.info.voter_id==''){
            this.toast('bottom', 'Voter ID Number Required', 'danger')
            return false
          }
          if (!/^[0-9]+$/.test(this.info.voter_id)) {
            this.toast('bottom', 'Invalid Input', 'danger')
            return false
          }
          if(this.info.voter_id.length < 10){
            this.toast('bottom', 'Voter ID Number Incomplete', 'danger')
            return false
          } */
          let obj = null;
          obj = this.userStore.confirmBookmarked(this.enrolee.nicare_id,'enrolees')
          if(obj){      
            this.userStore.bookmark(JSON.parse(JSON.stringify(this.enrolee)), 'local')
            this.enrolee.nicare_id = ''
            this.enrolee.reason_for_visit = ''
            this.enrolee.service_accessed = ''
            this.enrolee.date_of_visit = ''
            this.enrolee.reporting_month = ''
            this.showfields = false;
            this.toast('bottom', this.enrolee.nicare_id +' Record Add ', 'success', 10000)
          }else{
            this.toast('bottom', 'Invalid NiCare ID', 'danger')
          }
        }      
              
  },
  async created() {
    this.$globals.footer = false;
    this.$globals.sideBar = false;
    this.$globals.navBar = false;
    this.$globals.backBtn = false;
    this.$globals.pageName = '';

    if(this.userStore.loadState){
      setTimeout(()=>{
       /*  this.$globals.footer = false;
        this.$globals.sideBar = true;
        this.$globals.navBar = true; */
        this.userStore.loadState = false
      },4000)
    }else{
   /*    this.$globals.sideBar = true;
    this.$globals.navBar = true; */
    }
    const $this = this
    this.disabled = false
  
  }
};
</script>
<style>
#background-content{
  border-radius:5px;
}
input {
    width: 100%;
    border-radius: 9px !important;
}
div#pv_id_1_content {
    height: 88%;
    overflow: auto;
}
button.button-native {
    border-radius: 10px !important;
}
</style>

<style scoped>
button.button-native {
    border-radius: 10px !important;
}
div#pv_id_3 {
  border-radius: 9px !important;
}
.skip-button {
  border-radius: 8px;
  background: #2464a3;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 25px;
  margin-bottom: 12px;
}
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
label{
  font-size: 13.2px;
}
.backgroundx{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height:100vh !important;
  z-index: 2px !important;
}
.backgroundx::after{
  background-image: url('/logo.jpg');
  content:'';
  width:100%;
  height: 100%;
  position:absolute;
  filter: blur(44px);
  display: block;
  top:0px;
  z-index: -1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
[data-aos="new-animation"] {
  transform: scale(1);
  transition-property: transform;

  &.aos-animate {
    transform: scale(0.7);
  }
}
.p-dropdown.p-component[data-v-9b48b94e] {
    max-width: 290px !important;
}
</style>
