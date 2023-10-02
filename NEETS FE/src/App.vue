<template>
  <div>
    <ion-menu menu-id="sidemenu-bar" content-id="main-content" class="sidemenu">
      <ion-header>
        <ion-toolbar class="sidem" color="#2464a3">
          <ion-avatar>
            <img alt="Silhouette of a person's head" src="/logo.jpg" />
          </ion-avatar>
          <p class="m-0 mt-3 text-warning" style="font-size: 10px;">Activation code</p>
          <h2 class="h4-semi-bold ">NEET108470337</h2>
          <div class="d-flex align-items-center gap-1">
            <h5 class="body-b3-regular m-0" style="font-size:14px;">Facility: {{ userInfo?.facility_name }}</h5>
            <span tabindex="0" @click="showUnit" v-html="$globals.icons.circle_warning"></span>            
          </div> 
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-menu-toggle>
          <router-link  to='/'>
            <ion-item button>
              <ion-icon slot="start" :icon="home"></ion-icon>
              <ion-label>Home</ion-label>
            </ion-item>
          </router-link>
          
          <router-link  to='/newpage'>
            <ion-item button>
              <!-- <ion-icon slot="start" :icon="home"></ion-icon> -->
              <img slot="start" class="menuIcon " style="margin-right: 29px !important;" src="@/assets/activities.svg" /> 
              <ion-label class="ms-1">Sync</ion-label>
            </ion-item>
          </router-link>

          <router-link  @click="logout" to="#">
            <ion-item button>         
              <img style="margin-right: 29px !important;" class="menuIcon" src="@/assets/profile.svg" />                    
              <ion-label class="ms-1">Sign Out</ion-label>
            </ion-item>
          </router-link>        
        </ion-menu-toggle>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content" style="border-radius:5px;">
      <ion-loading trigger="open-loading" :isOpen="$globals.loading2" message="Loading..." duration="9000000"
            spinner="circles"></ion-loading>        
      <ion-header v-if="$globals.navBar">
        <ion-toolbar>
          <!-- <div style="display:flex;align-items:center"> -->
          <ion-buttons style="padding-left: 6px; " @click="openMenu" slot="start" v-if="$globals.sideBar">
            <ion-menu-button></ion-menu-button>        
          </ion-buttons>
          
          <ion-back-button
            v-if="$globals.backBtn"
            slot="primary"
            class="me-3" 
            @click="$router.go(-1)"
          ></ion-back-button>
          
          <ion-title class="text-center" style="text-transform: capitalize">{{
            $globals.pageName
          }}</ion-title>
          
        </ion-toolbar>   
      </ion-header>
      <ion-content class="ion-padding" style="height:200vh">
        <ion-router-outlet  class="slide-up"></ion-router-outlet>
        <!-- <transition-group name="slide-up" mode="in-out">
        </transition-group> -->
      </ion-content>
    </ion-page>
  </div>
</template>

<script lang="ts">
import { home } from 'ionicons/icons';
import jquery from 'jquery';
import { RouterLink } from 'vue-router';
const $ = jquery
import {    
  IonButtons,
  IonContent,
  IonBackButton,
  IonTabButton,
  IonMenuToggle,
  IonRouterOutlet,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonLoading,
  menuController 
} from "@ionic/vue";
import BackBtn from "@/components/BackBtn.vue";

import { showModal } from "@/plugins/modal";
export default {
  setup() {
      return {
        home  
      };
    },
  components: {
    RouterLink,
    IonTabButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonRouterOutlet,
    IonToolbar,
    BackBtn,
    IonBackButton,
    IonMenuToggle,
    IonAvatar,
    menuController,
    IonLoading
  },
  methods: {
    showUnit(){
      showModal({
        title:'Your Units',
        text: this.userInfo?.unit_lists||'not available'
      })
    },
    logout() {
      localStorage.clear();
      this.$router.push("/auth");
    },
    async openMenu(){
        // Open the menu by menu-id
        await menuController.enable(true, 'sidemenu-bar');
        await menuController.open('sidemenu-bar');
    },  
  },
  mounted() {
 /*    const styleElement = document.createElement("style");
    styleElement.textContent =
      ".px-3 { padding-right: 0.5rem !important; padding-left: 0.5rem !important; }";
    document.body.appendChild(styleElement);     */
  /* 
    $(document).ready(function(){
      var toolbarContainers = $('ion-header');
      if (toolbarContainers.length > 0) {
        toolbarContainers.eq(1).remove();
      }
    }); */
  },
  data() {
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
    };
  },
};
</script>

<style scoped>
.header-md {
  box-shadow: none !important;
}

.header-md::after {
  background: #2464a3;
  content: "";
  width: 100%;
  height: 100%;
  position: relative;
}

ion-toolbar.sidem {
  background-color: #2464a3;
  padding: 25px 20px;
  height: min-content;
}

.sidem > ion-title {
  background-color: #2464a3;
}

ion-menu::part(container) {
  border-radius: 0px 15px 15px 0px;
}

.menuList {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

.menuList li {
  margin: 10px 0px;
  padding: 5px 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.menuIcon {
  width: 24px;
  height: 24px;
  margin-right: 9px;
  display: inline-block;
}

ion-back-button {
  display: block;
}
/* .slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
} */

</style>
<style>
  body, div, li, h1,h2, h3,h4,h5,h6,p, i, em, span,label, button{
    font-family: Arial, Helvetica, sans-serif !important;
  }

  /* Define a keyframes animation */
@keyframes slide-up-enter {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-up-leave {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

/* Apply the animation to the router outlet */
.slide-up-enter-active {
  animation: slide-up-enter 2s ease;
}

.slide-up-leave-active {
  animation: slide-up-leave 1s ease;
}


</style>
