<script>
import { computed, onMounted } from '@vue/runtime-core'
import store from '../../store/index.js'
import TodoListItem from '../TodoListItem/index.vue'

export default {
    components:{
        TodoListItem
    },
    setup() {
        const activeTodos = computed(() => {
                return store.getters['todos/activeTodos']
            })

        async function get_init_todos() {
            await store.dispatch('todos/getAllTodos')
            store.getters['todos/allTodos']
        }               

        onMounted(() =>{
            get_init_todos()
		})


        return {
            TodoListItem,
            activeTodos
        }
    } 
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>