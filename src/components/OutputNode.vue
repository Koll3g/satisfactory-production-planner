<script setup>
    const props = defineProps({
  materialName: String,
  totalAmount: Number,
  unit: String
})
</script>

<template>
    <div class="outputNode">
        <p>{{materialName}}</p>
        <p>{{Math.round((totalAmount + Number.EPSILON) * 1000) / 1000}} {{unit}}</p>
    </div>
</template>

<style scoped>
    .outputNode {
        background-color: darkgray;
        margin: 5px;
        margin-right: 0px;
        padding: 5px;
        text-align: right;
        white-space: nowrap;
    }
</style>