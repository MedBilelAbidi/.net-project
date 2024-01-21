


export interface LigneFacture {
    id : number,
    name : string,
    ProduitId: number
    quantite : number
    FactureId: number
    clientId: number
}

export type LigneFacturesList = LigneFacture[];

interface LigneFactureState {
  LigneFactureList: LigneFacturesList;
  LigneFacturePending: {
        LigneFacturesList: boolean
    }
}

const state = (): LigneFactureState => ({
  LigneFactureList: [],
  LigneFacturePending:{
      LigneFacturesList: false
    }
});

const getters = {
  getLigneFactureList: (state: LigneFactureState) => {
   return state.LigneFactureList
  }
};

export const useLigneFacturesStorets = defineStore("ligneFacturesStorets", {
  state,
  getters,
  actions: {

   
   async  fetchLigneFacture() {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<LigneFacturesList>(
        "/",
        {
          method: "GET",
          baseURL: runTimeConfig.public.ligneFactureBaseUrl,
        }
      );
        console.log(response);
        
      this.LigneFactureList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  fetchLigneFactureByClient(id: number) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<LigneFacturesList>(
        `http://localhost:5191/byClient/${id}`,
        {
          method: "GET",
        }
      );
        console.log(response);
        
      this.LigneFactureList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  saveLigneFacture(LigneFacture: LigneFacture) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        "/",
        {
          method: "POST",
          body : toRaw(LigneFacture),
          baseURL: runTimeConfig.public.ligneFactureBaseUrl,
        }
      );
        this.fetchLigneFacture()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  editLigneFacture(LigneFacture: LigneFacture) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${LigneFacture.id}`,
        {
          method: "PUT",
          body : toRaw(LigneFacture),
          baseURL: runTimeConfig.public.ligneFactureBaseUrl,
        }
      );
        this.fetchLigneFacture()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  deleteLigneFacture(id: string) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${id}`,
        {
          method: "DELETE",
          baseURL: runTimeConfig.public.ligneFactureBaseUrl,
        }
      );
        this.fetchLigneFactureByClient(1)

    } catch (error) {
    throw new Error(String(error))
    }
   }
  },
});
