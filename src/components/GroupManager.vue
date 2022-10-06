<script setup>
    import {onMounted, ref, nextTick} from 'vue'

    const groups = ref([])
    const newGroupName = ref("")
    const newGroupColor = ref("#000000")

    const props = defineProps({
        groups: Array
    })

    const emit = defineEmits(['groupsChanged'])

    function addOrModifyGroup(){
        if(groups.value.find((group) => group.name == newGroupName.value) != null){
            let index = groups.value.findIndex((group) => group.name == newGroupName.value)
            groups.value[index].color = newGroupColor.value
        }
        else{
            groups.value.push(new Group(newGroupName.value, newGroupColor.value))
        }
        newGroupName.value = ""
        newGroupColor.value = "#000000"
        emit('groupsChanged',[groups.value])
    }

    function addOrModifyTextButton(){
        if(groups.value.find((group) => group.name == newGroupName.value)){
            return "Mod"
        }
        else{
            return "Add"
        }
    }

    function deleteGroup(groupName){
        let i = groups.value.findIndex((group) => group.name == groupName)
        groups.value.splice(i,1)
        emit('groupsChanged',[groups.value])
    }

    class Group{
        constructor(name, color){
            this.name = name
            this.color = color
        }
    }

    onMounted(() => {
        nextTick(() => {
            props.groups.forEach((group) => groups.value.push(group))
        })

    })
</script>

<template>
    <h2>Groups</h2>
    <label>Add / Modify Group:</label>
    <div>
        <input type="text" v-model="newGroupName">
        <input type="color" v-model="newGroupColor">
        <button @click="addOrModifyGroup()">{{addOrModifyTextButton()}}</button>
    </div>
    <div class="column-spacer"></div>
    <div v-for="group in groups">
        <h3 :style="{color: group.color}">{{group.name}}</h3>
        <img src="./icons/delete.png" class="delete-icon" @click="deleteGroup(group.name)"/>
    </div>
</template>

<style scoped>
    .column-spacer {
        height: 20px;
    }

    h2 {
        margin-bottom: 10px;
    }

    .delete-icon {
        height:20px;
        align-self: center;
        position: absolute;
        right: 30px
        /* padding-right: 15px */
    }
</style>