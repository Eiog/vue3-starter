import { defineStore } from "pinia";
export const useAppStore = defineStore({
    id: 'appStore',
    state: () => ({
        darkMode:false,
        language:'cn'
    }),
    actions: {

    },
    getters: {

    }
})