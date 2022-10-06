<script setup>
import ProductionPlan from './components/ProductionPlan.vue';
import {recipe} from './components/classes/recipe.js';

import {ref, VueElement} from 'vue'

const recipes = recipe.getRecipes()
const groups = ref([])


</script>

<template>
  <ProductionPlan :recipes="recipes" :groups="groups.value"></ProductionPlan>
</template>

