<template>
	<div class="home">
		<header>
			<router-link to="/home/all" class="logo">Todo List</router-link>
			<VueWriter
				:array="welcomeArr"
				:eraseSpeed="50"
				:typeSpeed="100"
				:delay="1000"
				:start="1500"
			>
			</VueWriter>
			<div class="add-task" @click="addHandler">
				<i class="fa-solid fa-note-sticky"></i>
			</div>
			<div class="user-icon" @click="showDetail">
				<i class="fa-solid fa-user-large"></i>
			</div>
			<div class="user-detail" :class="{ show: isUserDetail }">
				<router-link to="/home/all" class="user-name">{{ username }}</router-link>
				<router-link to="/profile" class="user-info" v-show="!googleSignIn">
					<i class="fa-solid fa-address-card"></i>
					<h4>Your Profile</h4>
				</router-link>
				<a class="sign-out" @click="singout">
					<i class="fa-solid fa-right-from-bracket"></i>
					<h4>Sign out</h4>
				</a>
			</div>
		</header>
		<div class="todo-form">
			<div class="header">
				<router-link to="/home/all">ALL</router-link>
				<router-link to="/home/active">ACTIVE</router-link>
				<router-link to="/home/completed">COMPLETED</router-link>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
		<Popup
			class="addDialog"
			:showDialog="isShowAddDialog"
			cancelText="CNACEL"
			confirmText="CONFIRM"
			@confirm="confirmAdd"
			@cancel="cancelAdd"
		>
			<div class="content">
				<fieldset>
					<legend>ADD TODOLIST</legend>
					<input
						type="text"
						v-model="addInput"
						@keyup.enter="confirmAdd"
						@keyup.esc="cancelAdd"
					/>
				</fieldset>
			</div>
		</Popup>
	</div>
</template>

<script>
import { ref, computed, onMounted } from "@vue/runtime-core";
import store from '../store/index.js'
import VueWriter from "vue-writer";
import Popup from "../components/Popup/index.vue";
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
    timer: 1500,
    timerProgressBar: true,
});

export default {
	components: {
		VueWriter,
		Popup,
	},
	setup() {
		const authState = store.state.auth;
		const isShowAddDialog = ref(false);

		const isUserDetail = ref(false);
		const username = computed(() => authState.user.Name).value;
		const googleSignIn = computed(() => authState.user.GoogleSignIn).value

		const welcomeArr = [
			"Hello " + username + ", Welcome to your TodoList!",
		];
		const addInput = ref("");

		function showDetail() {
			isUserDetail.value =
				isUserDetail.value == false
					? (isUserDetail.value = true)
					: (isUserDetail.value = false);
		}

		function singout() {
			store.dispatch("auth/userSignout");
		}

		function addHandler() {
			isShowAddDialog.value = true;
		}

		function cancelAdd() {
			isShowAddDialog.value = false;
			addInput.value = "";
		}

		async function confirmAdd() {
			if(!addInput.value){
                return Toast.fire({
                    icon: "error",
                    title: "Oops, the content of todo cannot be empty!",
                });		

			}
			await store.dispatch("todos/addTodo", {
				Content: addInput.value,
				done: false,
			});
			isShowAddDialog.value = false;
			addInput.value = "";
		}

		return {
			username,
			googleSignIn,
			isUserDetail,
			isShowAddDialog,
			welcomeArr,
			addInput,
			showDetail,
			singout,
			addHandler,
			cancelAdd,
			confirmAdd,
			Popup,
		};
	},
};
</script>

<style lang="scss">

.home {
	height: 100vh;
	width: 100vw;
	background: url("../assets/homeBackground.jpg");
	background-size: 100% 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	// HEADER START
	header {
		width: 100%;
		height: 10%;
		display: flex;
		align-items: center;
		position: absolute;
		top: 0%;

		a {
			text-decoration: none;
		}

		i {
			font-size: 1em;
		}

		.logo {
			font-family: "Dancing Script", cursive;
			position: absolute;
			left: 7%;
			font-size: 2.5em;
			cursor: pointer;
			transition: 0.3s;
			color: #fff;
			&:hover {
				color: #b05b3b;
			}
		}
		.is-typed {
			width: 50%;
			height: 10vh;
			position: absolute;
			left: 25%;
			top: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 2.5em;

			span.cursor {
				display: inline-block;
				width: 0.15em;
				background-color: #2a1204;
				animation: blink 1s infinite;
				margin-left: 0.3em;
			}
		}

		.add-task {
			position: absolute;
			right: 12%;
			font-size: 2.5em;
			cursor: pointer;
			transition: 0.3s;
			color: #fff;
			&:hover {
				color: #b05b3b;
			}
		}

		.user-icon {
			position: absolute;
			right: 7%;
			font-size: 2em;
			cursor: pointer;
			transition: 0.3s;
			color: #fff;
			&:hover {
				color: #b05b3b;
			}
		}

		.user-detail {
			display: none;
		}
		.user-detail.show {
			width: 13vw;
			height: 16vh;
			position: absolute;
			right: 4%;
			bottom: -140%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			overflow: hidden;

			.user-name {
				width: 100%;
				height: 30%;
				display: flex;
				align-items: center;
				color: #2a1204;
				border-bottom: 1px solid #2a1204;
				font-size: 1.5em;
				padding: .5em .5em;
				font-weight: 700;
				cursor: pointer;
			}

			.user-info {
				width: 90%;
				height: 30%;
				display: flex;
				align-items: center;
				cursor: pointer;
				color: #2a1204;
				border-bottom: 1px solid #2a1204;
				padding: 1em;
				font-size: 1em;
				transition: 0.3s;
				h4 {
					margin-left: 0.5em;
				}
				&:hover {
					background-color: #ffebc9;
				}
			}

			.sign-out {
				width: 90%;
				height: 30%;
				display: flex;
				align-items: center;
				cursor: pointer;
				color: #2a1204;
				padding: 1em;
				font-size: 1em;
				transition: 0.3s;
				h4 {
					margin-left: 0.5em;
				}
				&:hover {
					background-color: #ffebc9;
				}
			}
		}
	}

	// HEADER END

	// CONTENT START
	.todo-form {
		height: 60vh;
		width: 25vw;
		background-color: rgba(255, 255, 255, 0.6);
		box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);

		.header {
			width: 100%;
			height: 5vh;
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin: 1.5vh 0 3vh;
			a {
				width: 100%;
				height: 100%;
				font-size: 1em;
				font-weight: 600;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #2a1204;
				text-decoration: none;
				background-color: rgba(255, 255, 255, 0.6);
				box-shadow: 3px 3px 5px 0px rgba(0, 0, 0, 0.5);
				border-radius: 8px;
				margin: 0 0.7vw;
				transition: 0.3s;
			}
			.router-link-exact-active {
				color: #b05b3b;
				background-color: rgba(255, 255, 255, 0.6);
				box-shadow: inset -3px -3px 7px 0px rgba(255, 255, 255, 0.3),
					inset 3px 3px 5px 0px rgba(0, 0, 0, 0.5);
				border-radius: 8px;
				transition: 0.3s;
			}
		}
		.content {
			height: 50.5vh;
			overflow-y: scroll;
			&::-webkit-scrollbar {
				width: 6px;
				height: 6px;
			}
			&::-webkit-scrollbar-track {
				background-color: rgba(255, 255, 255, 0.6);
				border-radius: 200px;
			}
			&::-webkit-scrollbar-thumb {
				background-color: #b05b3b;
				border-radius: 200px;
			}
			:nth-child(odd):not(i):not(p) {
				background-color: rgba(255, 255, 255, 0.9);
				box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.3),
					5px 5px 5px rgba(0, 0, 0, 0.3);
			}
			:nth-child(even):not(i):not(p) {
				box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
				margin-top: 0.5vh;
			}
		}
	}

	// CONTENT END

	// ADDDIALOG START
	.addDialog {
		.dialog {
			width: 20vw;
			height: 35vh;
			background-color: #fff;
			border-radius: 10px;
			display: flex;
			align-items: center;
			justify-content: center;

			.content {
				width: 100%;
				margin-bottom: 3em;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				fieldset {
					width: 20em;
					height: 12em;
					display: flex;
					justify-content: center;
					margin-bottom: 3em;
					legend {
						background-color: #2a1204;
						color: #fff;
						padding: 0.5em;
						font-size: 1em;
						margin-left: 2em;
					}
					input {
						margin-top: 3em;
						width: 80%;
						height: 3.5em;
						border: 1px solid #2a1204;
						border-radius: 10px;
						padding-left: 0.5em;
						font-size: 1em;
						color: #2a1204;
						&:focus {
							outline: none;
						}
					}
				}
			}

			.cancel,
			.confirm {
				height: 4em;
				width: 7em;
				display: flex;
				align-items: center;
				justify-content: center;
				position: absolute;
				bottom: 10%;
				border: none;
				box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.5);
				border-radius: 8px;
				cursor: pointer;
				transition: 0.3s;

				h2 {
					font-size: 1.3em;
					font-weight: 600;
					color: #2a1204;
				}
				&:hover {
					background-color: #b05b3b;
					h2 {
						color: #fff;
					}
				}
			}

			.cancel {
				left: 20%;
				background-color: rgba(255, 255, 255, 0.6);
			}
			.confirm {
				left: 55%;
				background-color: rgba(255, 255, 255, 0.6);
			}
		}
	}

	// ADDDIALOG END
}
</style>
