import waterMarke  from "./waterMark"
const directives = {
    waterMarke
}
export default {
    install(Vue){
        Object.keys(directives).forEach(key=>{
            Vue.directive(key,directives[key])
        })
    }
}