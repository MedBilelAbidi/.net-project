<template>
    <div>
        <header class="p-3  nav-bar-app">
            <div class="container">
              <div class="d-flex flex-wrap align-items-center justify-content-between">

        
                <ul class="nav  col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><nuxt-link to="/" class="nav-link px-2 text-white">Home</nuxt-link></li>
                  <li><nuxt-link  to="/shope" class="nav-link px-2 text-white">Shope</nuxt-link></li>
                  <li><nuxt-link v-if="autheStore.getIsUserConnected && !autheStore.getIsAdmin" to="/myOrders" class="nav-link px-2 text-white">My Orders</nuxt-link></li>

                  <li><nuxt-link  v-if=" autheStore.getIsUserConnected && autheStore.getIsAdmin" to="/clients" class="nav-link px-2 text-white">Clients</nuxt-link></li>
                  <li><nuxt-link  v-if="autheStore.getIsUserConnected && autheStore.getIsAdmin"  to="/factures" class="nav-link px-2 text-white">Factures</nuxt-link></li>


                </ul>
        
                
        
                <div class="text-end" v-if="!autheStore.getIsUserConnected" >
                    <Button label="Login" class="me-1" outlined @click="navigateTo('/connection')"/>
                    <!-- <Button label="Sign-up" @click="navigateTo('/register')"/> -->
                </div>
                <div v-else>
                    <Avatar shape="circle" :label="autheStore.getJWT.sub.slice(0, 1).toUpperCase()"  class="mr-2" size="large" style="background-color:#2196F3; color: #ffffff"/>

                </div>
              </div>
            </div>
          </header>
        <main class="container pb-5 mt-80">

            <NuxtPage></NuxtPage>

        </main>

    </div>
</template>

<script setup>
const autheStore = useAuthStore()

onBeforeMount(()=>{
      autheStore.Decrept()

})
</script>

<style lang="scss" scoped>

</style>