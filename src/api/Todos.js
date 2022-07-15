import api from "./Api.js";

const USER_ENDPOINT = "/todo";

export default {
	GET_USER_TODOS() {
		return api
			.get(USER_ENDPOINT + "/all")
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				const getTodoSuccess = error.response.data.getTodosSuccess;
				return getTodoSuccess;
			});
	},
	USER_POST_TODO(data) {
		return api
			.post(USER_ENDPOINT, data)
			.then((res) => {
				const addTodoSuccess = res.data.addTodoSuccess;
				const data = res.data;
				delete data["addTodoSuccess"];
				return { data, addTodoSuccess };
			})
			.catch((error) => {
				const addTodoSuccess = error.response.data.addTodoSuccess;
				return addTodoSuccess;
			});
	},
	USER_DELETE_TODO(id) {
		return api
			.delete(USER_ENDPOINT, {
				data: {
					Id: id,
				},
			})
			.then((res) => {
				const deleteTodoSuccess = res.data.deleteTodoSuccess;
				return deleteTodoSuccess;
			})
			.catch((error) => {
				const deleteTodoSuccess = error.response.data.deleteTodoSuccess;
				return deleteTodoSuccess;
			});
	},
	USER_UPDATE_TODO(data) {
		return api.patch(USER_ENDPOINT, data)
            .then((res) =>{
                const updateTodoSuccess = res.data.updateTodoSuccess;
                const data = res.data
                delete data['updateTodoSuccess']
                return { data, updateTodoSuccess }
            })
            .catch((error) => {
                const updateTodoSuccess = error.response.data.updateTodoSuccess;
                return updateTodoSuccess;
            })
	},
};
