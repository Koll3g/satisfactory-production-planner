<script setup>
    const props = defineProps({
  materialName: String,
  totalAmount: Number
})
</script>

<template>
    <div class="outputNode">
        <p>{{materialName}}</p>
        <p>{{totalAmount}} / min</p>
    </div>
</template>

<style scoped>
    .outputNode {
        background-color: darkgray;
        margin: 5px;
        margin-right: 0px;
        padding: 5px;
        text-align: right;
    }
</style>