<script setup>
import { uuid } from 'vue-uuid';
import ProductionStep from './ProductionStep.vue';
import {onUpdated, ref, onMounted} from 'vue'
import {saveToLocalStorage, getFromLocalStorage} from './localStorage.js'

const columnCount = 10

const props = defineProps({
        recipes: Array,
        groups: Array
})

class productionStepProperties{
    constructor(id, recipeId, efficency, quantity, column){
        this.id = id;
        this.recipeId = recipeId;
        this.efficency = efficency;
        this.quantity = quantity;
        this.column = column;
    }
}

const productionSteps = ref([])

function getColumnFromId(id){
    return productionSteps.value.filter((productionStep) => productionStep.column == id)
}

onUpdated(() => {
    console.log("update called", productionSteps.value, props.groups)
    saveToLocalStorage(productionSteps.value, props.groups)
})

onMounted(() => {
    // localStorage.removeItem("PRODUCTION_PLAN_1");
    let data = getFromLocalStorage()
    if(data != null){
        data.productionSteps.forEach((item) => productionSteps.value.push(item))
    }
})

function startDrag(evt, item) {
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', item.id)
}

function onDrop(evt, column) {
    const itemID = evt.dataTransfer.getData('itemID')
    const item = productionSteps.value.find((item) => item.id == itemID)
    item.column = column
}

function addDefaultProductionStep(column){
    productionSteps.value.push(new productionStepProperties(uuid.v4(), props.recipes[0].id, 1, 1, column))
}

function deleteProductionStep(productionStepId){
    let index = productionSteps.value.findIndex((item) => item.id == productionStepId)
    if(index == -1){
        console.log("could not delete productionStep - id not found")
        return
    }
    productionSteps.value.splice(index, 1);
}

function recipeOfChildChanged([newRecipeId, productionStepId]){
    // console.log("recipe of child called, ", productionSteps)
    let index = productionSteps.value.findIndex((item) => item.id == productionStepId)
    productionSteps.value[index].recipeId = newRecipeId;
    saveToLocalStorage(productionSteps.value, props.groups)
}

</script>

<template>    
    <div class="flex-row" >
        <div v-for="i in columnCount" class="flex-row">
            <div class="drop-zone" @drop="onDrop($event, i)" @dragover.prevent @dragenter.prevent>
                <div v-for="item in getColumnFromId(i)" :key="item.id" class="drag-el" draggable @dragstart="startDrag($event, item)" >
                    <ProductionStep :recipes="props.recipes" :productionStepProps="item" @recipeChanged="recipeOfChildChanged" @deleteProductionStep="deleteProductionStep"></ProductionStep>
                </div>
                <div>
                    <button @click="addDefaultProductionStep(i)">Add Production Step</button>
                </div>
            </div>
            <div class="column-spacer"></div>
        </div>
    </div>
</template>

<style scoped>
    .productionPlan {
        width: 100%;
    }

    .column-spacer {
        width: 50px;
        height: 100px;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .drop-zone {
        background-color: var(--vt-c-divider-dark-1);
        min-width: 50px;
        padding: 10px;
        height: 100vh;
    }
    .drag-el {
        cursor: pointer;
    }
</style>