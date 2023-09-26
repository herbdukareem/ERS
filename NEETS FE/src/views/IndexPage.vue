<template>
    <ion-page>
        <ion-loading trigger="open-loading" :isOpen="$globals.loading2" message="Loading..." duration="9000000"
            spinner="circles"></ion-loading>
        <ion-tabs>
            <ion-router-outlet :key="$route.fullPath"></ion-router-outlet>         
        </ion-tabs>
    </ion-page>
</template>

<script  lang="ts">
import { IonTabBar, IonLoading, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default{
    components: { IonTabBar, IonLoading, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet },
    watch:{
        '$globals':()=>{
            alert(2)
        }
    }    
};
</script>
<style scoped>
.tab-selected span {
    fill: #F1C111 !important;
}

.tab-selected ion-label {
    color: #F1C111 !important;
}

ion-tab-button span,
ion-tab-button>ion-label {
    fill: #333333;
}

ion-tab-bar {
    padding: 15px 24px;
}
.loading-wrapper.sc-ion-loading-md {
    -webkit-box-shadow: 0 16px 20px rgb(143 136 136 / 40%) !important;
    box-shadow: 0 16px 20px rgba(0, 0, 0, 0.4) !important;
}
</style>