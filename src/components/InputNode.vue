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
        <p>{{totalAmount}} {{unit}}</p>
    </div>
</template>

<style scoped>
    .inputNode {
        background-color: darkgray;
        margin: 5px;
        margin-left: 0px;
        padding: 5px;
    }
</style>