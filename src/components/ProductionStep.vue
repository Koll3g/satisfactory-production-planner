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
        <div>
            <img src="./icons/drag.png" style="height:20px"/>
            <p style="display:inline">{{id}}</p>
        </div>
        <div>
            <label class="fullWidth">Recipe (selected Recipe: {{selectedRecipeId}})</label>
            <select class="fullWidth" v-model="selectedRecipeId">
                <option v-for="recipe in recipes" :value="recipe.id">
                    {{ recipe.name }}
                </option>
            </select>
        </div>
        <div class="flex-row">
            <div id="leftRow" class="flex-column">
                <label>Quantity:</label>
                <input type="number" placeholder="1" v-model="quantity"/>
            </div>
            <div id="rightRow" class="flex-column">
                <label>Efficency:</label>
                <input type="number" placeholder="1"/>
            </div>
        </div>

        <div class="flex-row">
            <div class="flex-column, half-width">
                <li style="list-style: none;" v-for="ingredient in getSelectedRecipe(selectedRecipeId).ingredients">
                    <InputNode :materialName="ingredient.material.name" :totalAmount="calculateSpeed(ingredient.amount)" :unit="ingredient.material.getUnit()"></InputNode>
                </li>
            </div>
            <div class="flex-column, half-width">
                <li style="list-style: none;" v-for="product in getSelectedRecipe(selectedRecipeId).products">
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