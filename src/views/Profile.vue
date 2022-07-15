<template>
	<div class="profile">
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
			<div class="user-icon" @click="showDetail">
				<i class="fa-solid fa-user-large"></i>
			</div>
			<div class="user-detail" :class="{ show: isUserDetail }">
				<router-link to="/home/all" class="user-name">{{ username }}</router-link>
				<router-link to="/profile" class="user-info">
					<i class="fa-solid fa-address-card"></i>
					<h4>Your Profile</h4>
				</router-link>
				<a class="sign-out" @click="singout">
					<i class="fa-solid fa-right-from-bracket"></i>
					<h4>Sign out</h4>
				</a>
			</div>
		</header>
		<div class="profile-form">
			<article
				class="email"
				:class="[isEdit.Password ? 'editPassword' : '']"
			>
				<h3>Email:</h3>
				<input
					type="text"
					v-if="isEdit.Email"
					v-model="edit.Email"
					placeholder="Please Enter your new email..."
					@keyup.enter="confirmEditEmail"
					@keyup.esc="cancelEditEmail"
				/>
				<p v-else>{{ user.Email }}</p>
				<div class="editBtn-gruop" v-if="isEdit.Email">
					<i
						class="fa-solid fa-rectangle-xmark"
						@click="cancelEditEmail"
					></i>
					<i
						class="fa-solid fa-square-check"
						@click="confirmEditEmail(user)"
					></i>
				</div>
				<i
					class="fa-solid fa-pen-nib"
					@click="editEmailHandler"
					v-else
				></i>
			</article>
			<article
				class="username"
				:class="[isEdit.Password ? 'editPassword' : '']"
			>
				<h3>Username:</h3>
				<input
					type="text"
					v-if="isEdit.Username"
					v-model="edit.Username"
					placeholder="Please Enter your new username..."
					@keyup.enter="confirmEditUsername"
					@keyup.esc="cancelEditUsername"
				/>
				<p v-else>{{ user.Name }}</p>
				<div class="editBtn-gruop" v-if="isEdit.Username">
					<i
						class="fa-solid fa-rectangle-xmark"
						@click="cancelEditUsername"
					></i>
					<i
						class="fa-solid fa-square-check"
						@click="confirmEditUsername"
					></i>
				</div>
				<i
					class="fa-solid fa-pen-nib"
					@click="editUsernameHandler"
					v-else
				></i>
			</article>
			<article
				class="password"
				:class="[(isEdit.Password) ? 'editPassword' : '']"
			>
				<div class="detail" v-if="isEdit.Password">
					<h3 class="title">Change password</h3>
					<div class="sub-detail">
						<h3>Old password:</h3>
						<input class="old-password" type="password"  v-model="edit.OldPassword"/>
					</div>
					<div class="sub-detail">
						<h3>New password:</h3>
						<input class="new-password" type="password" v-model="edit.NewPassword"/>
					</div>
					<div class="sub-detail">
						<h3>Confirm new password:</h3>
						<input class="confirm-password" type="password" v-model="edit.ConfirmNewPassword"/>
					</div>
				</div>
				<div v-else>
					<h3>Password:</h3>
					<input type="password" value="password" disabled/>
				</div>
				<div class="passwordBtn-gruop" v-if="isEdit.Password">
					<button class="cancel" @click="cancelEditPassword">
						cancel
					</button>
					<button class="confirm" @click="confirmEditPassword">
						confirm
					</button>
				</div>
				<i
					class="fa-solid fa-pen-nib"
					@click="editPasswordHandler"
					v-else
				></i>
			</article>
		</div>
	</div>
</template>

<script>
import { ref, computed, reactive } from "@vue/runtime-core";
import store from '../store/index.js'
import VueWriter from "vue-writer";
import Swal from "sweetalert2";

export default {
	components: {
		VueWriter,
	},
	directives: {
		focus: {
			mounted(el) {
				el.focus();
			},
		},
	},
	setup() {
		// Sweetalert2 options
		const Toast = Swal.mixin({
			toast: true,
			position: "top",
			iconColor: "white",
			customClass: {
				popup: "colored-toast",
			},
			showConfirmButton: false,
			timer: 5000,
			timerProgressBar: true,
		});		
		const authState = store.state.auth;

		const isUserDetail = ref(false);
		const user = computed(() => authState.user);
		const username = computed(() => authState.user.Name).value;
		const welcomeArr = [
			"Hello " + username + ", would you like to change your profile?",
		];

		const isEdit = reactive({
			Email: false,
			Username: false,
			Password: false,
		});
		const edit = reactive({
			Email: "",
			Username: "",
			OldPassword: "",
			NewPassword: "",
			ConfirmNewPassword: ""
		});

		function showDetail() {
			isUserDetail.value =
				isUserDetail.value == false
					? (isUserDetail.value = true)
					: (isUserDetail.value = false);
		}

		function singout() {
			store.dispatch("auth/userSignout");
		}

		function editEmailHandler() {
			isEdit.Email = true;
		}

		async function confirmEditEmail() {
			await store.dispatch("auth/registerEmailCheck", edit.Email);
			
			// Wait for the result of registerEmailCheck to assign isEmailUsed value
			const isEmailUsed = computed(() => authState.isEmailUsed);			

			if(!edit.Email) {
				return Toast.fire({
					icon: "error",
					title: "Oops, Email required.",
				});
			}
			if(!validEmail(edit.Email)){
				return Toast.fire({
					icon: "error",
					title: "Valid email required.",
				}); 
			}
			if(isEmailUsed.value) {
				return Toast.fire({
					icon: "error",
					title: "This email is occupied.",
				}); 				
			}
			user.value.Email = edit.Email
			store.dispatch('auth/userUpdateProfile', user)
			isEdit.Email = false
			edit.Email = ""
		}

		function cancelEditEmail() {
			isEdit.Email = false;
			edit.Email = "";
		}

		function editUsernameHandler() {
			isEdit.Username = true;
		}

		function confirmEditUsername() {
			if(!edit.Username){
				return Toast.fire({
					icon: "error",
					title: "Oops, Username required.",
				}); 
			}
			user.value.Name = edit.Username;
			store.dispatch('auth/userUpdateProfile', user)
			isEdit.Username = false;
			edit.Username = ""
		}

		function cancelEditUsername() {
			isEdit.Username = false;
			edit.Username = ""
		}

		function editPasswordHandler() {
			isEdit.Password = true;
		}

		function confirmEditPassword() {
			if(!edit.OldPassword || !edit.NewPassword || !edit.ConfirmNewPassword){
				return Toast.fire({
					icon: "error",
					title: "Oops, Old password, New password and Confirm new password is required.",
				});					
			}
			if(edit.OldPassword == edit.NewPassword){
				return Toast.fire({
					icon: "error",
					title: "Oops, Old password and New password can not be the same.",
				});					
			}
			if(!validPassword(edit.NewPassword)){
				return Toast.fire({
					icon: "error",
					title: "Oops, please reconfirm your New password.Please use 8 or more characters with a mix of letters, numbers, symbols & at least one uppercase letter",
				});				
			}
			if(!validRePassword(edit.ConfirmNewPassword)) {
				return Toast.fire({
					icon: "error",
					title: "Oops, please reconfirm your New password or Confirm new password.",
				});
			}
			const modifyData = {
				OldPassword : edit.OldPassword,
				NewPassword : edit.NewPassword,
			}
			store.dispatch('auth/userUpdatePassword', modifyData)
			isEdit.Password = false;
			edit.OldPassword = ""
			edit.NewPassword = ""
			edit.ConfirmNewPassword = ""
		}
		
		function cancelEditPassword() {
			isEdit.Password = false;
		}

		// Email Rules
		function validEmail(email) {
			const re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

		// Password Rules
		function validPassword(password) {
			const re = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
			return re.test(password);
		}		

		// Confirm Password Rules
		function validRePassword(confirmPassword) {
			const re = edit.NewPassword;
			return confirmPassword === re ? true : false;
		}		


		return {
			isUserDetail,
			username,
			welcomeArr,
			user,
			isEdit,
			edit,
			showDetail,
			singout,
			editEmailHandler,
			confirmEditEmail,
			cancelEditEmail,
			editUsernameHandler,
			confirmEditUsername,
			cancelEditUsername,
			editPasswordHandler,
			cancelEditPassword,
			confirmEditPassword,
		};
	},
};
</script>

<style lang="scss">
.profile {
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

		.user-icon {
			position: absolute;
			right: 10%;
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
				padding: 0.5em 0.5em;
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
	.profile-form {
		height: 60vh;
		width: 25vw;
		background-color: rgba(255, 255, 255, 0.6);
		box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		overflow: hidden;

		article {
			width: 93%;
			height: 16.5vh;
			padding: 1em 1.5em;
			border-bottom: 1px solid #a38c7f;
			position: relative;
			color: #2a1204;
			display: flex;
			align-items: center;
			transition: 0.3s;

			h3 {
				padding-right: 1.5em;
				font-weight: 300;
			}

			p {
				font-size: 1.5em;
				font-weight: 600;
			}

			input {
				width: 55%;
				height: 35%;
				font-size: 1em;
				border: none;
				background-color: transparent;

				&:focus {
					outline: none;
				}
			}

			i {
				position: absolute;
				cursor: pointer;
			}

			.editBtn-gruop {
				display: flex;
				align-items: center;
				justify-content: center;

				.fa-square-check,
				.fa-rectangle-xmark {
					font-size: 1.5em;
					transition: 0.3s;

					&:hover {
						color: #b05b3b;
					}
				}

				.fa-square-check {
					right: 8%;
				}

				.fa-rectangle-xmark {
					right: 15%;
					color: #b5aca6;
				}
			}

			.fa-pen-nib {
				right: 10%;
			}
		}

		.password {
			border-bottom: none;

			div {
				display: flex;
				align-items: center;
			}
		}

		.email.editPassword,
		.username.editPassword {
			height: 6vh;
			transition: 0.3s;
		}

		.password.editPassword {
			width: 100%;
			height: 35vh;
			display: flex;
			align-items: flex-start;
			border-bottom: none;
			position: relative;
			transition: 0.3s;

			.detail {
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;

				.title {
					font-size: 1.5em;
					font-weight: 600;
					margin-bottom: 0.5em;
				}

				.sub-detail {
					width: 100%;
					height: 25%;
					position: relative;

					h3 {
						font-size: 1em;
						font-weight: 600;
					}

					input {
						height: 20%;
						width: 50%;
						padding: 0.5em;
						border: 1px solid #2a1204;
						border-radius: 5px;
						position: absolute;
						right: 8%;
						color: #2a1204;
					}
				}
			}
		}

		.passwordBtn-gruop {
			width: 100%;
			position: absolute;
			bottom: -1%;
			left: -3%;
			display: flex;
			justify-content: center;

			button {
				width: 5em;
				height: 3em;
				border: none;
				cursor: pointer;
				border-radius: 5px;
				font-weight: 600;
				color: #2a1204;
				transition: 0.3s;

				&:hover {
					background-color: #b05b3b;
				}
			}

			.cancel {
				margin-right: 3em;
				background-color: #ded7d2;
			}

			.confirm {
				color: #fff;
				background-color: #2a1204;
			}
		}
	}

	// CONTENT END
}
</style>
