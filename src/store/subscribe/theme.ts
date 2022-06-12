import { useAppStore } from "../modules";
import { watch } from "vue";

export function subscribeTheme(){
    const appStore = useAppStore()
    const watchTheme = watch(()=>appStore.darkMode,(newValue)=>{
        if(newValue){
            document.body.classList.add('dark')
        }else{
            document.body.classList.remove('dark')
        }
    },{immediate:true})
}