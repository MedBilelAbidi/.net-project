


export interface Product {
    id : number,
    désignation : string,
    price : number,
    quantity : number,
    imageUrl : string,
    categorieId: number
}
export interface Categorie {
  id : number,
  désignation : string,
}



export type ProductsList = Product[];
export type CategoriesList = Categorie[];

interface ProdcutState {
    productList: ProductsList
    categoriesList : CategoriesList
    productsPending: {
        productsList: boolean
    }
}

const state = (): ProdcutState => ({
    productList: [],
    categoriesList: [],
    productsPending:{
        productsList: false
    }
});

const getters = {
  getProductsList: (state: ProdcutState) => {
   return state.productList
  },
  getCategoriesList: (state: ProdcutState) => {
    return state.categoriesList
   }
};

export const useProductStore = defineStore("productStore", {
  state,
  getters,
  actions: {

   
   async  fetchProducts() {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch< ProductsList>(
        "/",
        {
          method: "GET",
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        
      this.productList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  fetchProductSorted(sortOrder : string = 'asc') {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch< ProductsList>(
        `/sorted-by-price?order=${sortOrder}`,
        {
          method: "GET",
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        
      this.productList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },

   async  saveProducts(product: Product) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<ProductsList>(
        "/",
        {
          method: "POST",
          body : toRaw(product),
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        this.fetchProducts()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  editProducts(product: Product) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${product.id}`,
        {
          method: "PUT",
          body : toRaw(product),
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        this.fetchProducts()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  deleteProducts(id: string) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${id}`,
        {
          method: "DELETE",
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        this.fetchProducts()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  fetchCategories() {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch< CategoriesList>(
        "/",
        {
          method: "GET",
          baseURL: runTimeConfig.public.categoriesBaseUrl,
        }
      );
        
      this.categoriesList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  addCategories(categorieName : string) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch< CategoriesList>(
        "/",
        {
          method: "POST",
          body:{
            désignation : categorieName
          },
          baseURL: runTimeConfig.public.categoriesBaseUrl,
        }
      );
        
      this.categoriesList = response

      this.fetchCategories()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  editCategories(categorie: Categorie) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${categorie.id}`,
        {
          method: "PUT",
          body : toRaw(categorie),
          baseURL: runTimeConfig.public.categoriesBaseUrl,
        }
      );
        this.fetchCategories()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  deleteCategorie(id: string) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${id}`,
        {
          method: "DELETE",
          baseURL: runTimeConfig.public.categoriesBaseUrl,
        }
      );
        this.fetchCategories()

    } catch (error) {
    throw new Error(String(error))
    }
   },
  },
});
