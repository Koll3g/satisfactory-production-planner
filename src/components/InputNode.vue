<script setup>
    const props = defineProps({
  materialName: String,
  totalAmount: Number
})
</script>

<template>
    <div class="inputNode">
        <p>{{materialName}}</p>
        <p>{{totalAmount}} / min</p>
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