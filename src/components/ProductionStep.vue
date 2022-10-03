<script setup>
    import {ref} from 'vue'
    import InputNode from './InputNode.vue';
    import OutputNode from './OutputNode.vue';
    import {recipe} from './classes/recipe.js';
    import { uuid } from 'vue-uuid';

    const quantity = ref(1)
    const selectedRecipe = ref({})
    const recipes = ref(recipe.getRecipes())
    const id = ref(uuid.v4())
    
    function calculateSpeed(materialLineItemAmount) {
        return quantity.value * parseInt(materialLineItemAmount) // / selectedRecipe.refs.duration * 60
    }
</script>


<template>
    <div class="productionStep">
        <div>
            <input class="fullWidth" type="text" placeholder="Title"/>
            <p>{{id}}</p>
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
        <div>
            <label class="fullWidth">Recipe (selected Recipe: {{selectedRecipe}})</label>
            <select class="fullWidth" v-model="selectedRecipe">
                <option v-for="recipe in recipes" :value="recipe">
                    {{ recipe.name }}
                </option>
            </select>
        </div>
        <div class="flex-row">
            <div class="flex-column, half-width">
                <li style="list-style: none;" v-for="ingredient in selectedRecipe.ingredients">
                    <InputNode :materialName="ingredient.material.name" :totalAmount="calculateSpeed(ingredient.amount)"></InputNode>
                </li>
            </div>
            <div class="flex-column, half-width">
                <li style="list-style: none;" v-for="product in selectedRecipe.products">
                    <OutputNode :materialName="product.material.name" :totalAmount="calculateSpeed(product.amount)"></OutputNode>
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