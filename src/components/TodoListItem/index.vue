<script>
import { ref } from "@vue/runtime-core";
import store from '../../store/index.js'
import Popup from "../Popup/index.vue";


export default {
	components: {
		Popup,
	},
	props: ["todos"],
	directives: {
		focus: {
			mounted(el) {
				el.focus();
			},
		},
	},
	setup() {

		const editItem = ref("");
		const deleteItem = ref("")
		const isShowDeleteDialog = ref(false)

		function editHandler(todo) {
			editItem.value = todo.Content;
			todo.isEdit = true;
		}

		function submitEdit(todo) {
			todo.Content = editItem.value;
			todo.isEdit = false;
			const { Content, Id, done, index } = todo
			store.dispatch('todos/updateTodo', { Content, Id, done, index } )
		}

		function cancelEidt(todo) {
			todo.isEdit = false;
			return todo;
		}

		function deletehandler(todo) {
			deleteItem.value = todo
			isShowDeleteDialog.value = true
		}

		function cancelDelete() {
			isShowDeleteDialog.value = false
			deleteItem.value = ''
		}

		function confirmDelete() {
			const { Id, index } = deleteItem.value
			store.dispatch('todos/deleteTodo', { Id, index })
			isShowDeleteDialog.value = false
		}

		function updateCompleted(todo) {
			todo.done = todo.done ? false : true
			const { Content, Id, UserId, done, index } = todo
			store.dispatch('todos/updateTodo', { Content, Id, UserId, done, index } )
		}


		return {
			editItem,
			deleteItem,
			isShowDeleteDialog,
			editHandler,
			submitEdit,
			cancelEidt,
			deletehandler,
			cancelDelete,
			confirmDelete,
			updateCompleted,
		};
	},
};
</script>
<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>
