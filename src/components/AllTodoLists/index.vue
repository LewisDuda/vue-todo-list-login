<script>
import { computed, onMounted } from "@vue/runtime-core";
import store from '../../store/index.js'
import TodoListItem from '../TodoListItem/index.vue'

export default {
    components:{
        TodoListItem
    },
    setup(){
        const alltodos = computed(() => store.getters['todos/allTodos'])

        async function get_init_todos() {
            await store.dispatch('todos/getAllTodos')
            store.getters['todos/allTodos']
        }


        onMounted(() =>{
            get_init_todos()
		})
        
        return {
            TodoListItem,
            alltodos,
        }
    }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
