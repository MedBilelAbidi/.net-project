
<template>
    <div class="card">
        <DataView :value="productStore.getProductsList" :layout="layout" paginator :rows="5">
            <template #header>
                <div class="flex justify-content-between">
                    <Button v-if="autheStore.getIsAdmin" @click="addProductVisible = true" label="Add new Product" icon="pi pi-plus"  />

                    <div>
                        <Button icon="pi pi-shopping-cart " class="p-overlay-badge" v-badge.danger="'5+'" @click="visibleBasket = true" />

                    </div>
                    <div class="d-flex gap-3 align-items-end">
                        <div v-if="autheStore.getIsAdmin">
                            <Button @click="addCatgorieVisible = true" label="Add new Categorie" icon="pi pi-plus" class="me-2" />
                            <Button @click="categorieListVisible = true" label="Categorie List" icon="pi pi-plus"  />
                        </div>

                        <DataViewLayoutOptions v-model="layout" />


                    </div>
                </div>
            </template>

            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="item.photo" :alt="item.name" />
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ item.name }}</div>
                                    <div class="text-1xl font-bold text-900">{{ item.description }}</div>
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ item.quantite }}</span>
                                        </span>
                                        <Tag :value="getStockState(item.quantite)" :severity="getSeverity(getStockState(item.quantite))"></Tag>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center h-100  justify-content-between sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">${{ item.prix }}</span>
                                    <div v-if="autheStore.getIsAdmin" class="d-flex gap-2 flex-grow-1">
                                        <Button  @click="collectEditData(item),addProductVisible = true" icon="pi pi-pencil" rounded ></Button>

                                        <Button icon="pi pi-search" @click="collectData(item),detailsVisible = true" rounded ></Button>
                                        <Button icon="pi pi-trash
                                        " @click="confirm1()" severity="danger" rounded ></Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                        <div class="p-4 border-1 surface-border surface-card border-round">
                            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                <span class="flex align-items-center gap-2">
                                    <i class="pi pi-tag"></i>
                                    <span class="font-semibold">{{ item.quantite }}</span>
                                </span>
                                <Tag :value="getStockState(item.quantite)" :severity="getSeverity(getStockState(item.quantite))"></Tag>
                                <Button v-if="autheStore.getIsAdmin" icon="pi pi-trash" @click="confirm1()" severity="danger" rounded ></Button>
                            </div>
                            <div class="flex flex-column align-items-center gap-3 py-5">
                                <img class="w-9 shadow-2 border-round" :src="item.photo" :alt="item.name" />
                                <div class="text-2xl font-bold">{{ item.name }}</div>
                                <div class="text-1xl font-bold text-900">{{ item.description }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-between">
                                <Button v-if="autheStore.getIsAdmin" icon="pi pi-pencil" @click="addProductVisible = true,collectEditData(item)" rounded ></Button>
                                <Button icon="pi pi-shopping-cart" v-else @click="shopQtityVisiable = true , collectData(item)" rounded ></Button>
                                <span class="text-2xl font-semibold">${{ item.prix }}</span>

                                <Button icon="pi pi-search" @click="collectData(item),detailsVisible = true" rounded ></Button>


                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>


        <Sidebar v-model:visible="visibleBasket" header="Your Cart" class="w-full md:w-20rem lg:w-30rem">

            <ScrollPanel
                style="width: 100%; height: calc(100vh - 63px - 63px)"
                :pt="{
                    wrapper: {
                        style: { 'border-right': '10px solid var(--surface-ground)' }
                    },
                    bary: 'hover:bg-primary-400 bg-primary-300 opacity-100'
                }">
                <div>
                    <div v-for="(item, index) in basketItems" :key="index" class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="item.photo" :alt="item.name" />
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ item.name }}</div>
                                    <div class="text-1xl font-bold text-900">{{ item.description }}</div>
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ item.quantite }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center h-100  justify-content-between sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">${{ item.prix }}</span>
                                    <div v-if="autheStore.getIsAdmin" class="d-flex gap-2 flex-grow-1">
                                   
                                        <Button icon="pi pi-trash
                                        " @click="confirm1()" severity="danger" rounded ></Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollPanel>
            <div>
                <Button  @click="addProductVisible = true" label="Valid Cart" class="w-100" icon="pi pi-plus" :disabled="!basketItems.length" />

            </div>
        </Sidebar>

        <Dialog v-model:visible="detailsVisible" modal :header="selectedItem.value.name" :style="{ width: '500px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       
                <div class="p-4 border-1 surface-border surface-card border-round">
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div class="flex align-items-center gap-2">
                            <i class="pi pi-tag"></i>
                            <span class="font-semibold">{{ selectedItem.value.quantite }}</span>
                        </div>
                        <Tag :value="getStockState(selectedItem.value.quantite)" 
                        :severity="getSeverity(getStockState(selectedItem.value.quantite))"></Tag>
                    </div>
                    <div class="flex flex-column align-items-center gap-3 py-5">
                        <img class="w-9 shadow-2 border-round" :src="selectedItem.value.photo" :alt="selectedItem.value.name" />
                        <div class="text-2xl font-bold">{{ selectedItem.value.name }}</div>
                        <div class="text-1xl font-bold text-900">{{ selectedItem.value.description }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-between">
                        <Button icon="pi pi-trash " v-if="autheStore.getIsAdmin"
                         @click="confirm1()" severity="danger" rounded ></Button>
                         <Button icon="pi pi-shopping-cart" v-else @click="shopQtityVisiable = true" rounded ></Button>

                        <span class="text-2xl font-semibold">${{ selectedItem.value.prix }}</span>
                        <Button icon="pi pi-pencil" rounded ></Button>
                    </div>
                </div>
       
        </Dialog>
        <Dialog v-model:visible="addProductVisible" 
        @after-hide="resetForm" modal 
        :header="uiMutateItems.title" :style="{ width: '600px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-column gap-2">
                <label class="d-block">
                    Product name
                </label>
                <InputText type="text" v-model="userInputs.désignation" />
                <div class="d-flex gap-2">
                    <div class="col-6 p-0">
                        <label class="d-block">
                            Price
                        </label>
                        <InputNumber class="w-100" v-model="userInputs.prix" inputId="currency-us" mode="currency" currency="USD" locale="en-US" />
                        
                    </div>
                    <div class="col-6 p-0">
                        <label class="d-block">
                            Categorie Name 
                         </label>
                         <Dropdown v-model="userInputs.categorieId" 
                         :options="productStore.getCategoriesList" 
                        
                         filter optionLabel="désignation" 
                         option-value="id"
                         placeholder="Select a Categorie" class="w-full" />
                        </div>    
                </div>

                <label class="d-block">
                    Quantity
                </label>
                <InputNumber v-model="userInputs.quantite" 
                inputId="horizontal-buttons" showButtons 
                buttonLayout="horizontal" :step="1" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
                <div v-if="userInputs.photo" class="flex flex-column align-items-center gap-3 py-5">
                    <img class="w-9 h-9 shadow-2 border-round" :src="userInputs.photo"  />
                </div>
                <label class="d-block">
                    Product Image URL
                </label>
                <InputText type="text" v-model="userInputs.photo " />
            </div>
            <template #footer>
                <Button @click="addProductVisible = false" label="Cancel" icon="pi pi-times" severity="secondary"  />
                <Button @click="handelProduct" :label="uiMutateItems.button" icon="pi pi-check" class="ms-3" />

            </template>
        </Dialog>
        <Dialog 
        v-model:visible="addCatgorieVisible" 
        @after-hide="resetForm" modal 
        :header="uiCategproeMutateItems.title" :style="{ width: '400px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-column gap-2">
                <label class="d-block">
                   Categorie Name
                </label>
                <InputText type="text" v-model="CategorieInput.désignation" />

            </div>
            <template #footer>
                <Button @click="addCatgorieVisible = false" label="Cancel" icon="pi pi-times" severity="secondary"  />
                <Button @click="handelCategorie" :label="uiCategproeMutateItems.button" icon="pi pi-check" class="ms-3" />

            </template>
        </Dialog>
        <Dialog 
        v-model:visible="shopQtityVisiable" 
        @after-hide="resetForm" modal 
        header="Order Quntity " :style="{ width: '400px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <label class="d-block">
            Quantity
        </label>
        <InputNumber v-model="baseketInput.quantité" class="w-100"
        inputId="horizontal-buttons" showButtons 
        buttonLayout="horizontal" :step="1" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
            <template #incrementbuttonicon>
                <span class="pi pi-plus" />
            </template>
            <template #decrementbuttonicon>
                <span class="pi pi-minus" />
            </template>


        </InputNumber>
        <template #footer>
            <Button @click="shopQtityVisiable = false" label="Cancel" icon="pi pi-times" severity="secondary"  />
            <Button @click="AddToBasket(selectedItem.value)" label="Valid Quntity" icon="pi pi-check" class="ms-3" />

        </template>
        </Dialog>
        <Dialog v-model:visible="categorieListVisible" 
        @after-hide="resetForm" modal 
        header="Categorie List" :style="{ width: '800px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <DataTable  ref="dt" :sortOrder="1" sortField="id" :value="productStore.getCategoriesList" paginator :rows="5" 
        @row-click="collectData($event)"  tableStyle="min-width: 700px">
            <Column field="id" header="Id" sortable  style="width: 20%"></Column>
            <Column field="désignation" header="Name" sortable  style="width: 40%"></Column>
            <Column header="Actions"   style="width: 40%">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button icon="pi pi-trash
                        " @click="confirmCategorie(slotProps.data.id)" severity="danger" rounded ></Button>
                        <Button icon="pi pi-pencil" @click="addCatgorieVisible = true,collectCategore(slotProps.data)" rounded ></Button>
                    </div>
                </template>

            </Column>
        </DataTable>
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
        <Toast />
    </div>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const autheStore = useAuthStore()
const confirm = useConfirm();
const toast = useToast();
const productStore = useProductStore()
const uiMutateItems = reactive({
    title: 'Add New Product',
    button: 'Save new Product'
})
const uiCategproeMutateItems = reactive({
    title: 'Add New Categorie',
    button: 'Save new Categorie'
})
const visibleBasket = ref(false)
const detailsVisible = ref(false)
const addProductVisible = ref(false)
const addCatgorieVisible = ref(false)
const categorieListVisible = ref(false)
const shopQtityVisiable = ref(false)

const basketItems = ref([])
const layout = ref('grid');
const selectedItem = reactive({
    value : {}
})
const userInputs = reactive({})
const CategorieInput = reactive({})
const baseketInput = reactive({
    produit : {},
    produitId: undefined,
    quantité : undefined,
    clinetId: undefined
})

const AddToBasket = (items) => {
    let item = toRaw(items)


    item.quantite = baseketInput.quantité
    
    basketItems.value.push(item)

    console.log(basketItems.value);
}

const collectData = (item) =>{
    selectedItem.value = item
}
const collectEditData = (item) =>{
    uiMutateItems.button = 'Save Updates'
    uiMutateItems.title = 'Edit Products'
    selectedItem.value = item
    for (const key in selectedItem.value) {
         userInputs[key] = selectedItem.value[key]
    }
}
const collectCategore = (item)=>{
    uiCategproeMutateItems.button = 'Save Updates'
    uiCategproeMutateItems.title = 'Edit Categorie'
    CategorieInput.id = item.id
    CategorieInput.désignation = item.désignation
}
const handelCategorie = async () =>{
    if ( CategorieInput.id) {
       try {
         await  productStore.editProducts(CategorieInput)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have edited the product', life: 3000 });
         addCatgorieVisible.value = false
       } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
       }
    }else{
     try {
         await  productStore.addCategories(CategorieInput.désignation)
         toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have saved the product', life: 3000 });
         addCatgorieVisible.value = false

     } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
     }
    }
}
const handelProduct = async () =>{
    if ( userInputs.id) {
       try {
         await  productStore.editProducts(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have edited the product', life: 3000 });
         addProductVisible.value = false
       } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
       }
    }else{
     try {
         await  productStore.saveProducts(userInputs)
         toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have saved the product', life: 3000 });
         addProductVisible.value = false

     } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
     }
    }
}
const resetForm = () =>{
    for (const key in userInputs) {
         userInputs[key] = undefined
    }
    for (const key in CategorieInput) {
        CategorieInput[key] = undefined
    }
    uiCategproeMutateItems.button ='Add New Categorie',
    uiCategproeMutateItems.title =  'Save new Categorie'
    uiMutateItems.button = 'Add New Product'
    uiMutateItems.title = 'Save new Product'
}
const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            productStore.deleteProducts(selectedItem.value.id)
            addProductVisible.value = false

        },
    
    });
};
const confirmCategorie = async (id) => {
    confirm.require({
        message: 'Are you sure you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: async () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            await productStore.deleteCategorie(id)
            addCatgorieVisible.value = false
        },
    
    });
};
const getSeverity = (product) => {
    switch (product) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}
const getStockState = (quantite) => {
    if (quantite > 50) {
        return 'INSTOCK';
    } else if (quantite <= 50 && quantite > 0) {
        return 'LOWSTOCK';
    } else {
        return 'OUTOFSTOCK';
    }
}

onBeforeMount(async()=>{
    await productStore.fetchProducts()
    await productStore.fetchCategories()
})

</script>
