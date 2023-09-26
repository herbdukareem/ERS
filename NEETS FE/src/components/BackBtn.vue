<template>
    <!--   <div tabindex="0" style="display: inline-block; border-radius: 50%;background:white;padding:13px 17px" @click="emitClick" >
          <span v-html="$globals.icons.back"></span>
          <span v-if="title" class="fs2 ms-2 pt-2">Back</span>
      </div> -->
    <ion-buttons>
        <ion-back-button>
        </ion-back-button>
    </ion-buttons>
</template>
  
<script lang="ts">
import { useRoute } from 'vue-router';
import { IonBackButton, IonButtons } from '@ionic/vue';
export default {
    props: {
        title: {
            default: false
        }, 
        place: {
            type: Object,
            default: {
                id: 0,
                name: "Turkey",
                count: 20,
            },
        },
    },
    methods: {
        emitClick() {
            const route = useRoute();
            route.go(-1);
            //this.$emit('onclick');
        },
    },
    components: {
        IonBackButton, IonButtons
    },

};
</script>
  
<style scoped></style>
  