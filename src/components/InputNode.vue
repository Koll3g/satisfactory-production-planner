<script setup>
    const props = defineProps({
  materialName: String,
  totalAmount: Number,
  unit: String
})
</script>

<template>
    <div class="inputNode">
        <p>{{materialName}}</p>
        <p>{{Math.round((totalAmount + Number.EPSILON) * 1000) / 1000}} {{unit}}</p>
    </div>
</template>

<style scoped>
    .inputNode {
        background-color: darkgray;
        margin: 5px;
        margin-left: 0px;
        padding: 5px;
        white-space: nowrap;
    }
</style>