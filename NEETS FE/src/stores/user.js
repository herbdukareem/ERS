import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia'


export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {},        
        chats: [],              
        isLoading: false,        
    }),
    getters: {
        getUser: (state) => {
            return state.user
        }
    },    
    persist: true,
    actions: {
        setUser(userInfo) {
            this.user = userInfo
        },
        removeUser() {
            this.user = ""
        },
        bookmark(data,storage) {
            if (!this.checkBookmarked(data, storage)) {
                this.$state[storage].push(data);
            } else {
                this.removeBookmark(data, storage) 
            }
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
        confirmBookmarked(beneficiary_code, storage) {
            const bookmarked = this.$state[storage];
            if (!bookmarked) {
              return false; // Return false if bookmarked is undefined or null
            }          
            return bookmarked.some((item) => item.beneficiary_code === beneficiary_code);
          },
    }
})





