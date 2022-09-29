<script setup>
    import {ref} from 'vue'
    import InputNode from './InputNode.vue';
    import OutputNode from './OutputNode.vue';
    import {recipe} from './classes/recipe.js';

    const selectedRecipeId = ref(1)
    const recipes = ref(recipe.getTestRecipes())
</script>


<template>
    <div class="productionStep">
        <div>
            <input class="fullWidth" type="text" placeholder="Title"/>
        </div>
        <div class="flex-row">
            <div id="leftRow" class="flex-column">
                <label>Quantity:</label>
                <input type="number" placeholder="1"/>
            </div>
            <div id="rightRow" class="flex-column">
                <label>Efficency:</label>
                <input type="number" placeholder="1"/>
            </div>
        </div>
        <div>
            <label class="fullWidth">Recipe (selected Recipe Id: {{selectedRecipeId}})</label>
            <select class="fullWidth" v-model="selectedRecipeId">
                <option v-for="recipe in recipes" :value="recipe.id">
                    {{ recipe.name }}
                </option>
            </select>
        </div>
        <div class="flex-row">
            <div class="flex-column, half-width">
                <InputNode></InputNode>
                <InputNode></InputNode>
            </div>
            <div class="flex-column, half-width">
                <OutputNode></OutputNode>
                <OutputNode></OutputNode>
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