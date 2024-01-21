<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>
            Factures List 
        </h1>

    </div>
    <div class="card">

        <DataTable v-model:expandedRows="expandedRows" :value="factureStore.getFactureList" dataKey="id"
        tableStyle="min-width: 60rem">
        <template #empty>
            No Facture Found
        </template>
    <Column expander style="width: 5rem" />
    <Column field="id" header="ID"></Column>
    <Column field="clientId" header="Client ID"></Column>

    <Column field="client.name" header="Client">
    </Column>
    <Column field="client.email" header="Email">
    </Column>
    <Column field="dateFacture" header="Date">
    </Column>
    <Column field="price" header="Price">
        <template #body="slotProps">
            {{ slotProps.data.price }}
        </template>
    </Column>
    <Column field="price" header="Action">
        <template #body="slotProps">

            <Button icon="pi pi-trash
            " @click="confirm1(slotProps.data.id)" severity="danger" rounded ></Button>
                </template>
    </Column>

</DataTable>
<Dialog v-model:visible="detailsVisible" modal :header="selectedItem.name" :style="{ width: '500px' }" >
       
    <div class="p-4 border-1 surface-border surface-card border-round">
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <div class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ selectedItem.quantite }}</span>
            </div>
        </div>
        <div class="flex flex-column align-items-center gap-3 py-5">
            <img class="w-9 shadow-2 border-round" :src="selectedItem.produit.imageUrl" :alt="selectedItem.name" />
            <div class="text-2xl font-bold">{{ selectedItem.produit.name }}</div>
            <div class="text-1xl font-bold text-900">{{ selectedItem.produit.description }}</div>
        </div>
        <div class="flex align-items-center justify-content-center">
        
            <span class="text-2xl font-semibold">${{ selectedItem.price }}</span>
    
        </div>
    </div>

</Dialog>
        <Dialog 
        v-model:visible="addFactureVisible" 
        @after-hide="resetForm" modal 
        :header="uiMutateItems.title" :style="{ width: '800px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-column gap-3">
                <label class="d-block">
                   Client Name {{ numbOfProducts }}
                </label>
                <Dropdown v-model="userInputs.clientId" 
                :options="clientStore.getClientList" 
               
                filter optionLabel="name" 
                option-value="id"
                placeholder="Select a client" class="w-full" />

                <div v-if="userInputs.clientId">
                    <div class="d-flex justify-content-between align-items-end mb-3">
                        <h4>
                            Add Products
                        </h4>
                        <Button @click="addProductObject"  icon="pi pi-plus" severity="primary"  />
                    </div>
                    <div v-for="itemsCount in numbOfProducts" class="mb-4 pb-4 border-bottom">
                        <div class="d-flex justify-content-between  align-items-end mb-2">
                            <span>
                                Product N°{{ itemsCount }} Details 
                            </span>
                            <span>
                                <Button @click="deleteProductObject(itemsCount-1)"  
                                icon="pi pi-times" severity="danger" text rounded  />

                            </span>
                         </div>
                         <Dropdown v-model="userInputs.ligneFacture[itemsCount-1]" 
                         @change="(e)=> onProductSelect(itemsCount-1, e)" 
                         :options="ligneFactStore.getLigneFactureList" filter class="w-100"
                          optionLabel="produit.designation"  placeholder="Select a product" />
                         <div class="row" v-if="userInputs.ligneFacture[itemsCount-1].id">
                            <div class="col-6">
                                <label class="d-block">
                                    Product Quantity
                                 </label>
                                <InputNumber v-model="userInputs.ligneFacture[itemsCount-1].quantite" @update:modelValue="calcProductPrice(itemsCount-1)" 
                                inputId="integeronly" class="w-100"/>
                            </div>
                            <div class="col-6">
                                <label class="d-block">
                                    Product Price
                                 </label>
                                <InputNumber v-model="userInputs.ligneFacture[itemsCount-1].prix" inputId="integeronly" class="w-100" disabled=""/>
                            </div>
                         </div>
                      </div>
                </div>

            </div>
            <template #footer>
                <div class="d-flex justify-content-between align-items-end">
                    <div>
                        <label class="h6 d-block" >Total Price:</label>
                        <InputNumber v-model="userInputs.price" inputId="integeronly"  disabled=""/>
                    </div>
                    <div>
                        <Button @click="addFactureVisible = false" label="Cancel" icon="pi pi-times" severity="secondary"  />
                        <Button @click="handelFacture" :label="uiMutateItems.button" icon="pi pi-check" class="ms-3" />
                    </div>
                </div>



            </template>
        </Dialog>

        <ConfirmDialog></ConfirmDialog>
        <Toast />
    </div>

</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";


const clientStore = useClientStorets()
const factureStore = useFacturesStorets()
const productStore = useProductStore()
const  ligneFactStore  = useLigneFacturesStorets()

const numbOfProducts = ref(1)
const confirm = useConfirm();
const toast = useToast();
const selectedItem = ref({})
const addFactureVisible = ref(false)
const userInputs = reactive({
    ligneFacture: [{
        id : undefined,
        produitId : '',
        quantite: undefined,
        price: undefined,
        produit: {}
    }],
    ClientId1: 1,
    clientId: undefined,
    price: undefined
})
const expandedRows = ref([]);
const detailsVisible = ref(false)

const uiMutateItems = reactive({
    title: 'Add New Facture',
    button: 'Save new Facture'
})
const collectData = (item) =>{
    detailsVisible.value = true
    selectedItem.value = item
}
const collectEditData = (item) =>{
    uiMutateItems.button = 'Save Updates'
    uiMutateItems.title = 'Edit Factures'
    selectedItem.value = item
    numbOfProducts.value =  selectedItem.value.ligneFacture.length 
    for (const key in selectedItem.value) {
         userInputs[key] = selectedItem.value[key]
    }
}
const onProductSelect = (index, e) =>{
    // userInputs.ligneFacture[index].produit =  productStore.getProductsList.find(item => item.id === userInputs.clientId);

    // userInputs.ligneFacture[index].price = userInputs.ligneFacture[index].produit.price
    // userInputs.ligneFacture[index].quantite = 1
    // let totalPrice = 0
    // for (let index = 0; index < userInputs.ligneFacture.length; index++) {
    //     const element = userInputs.ligneFacture[index];
    //     totalPrice = totalPrice + element.price
    // }
    // userInputs.price = totalPrice
}
const calcProductPrice = (index) =>{
    // if (!userInputs.ligneFacture[index].quantite) {
    //     return
    // }
    // userInputs.ligneFacture[index].price =  userInputs.ligneFacture[index].produit.price * userInputs.ligneFacture[index].quantite

    // let totalPrice = 0
    // for (let index = 0; index < userInputs.ligneFacture.length; index++) {
    //     const element = userInputs.ligneFacture[index];
    //     totalPrice = totalPrice + element.price
    // }
    // userInputs.price = totalPrice
}

const addProductObject = () =>{
    numbOfProducts.value++ 
    userInputs.ligneFacture.push({
        id : undefined,
        produitId : '',
        quantite: undefined,
        price: undefined,
        produit: {}
    })
}
const deleteProductObject = (index) =>{
    numbOfProducts.value -= 1
    userInputs.ligneFacture.splice(index, 1)
}
const resetForm = () =>{
    for (const key in userInputs) {
         userInputs[key] = undefined
         
    }
    userInputs.ligneFacture = [{
        id : undefined,
        produitId : '',
        quantite: undefined,
        price: undefined,
        produit: {}
    }]
    numbOfProducts.value = 1
    uiMutateItems.button = 'Add New Facture'
    uiMutateItems.title = 'Save Facture'
}
const handelFacture = async () =>{
    if ( userInputs.id) {
       try {
         await  factureStore.editFacture(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have edited the facture', life: 3000 });
         addFactureVisible.value = false
       } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
       }
    }else{
     try {
         await  factureStore.saveFacture(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have saved the facture', life: 3000 });
         addFactureVisible.value = false

     } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
     }
    }
}

const confirm1 = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            factureStore.deleteFacture(id)
            addFactureVisible.value = false

        },
    
    });
};
onBeforeMount(async()=>{
    await factureStore.fetchFacture()
    await clientStore.fetchClient()
    await productStore.fetchProducts()
    await ligneFactStore.fetchLigneFactureByClient(1)

})
</script>

<style lang="scss" scoped>

</style>