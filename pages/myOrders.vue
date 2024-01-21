
<template>
    <div class="card">
        <DataView :value="ligneFactStore.getLigneFactureList" :layout="layout" paginator :rows="6">
            <template #header>
                <div class="flex justify-content-between">

                    <div class="d-flex gap-3 align-items-end">




                    </div>
                    <DataViewLayoutOptions v-model="layout" />

                </div>
            </template>

            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="item.produit.photo" :alt="item.produit.designation" />
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ item.produit.designation }}</div>
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ item.quantite }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center h-100  justify-content-between sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">${{ item.produit.prix }}</span>
                                    <div class="d-flex gap-2 flex-grow-1">

                                        <Button icon="pi pi-search" @click="collectData(item),detailsVisible = true" rounded ></Button>
                                        <Button icon="pi pi-trash
                                        " @click="confirm1(item.id)" severity="danger" rounded ></Button>
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
                                <Button  icon="pi pi-trash" @click="confirm1(item.id)" severity="danger" rounded ></Button>
                            </div>
                            <div class="flex flex-column align-items-center gap-3 py-5">
                                <img class="w-9 shadow-2 border-round" :src="item.produit.photo" :alt="item.produit.designation" />
                                <div class="text-2xl font-bold">{{ item.produit.designation }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-between">
                                <span class="text-2xl font-semibold">${{ item.produit.prix }}</span>

                                <Button icon="pi pi-search" @click="collectData(item),detailsVisible = true" rounded ></Button>


                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>




        <Dialog v-model:visible="detailsVisible" modal :header="selectedItem.value.name" :style="{ width: '500px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       
                <div class="p-4 border-1 surface-border surface-card border-round">
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div class="flex align-items-center gap-2">
                            <i class="pi pi-tag"></i>
                            <span class="font-semibold">{{ selectedItem.value.quantite }}</span>
                        </div>
                      
                    </div>
                    <div class="flex flex-column align-items-center gap-3 py-5">
                        <img class="w-9 shadow-2 border-round" :src="selectedItem.value.photo" :alt="selectedItem.value.designation" />
                        <div class="text-2xl font-bold">{{ selectedItem.value.designation }}</div>
                        <div class="text-1xl font-bold text-900">{{ selectedItem.value.description }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-between">

                        <span class="text-2xl font-semibold">${{ selectedItem.value.prix }}</span>
                        <Button icon="pi pi-pencil" rounded ></Button>
                    </div>
                </div>
       
        </Dialog>

        <ConfirmDialog></ConfirmDialog>
        <Toast />
    </div>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const  ligneFactStore  = useLigneFacturesStorets()

const confirm = useConfirm();
const toast = useToast();
const productStore = useProductStore()

const detailsVisible = ref(false)
const addProductVisible = ref(false)

const shopQtityVisiable = ref(false)

const layout = ref('grid');
const selectedItem = reactive({
    value : {}
})





const collectData = (item) =>{
    console.log(item);
    selectedItem.value = item.produit
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
            ligneFactStore.deleteLigneFacture(id)
            addProductVisible.value = false

        },
    
    });
};


onBeforeMount(async()=>{
    await ligneFactStore.fetchLigneFactureByClient(1)

});

</script>

<style>
img{
max-height: 100px;
object-fit: contain;
}
</style>
