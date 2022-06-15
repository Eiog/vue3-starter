import waterMarke  from "./waterMark"
import lazyLoad from "./lazyLoad"
const directives = {
    waterMarke,
    lazyLoad
}
export default {
    install(Vue){
        Object.keys(directives).forEach(key=>{
            Vue.directive(key,directives[key])
        })
    }
}