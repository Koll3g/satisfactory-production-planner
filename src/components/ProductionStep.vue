<script setup>
    import {ref} from 'vue'
    import InputNode from './InputNode.vue';
    import OutputNode from './OutputNode.vue';

    const quantity = ref(props.productionStepProps.quantity)
    const efficency = ref(props.productionStepProps.efficency)
    const selectedRecipeId = ref(props.productionStepProps.recipeId)


    const selectedStepGroup = ref({})
    const selectedOutputGroup = ref({})
    const selectedInputGroup = ref({})
    const stepGroupSelectionActive = ref(false)

    const props = defineProps({
        recipes: Array,
        productionStepProps: Object,
        groups: Array
    })


    function getSelectedRecipe(recipeId){
        let selectedRecipe = props.recipes.find((recipeX) => recipeX.id == recipeId)
        if(selectedRecipe == null){
            console.log("recipe not found - recipe-id: ", recipeId)
        }
        return selectedRecipe
    }

    function calculateSpeed(materialLineItemAmount) {
        let selectedRecipe = getSelectedRecipe(selectedRecipeId.value);
        let duration = selectedRecipe.duration;
        let itemsPerMinute = quantity.value * parseInt(materialLineItemAmount) / duration * 60
        return itemsPerMinute
    }
</script>


<template>
    <div class="productionStep">
        <div class="flex-row">
            <img src="./icons/drag.png" style="height:20px; margin-right:5px"/>
            <select class="fullWidth" v-model="selectedRecipeId" style="font-size:medium" @change="$emit('recipeChanged', [selectedRecipeId, props.productionStepProps.id])">
                <option v-for="recipe in recipes" :value="recipe.id">
                    {{ recipe.name }}
                </option>
            </select>
            <img src="./icons/delete.png" style="height:20px; margin-left:5px" @click="$emit('deleteProductionStep', [props.productionStepProps.id])"/>
        </div>
        <div class="flex-row">
            <div id="leftRow" class="flex-column,half-width"  style="margin-right:5px;margin-top:5px">
                <label>Quantity:</label>
                <input class="fullWidth" type="number" placeholder="1" v-model="quantity"/>
            </div>
            <div id="rightRow" class="flex-column,half-width" style="margin-left:5px;margin-top:5px">
                <label>Efficency:</label>
                <input class="fullWidth" type="number" placeholder="1" disabled="true"/>
            </div>
        </div>
        <label v-if="stepGroupSelectionActive">Group:</label>
        <div v-if="stepGroupSelectionActive" class="fullWidth, flex-row">
            <select class="fullWidth" v-model="selectedStepGroup">
                <option v-for="group in props.groups" :value="group">
                    {{ group.name }}
                </option>
            </select>
            <img src="./icons/split.png" style="height:20px; margin-right:5px; margin-left:5px"/>
        </div>
        <div class="flex-row">
            <div class="flex-column, half-width">
                <label >Input:</label>
                <div v-if="!stepGroupSelectionActive" class="fullWidth, flex-row">
                    <select class="fullWidth" v-model="selectedInputGroup">
                        <option v-for="group in props.groups" :value="group">
                            {{ group.name }}
                        </option>
                    </select>
                    <img src="./icons/split.png" style="height:20px; margin-right:5px; margin-left:5px"/>
                </div>
                <li style="list-style: none;" v-for="ingredient in getSelectedRecipe(selectedRecipeId).ingredients">
                    <InputNode :materialName="ingredient.material.name" :totalAmount="calculateSpeed(ingredient.amount)" :unit="ingredient.material.getUnit()"></InputNode>
                </li>
            </div>
            <div class="flex-column, half-width">
                <label style="margin-left: 5px">Output:</label>
                <div v-if="!stepGroupSelectionActive" class="fullWidth, flex-row" style="margin-left:5px">
                    <select class="fullWidth" v-model="selectedOutputGroup">
                        <option v-for="group in props.groups" :value="group">
                            {{ group.name }}
                        </option>
                    </select>
                    <img src="./icons/split.png" style="height:20px; margin-right:5px; margin-left:5px"/>
                </div>
                <li style="list-style: none; min-width: min-content" v-for="product in getSelectedRecipe(selectedRecipeId).products">
                    <OutputNode :materialName="product.material.name" :totalAmount="calculateSpeed(product.amount)" :unit="product.material.getUnit()"></OutputNode>
                </li>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .productionStep {
        background-color: rgb(127, 159, 179);
        padding: 5px;
        border: 2px solid black;
        width: 300px;
        margin-bottom: 5px;
    }

    .flex-row {
        display: flex;
        flex-direction: row;
    }

    .flex-column {
        display: flex;
        flex-direction: column;
    }

    .half-width {width: 50%;}
    .fullWidth {width: 100%;} 
</style>