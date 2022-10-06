<script setup>
import ProductionPlan from './components/ProductionPlan.vue';
import {recipe} from './components/classes/recipe.js';
import {Slide} from 'vue3-burger-menu'
import GroupManager from './components/GroupManager.vue'
import {ref, VueElement} from 'vue'

const recipes = recipe.getRecipes()
const groups = ref([])


</script>

<template>
  <div class="grid-container">
    <div id="burger-spacer"></div>
    <div id="main-content">
      <div id="app">
        <Slide>
          <GroupManager ></GroupManager>
        </Slide>
        <main id="page-wrap">
          <ProductionPlan :recipes="recipes" :groups="groups.value"></ProductionPlan>
        </main>
      </div>
    </div>
  </div>

</template>

<style>
  .grid-container{
    display: grid;
    grid-template-columns: 38px auto
  }

  #main-content{
    grid-column-start: 2;
    grid-column-end: 3;
  }

  #app{
    display: block
  }

  #burger-spacer {
    width: 40px;
    height: 100%;
    background-color: var(--vt-c-black);
    position: fixed;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .bm-menu{
    grid-column-start: 1 !important;
    grid-column-end: 2 !important;
    padding-top: 20px !important;
  }

  .bm-burger-button {
    position: fixed !important;
    width: 18px !important;
    height: 15px !important;
    left: 10px !important;
    top: 10px !important;
    cursor: pointer !important;
  }

  .bm-item-list {
    font-size: 16px !important;
    margin-left: 5% !important;
  }

  .bm-item-list > * {
      padding: 0 !important;
    }
  .bm-item-list > label {
    margin-bottom: 5px;
  }
</style>
