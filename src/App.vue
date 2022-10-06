<script setup>
import ProductionPlan from './components/ProductionPlan.vue';
import {recipe} from './components/classes/recipe.js';

const recipes = recipe.getRecipes()
</script>

<template>
  <ProductionPlan :recipes="recipes"></ProductionPlan>
</template>

<style scoped>

</style>
