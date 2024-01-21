<template>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-4">
    <div class="text-center mb-5">
      <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
      <span class="text-600 font-medium line-height-3">You have an account?</span>
      <nuxt-link to="/connection" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Sign in now!</nuxt-link>

    </div>

    <div>
     
      <div class="d-flex gap-2">
        <div class="col-6">
            <label for="email1" class="d-block text-900 font-medium mb-2"
            >First Name</label
          >
          <InputText
            
            v-model="userInputs.firstName"
            type="text"
            class="w-full mb-3"
          />
        </div>
        <div class="col-6">
            <label for="email1" class="block text-900 font-medium mb-2 w-100"
            >Last Name</label
          >
          <InputText
            
            v-model="userInputs.lastName"
            type="text"
            class="w-full mb-3"
          />
        </div>

      </div>
      <label for="email1" class="block text-900 font-medium mb-2">User Name</label>
      <InputText
        
        v-model="userInputs.username"
        type="text"
        class="w-full mb-3"
      />
      <label for="email1" class="block text-900 font-medium mb-2">Email</label>
      <InputText
        
        v-model="userInputs.email"
        type="text"
        class="w-full mb-3"
      />

      <label for="password1" class="block text-900 font-medium mb-2"
        >Password</label
      >
      <Password
        v-model="userInputs.password"
        :pt="{
          input: { class: 'w-100' },
        }"
        id="password1"
        class="w-100"
        toggleMask
      />

      <Button
        label="Sign Up"
        @click="handelSubmit"
        icon="pi pi-user"
        class="w-full mt-3"
      ></Button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
layout: 'authentication'
});
const autheStore = useAuthStore()
const clientStore = useClientStorets()
const userInputs = reactive({
firstName: '',
 lastName: '',
 username: '',
 email: '',
 password: '',
email: '',
password : ''
})
const handelSubmit = () =>{
    for (const key in userInputs) {
        if (!userInputs[key]) {
            return
        }
    }
    autheStore.signUp(userInputs)
    clientStore.saveClient({name: userInputs.name, email: userInputs.email})
}
</script>

<style lang="scss" scoped>
input {
  width: 100%;
}
</style>
