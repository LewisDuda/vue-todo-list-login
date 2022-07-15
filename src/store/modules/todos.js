import APIs from '../../api/Todos'
import Swal from "sweetalert2";

// Sweetalert2 options
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    iconColor: "white",
    customClass: {
        popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
});

export default {
    state: () => ({
        todos: [],
    }),
    getters: {
        allTodos (state) {
            state.todos.forEach(function(item, index, array){
                item.index = index
            })
            return state.todos
        },
        activeTodos (state) {
            return state.todos.filter(todo => !todo.done )
        },
        completedTodos (state) {
            return state.todos.filter(todo => todo.done)
        }
    },
    actions: {
        async getAllTodos ({ commit }) {
            const response = await APIs.GET_USER_TODOS()
            commit('INIT_TODOS', response)
        },
        async addTodo ({ commit }, data) {
            const response = await APIs.USER_POST_TODO(data)
            if(!response.addTodoSuccess)
                return Toast.fire({
                    icon: "error",
                    title: "Oops, delete todo failed.",
                });
            Toast.fire({
                icon: "success",
                title: "Add todo successfull",
            });		                            
            commit('ADD_TODO', response.data)
        },
        async deleteTodo({ commit }, data) {
            const { Id, index } = data
            const response = await APIs.USER_DELETE_TODO(Id)
            if(!response)
                return Toast.fire({
                    icon: "error",
                    title: "Oops, delete todo failed.",
                });
            Toast.fire({
                icon: "success",
                title: "Delete todo successfull",
            });		                
            commit('DELETE_TODO', index)
        },
        async updateTodo ({ commit }, data) {
            const { Content, Id, done, index } = data
            const response = await APIs.USER_UPDATE_TODO({ Content, Id, done })
            if(!response.updateTodoSuccess)
                return Toast.fire({
					icon: "error",
					title: "Oops, edit todo failed.",
				});
            Toast.fire({
                icon: "success",
                title: "Edit todo successfull.",
            });	
            const { UserId } = response.data
            commit('EDIT_TODO', { Content, Id, UserId, done, index })
        }
    },
    mutations: {
        INIT_TODOS(state, payload){
            state.todos = payload
        },
        ADD_TODO(state, payload){
            state.todos.unshift(payload)
        },
        DELETE_TODO(state, payload) {
            state.todos.splice(payload, 1)
        },
        EDIT_TODO(state, payload) {
            const { Content, Id, UserId, done, index } = payload
            state.todos[index] = { Content, Id, UserId, done }
        }
    },
    namespaced: true
}