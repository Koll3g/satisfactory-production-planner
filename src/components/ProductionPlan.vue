<script setup>
import { uuid } from 'vue-uuid';
import ProductionStep from './ProductionStep.vue';
import {onUpdated, ref, reactive, onMounted} from 'vue'

const columnCount = 10

const props = defineProps({
        recipes: Array
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

const productionSteps = reactive([])

function getColumnFromId(id){
    return productionSteps.filter((productionStep) => productionStep.column == id)
}

onUpdated(() => {
    console.log("update called", productionSteps)
    saveToDisk()
})

onMounted(() => {
    // localStorage.removeItem("PRODUCTION_PLAN_1");
    let data = getFromDisk()
    if(data != null){
        data.forEach((item) => productionSteps.push(item))
    }
    // if(productionSteps.length == 0){
    //     this.productionSteps.push(new productionStepProperties(uuid.v4(), props.recipes[0].id, 1, 1, 1))
    // }
})

function startDrag(evt, item) {
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', item.id)
}

function onDrop(evt, column) {
    const itemID = evt.dataTransfer.getData('itemID')
    const item = this.productionSteps.find((item) => item.id == itemID)
    item.column = column
}

function addDefaultProductionStep(column){
   this.productionSteps.push(new productionStepProperties(uuid.v4(), props.recipes[0].id, 1, 1, column))
   saveToDisk()
}



function recipeOfChildChanged([newRecipeId, productionStepId]){
    let index = productionSteps.findIndex((item) => item.id == productionStepId)
    productionSteps[index].recipeId = newRecipeId;
    console.log("recipe of child called, ", productionSteps)
    saveToDisk()
}

function saveToDisk(){
    let key = "PRODUCTION_PLAN_1"
    let stringified = JSON.stringify(productionSteps);
    localStorage.setItem(key, stringified);
}

function getFromDisk() {
    let key = "PRODUCTION_PLAN_1"
    let data = JSON.parse(localStorage.getItem(key))
    // if(data == null){
    //     data = []
    // }
    return data
};

</script>

<template>    
    <div class="flex-row" >
        <div v-for="i in columnCount" class="flex-row">
            <div class="drop-zone" @drop="onDrop($event, i)" @dragover.prevent @dragenter.prevent>
                <div v-for="item in getColumnFromId(i)" 
                    :key="item.id" 
                    class="drag-el" 
                    draggable 
                    @dragstart="startDrag($event, item)" 
                >
                    <ProductionStep :recipes="props.recipes" :productionStepProps="item" @recipeChanged="recipeOfChildChanged"></ProductionStep>
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
    }
    .drag-el {
        cursor: pointer;
    }
</style>