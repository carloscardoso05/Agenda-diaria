import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './registerServiceWorker'

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

/*
pinia.use((context) => {
    
    const storeId = context.store.$id    

    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }

    const fromStorage = serializer.deserialize(`${window.localStorage.getItem(storeId)}`)

    if(fromStorage){
        context.store.$patch(fromStorage)
    }

    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serializer.serialize(state))
    })
})
*/


createApp(App).use(pinia).mount('#app')
