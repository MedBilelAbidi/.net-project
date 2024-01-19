<template>

        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
            <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
            </div>
        
            <div>
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <InputText id="email1" v-model="userInputs.email" type="text" class="w-full mb-3" />
        
                <label for="password1"  class="block text-900 font-medium mb-2">Password</label>
                <Password   v-model="userInputs.password" 
                :pt="{
                    input: { class: 'w-100' }
                }"
                id="password1" class="w-100" toggleMask />
        

        
                <Button label="Sign In" @click="handelSubmit" icon="pi pi-user" class="w-full mt-3" ></Button>
            </div>
        </div>
</template>

<script setup>
definePageMeta({
    layout: 'authentication'
});
const autheStore = useAuthStore()
const userInputs = reactive({
    email: '',
    password : ''
})
const handelSubmit = () =>{
    if (userInputs.email && userInputs.password) {
        autheStore.signIn(userInputs)
    }
}
</script>

<style lang="scss" scoped>
input{
    width: 100%;
}
</style>