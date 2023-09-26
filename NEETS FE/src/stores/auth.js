import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import { useUserStore } from "@/stores/user";
import { post } from "@/api/client";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    loadState:true,
    userId: 0,
    password: "",
    userInfo: useLocalStorage("userInfo", {}),
    local:useLocalStorage('local', []),       
    enrolees:useLocalStorage('enrolees', []),       
    services:useLocalStorage('services', []),       
    live:useLocalStorage('live', []),    
    userToken: useLocalStorage("userToken", null),
  }),
  getters: {},
  persist: true,
  actions: {
   async verifyOTP(user){
      let data = {}    
      data = { activation_code: user.nicare_code, password:user.password}
      const response = await post('auth/login',data)                     
      
      if(response?.user){            
        this.$state.userToken = response.accessToken    
        this.$state.enrolees = response.enrolees   
        this.$state.services = response?.services   
        this.$state.userInfo  = response?.user
        return response;
      }
      return false
    },
    setStoreToken(token) {
      this.userToken = token;
    },
    async login(email, password) {          
        const AuthenticatedUser = await post("auth/login", {
          activation_code: email,
          password: password,
        },'login-'+email);             
        if (!AuthenticatedUser?.userdata) {          
          return false;
        }                
        this.$state.password = AuthenticatedUser.userdata.password;
        this.$state.userId = AuthenticatedUser.userdata.id;        
        return true;       
    },
    async signin(email, password) {     
      
        const AuthenticatedUser = await post(
          {          
            email: email,
            password: password,         
          });
       // console.log(AuthenticatedUser);    
    },
    async logout() {
      //set usertoken in pinia state to null
      this.userToken = null;
      const userStore = useUserStore();
      localStorage.removeItem('userInfo');                 
      localStorage.removeItem("userToken");    
      this.$state.userToken = null;      
      localStorage.clear();
      return (window.location.href = "/auth");    
    },
    bookmark(data,storage) {
      this.$state[storage].push(data);      
    },
    checkBookmarked(data, storage) {
        const bookmarked = this.$state[storage];
        return bookmarked?.some((item) => item.id === data?.id);
    },
    removeBookmark(data, storage) {
        const bookmarked = this.$state[storage];
        const index = bookmarked.findIndex((item) => item.id === data?.id);
        if (index !== -1) {
            bookmarked.splice(index, 1);
        }
        this.$state[storage] = bookmarked
    },
    confirmBookmarked(nicare_id, storage) {
        const bookmarked = this.$state[storage];
        if (!bookmarked) {
          return false; // Return false if bookmarked is undefined or null
        }          
        let res = bookmarked.filter((item) => item.nicare_id === nicare_id);
        if(res?.length>0){
          return res[0]
        }
        return false
      },
  },
});
