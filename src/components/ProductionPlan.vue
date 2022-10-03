<script setup>
import ProductionStep from './ProductionStep.vue';

</script>

<template>
    <div class="productionPlan, flex-row" >
        <div class="productionStep" >
            <ProductionStep class="productionStep"></ProductionStep>
            <ProductionStep class="productionStep"></ProductionStep>
        </div>
        <div class="column-spacer"></div>
        <div class="productionStep">
            <ProductionStep class="productionStep"></ProductionStep>
            <ProductionStep class="productionStep"></ProductionStep>
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
</style>