import { useJwt } from '@vueuse/integrations/useJwt'

export interface RegisterClient {
   firstName: string,
   lastName: string,
   username: string,
   email: string,
   password: string
}
export interface UserProfil {
  message: string,
  isAuthenticated: boolean,
  username: string,
  email: string,
  roles: string[],
  token: string,
  expiresOn : string
}
export interface JWT {
 sub: string;
 jti: string;
 email: string;
 uid: string;
 roles: string;
 exp: string;
 iss: string;
 aud: string;
}
export type ClientsList = Client[];

interface ConnectionState {
  clientList: ClientsList;
  userProfil : UserProfil
  jwtProfil : JWT
  isError: boolean
  isAdmin: boolean
  connectPending: {
        clientsList: boolean
    }
}

const state = (): ConnectionState => ({
  clientList: [],
  isError: false,
  isAdmin: true,
  userProfil: {} as UserProfil,
  jwtProfil: {} as JWT,
  connectPending:{
      clientsList: false
    }
});

const getters = {
  getUserProfil: (state: ConnectionState) => {
   return state.userProfil
  },
  getIsAdmin : (state: ConnectionState) =>{
    return state.isAdmin
  },
  getJWT : (state: ConnectionState) =>{
    return state.jwtProfil
  },
  getIsUserConnected: (state: ConnectionState) =>{
    return ( Object.keys(state.jwtProfil).length != 0)
  },

};

export const useAuthStore = defineStore("authStore", {
  state,
  getters,
  actions: {

   
   async  signIn(parames: any) {
    const runTimeConfig = useRuntimeConfig();
    const cookie = useCookie("userToken" , { maxAge : 5184000 });

    try {
      const response = await $fetch<ClientsList>(
        "/token",
        {
          method: "POST",
          baseURL: runTimeConfig.public.authBaseUrl,
          body : toRaw(parames)
        }
      );
      cookie.value = response.token

        console.log(response);
        this.isError = false
        navigateTo('/')

    } catch (error) {
      this.isError = true
      throw new Error(String(error))
   
    }
   },
   async  signUp(parames: any) {
    const runTimeConfig = useRuntimeConfig();
    const cookie = useCookie("userToken" , { maxAge : 5184000 });
    try {
      const response = await $fetch<UserProfil>(
        "/register",
        {
          method: "POST",
          baseURL: runTimeConfig.public.authBaseUrl,
          body : toRaw(parames)
        }
      );
      cookie.value = response.token
      if (response.roles && response.roles.length) {
       this.isAdmin =  response.roles.includes('admin')
      }
       this.userProfil = response
        this.isError = false
        navigateTo('/')
    } catch (error) {
      this.isError = true
      throw new Error(String(error))
   
    }
   },
   Decrept () {
    const cookie = useCookie("userToken" , { maxAge : 5184000 });

    const { header, payload } = useJwt(cookie.value)

    console.log(payload.value);
    this.jwtProfil = payload.value

    // if (this.jwtProfil.roles && this.jwtProfil.roles.length) {
    //   this.isAdmin =  this.jwtProfil.roles.includes('admin')
    //  }
    
   }
  },
});
