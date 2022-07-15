<script>
import { computed, onMounted } from '@vue/runtime-core'
import store from '../../store'
import TodoListItem from '../TodoListItem/index.vue'
export default {
    components: {
        TodoListItem
    },
    setup() {
        const completedTodos = computed(() => {
            return store.getters['todos/completedTodos']
        })

        async function get_init_todos() {
            await store.dispatch('todos/getAllTodos')
            store.getters['todos/allTodos']
        }        

        onMounted(async () =>{
            get_init_todos()
		})

        return {
            TodoListItem,
            completedTodos
        }
    } 
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>