<script setup>
import { uuid } from 'vue-uuid';
import ProductionStep from './ProductionStep.vue';
import {ref} from 'vue'

const productionSteps = ref([{id:1, listId: 1},{id:2, listId: 1},{id:3, listId:2},{id:4, listId:2}])
const rowCount = 10

function getListFromId(id){
    return productionSteps.value.filter((productionStep) => productionStep.listId == id)
}

function startDrag(evt, item) {
    evt.dataTransfer.dropEffect = 'move'
    evt.dataTransfer.effectAllowed = 'move'
    evt.dataTransfer.setData('itemID', item.id)
}

function onDrop(evt, list) {
    const itemID = evt.dataTransfer.getData('itemID')
    const item = this.productionSteps.find((item) => item.id == itemID)
    item.listId = list
}

</script>

<template>    
    <div class="flex-row" >
        <div v-for="i in rowCount" class="flex-row">
            <div class="drop-zone" @drop="onDrop($event, i)" @dragover.prevent @dragenter.prevent>
                <div v-for="item in getListFromId(i)" 
                    :key="item.id" 
                    class="drag-el" 
                    draggable 
                    @dragstart="startDrag($event, item)" 
                >
                    <ProductionStep :id="item.id"></ProductionStep>
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
        background-color: blue;
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
        background-color: red;
        min-width: 50px;
        padding: 10px;
    }
    .drag-el {
        background-color: green;
        padding: 5px;
        cursor: pointer;
    }
</style>