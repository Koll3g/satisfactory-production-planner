<script setup>
    import {ref} from 'vue'
    import InputNode from './InputNode.vue';
    import OutputNode from './OutputNode.vue';
    import {recipe} from './classes/recipe.js';
    import { uuid } from 'vue-uuid';

    const quantity = ref(1)
    const recipes = ref(recipe.getRecipes())
    const selectedRecipeId = ref("Recipe_IronPlate_C")

    const props = defineProps({
        id: Number
    })

    function getSelectedRecipe(recipeId){
        // if(recipeId == ""){
        //     selectedRecipeId = recipes.value[0].id
        //     return recipes.value[0];
        // }
        let selectedRecipe = this.recipes.find((recipeX) => recipeX.id == recipeId)
        return selectedRecipe
    }

    function calculateSpeed(materialLineItemAmount) {
        let selectedRecipe = this.getSelectedRecipe(this.selectedRecipeId);
        let duration = selectedRecipe.duration;
        let itemsPerMinute = quantity.value * parseInt(materialLineItemAmount) / duration * 60
        return itemsPerMinute
    }
</script>


<template>
    <div class="productionStep">
        <div class="flex-row">
            <img src="./icons/drag.png" style="height:20px; margin-right:5px"/>
            <select class="fullWidth" v-model="selectedRecipeId" style="font-size:medium">
                <option v-for="recipe in recipes" :value="recipe.id">
                    {{ recipe.name }}
                </option>
            </select>
            <img src="./icons/delete.png" style="height:20px; margin-left:5px"/>
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

        <div class="flex-row">
            <div class="flex-column, half-width">
                <li style="list-style: none;" v-for="ingredient in getSelectedRecipe(selectedRecipeId).ingredients">
                    <InputNode :materialName="ingredient.material.name" :totalAmount="calculateSpeed(ingredient.amount)" :unit="ingredient.material.getUnit()"></InputNode>
                </li>
            </div>
            <div class="flex-column, half-width">
                <li style="list-style: none; min-width: min-content" v-for="product in getSelectedRecipe(selectedRecipeId).products">
                    <OutputNode :materialName="product.material.name" :totalAmount="calculateSpeed(product.amount)" :unit="product.material.getUnit()"></OutputNode>
                </li>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .productionStep {
        background-color: darkslategray;
        padding: 5px;
        margin: 5px;
        width: 300px;
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