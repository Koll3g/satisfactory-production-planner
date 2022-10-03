<script setup>
import { uuid } from 'vue-uuid';
import ProductionStep from './ProductionStep.vue';
import {ref} from 'vue'

const productionSteps = ref([{id:1, listId: 1},{id:2, listId: 1},{id:3, listId:2},{id:4, listId:2}])

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
    <div class="productionPlan, flex-row" >
        <div class="drop-zone" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
            <div v-for="item in getListFromId(1)" 
                :key="item.id" 
                class="drag-el" 
                draggable 
                @dragstart="startDrag($event, item)" 
            >
                <ProductionStep :id="item.id"></ProductionStep>
            </div>
        </div>
        <div class="column-spacer"></div>
        <div class="drop-zone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
            <div v-for="item in getListFromId(2)" 
                :key="item.id" 
                class="drag-el" 
                draggable 
                @dragstart="startDrag($event, item)"         
            >
                <ProductionStep :id="item.id"></ProductionStep>
            </div>
        </div>
        <div class="column-spacer"></div>
        <div class="drop-zone" @drop="onDrop($event, 3)" @dragover.prevent @dragenter.prevent>
            <div v-for="item in getListFromId(3)" 
                :key="item.id" 
                class="drag-el" 
                draggable 
                @dragstart="startDrag($event, item)"         
            >
                <ProductionStep :id="item.id"></ProductionStep>
            </div>
        </div>
        <div class="column-spacer"></div>
        <div class="drop-zone" @drop="onDrop($event, 4)" @dragover.prevent @dragenter.prevent>
            <div v-for="item in getListFromId(4)" 
                :key="item.id" 
                class="drag-el" 
                draggable 
                @dragstart="startDrag($event, item)"         
            >
                <ProductionStep :id="item.id"></ProductionStep>
            </div>
        </div>
        <div class="column-spacer"></div>
        <div class="drop-zone" @drop="onDrop($event, 5)" @dragover.prevent @dragenter.prevent>
            <div v-for="item in getListFromId(5)" 
                :key="item.id" 
                class="drag-el" 
                draggable 
                @dragstart="startDrag($event, item)"         
            >
                <ProductionStep :id="item.id"></ProductionStep>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .productionPlan {
        width: 100%;
    }

    .column-spacer {
        min-width: 50px;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    productionStep {
        /* width: 100px; */
    }

    .drop-zone {
        background-color: red;
        margin-bottom: 10px;
        padding: 10px;
    }
    .drag-el {
        background-color: green;
        margin-bottom: 10px;
        padding: 5px;
        cursor: pointer;
    }

    .noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
</style>