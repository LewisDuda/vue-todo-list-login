<template>
	<div class="register">
		<div class="register-form">
			<router-link class="sign-in" to="/">
				<i class="fa-solid fa-arrow-left-long"></i>
				Sign in
			</router-link>
			<h2>SIGN UP</h2>
			<div class="group">
				<h3>Email</h3>
				<input
					type="text"
					placeholder="Enter Email"
					v-model="registerForm.email"
					@keydown.tab="checkEmail"
				/>
				<p
					:class="[
						emailValid ? 'emailValid' : 'error-text emailValid',
					]"
				>
					{{ errors.email }}
				</p>
			</div>
			<div class="group">
				<h3>Username</h3>
				<input
					type="text"
					placeholder="Enter Username"
					v-model="registerForm.username"
					@click="checkEmail"
					@keydown.tab="checkUseranme"
				/>
				<p
					:class="[
						usernameValid
							? 'usernameValid'
							: 'error-text usernameValid',
					]"
				>
					{{ errors.username }}
				</p>
			</div>
			<div class="group">
				<h3>Password</h3>
				<input
					type="password"
					placeholder="Enter Password"
					v-model="registerForm.password"
					@click="checkUseranme"
					@keydown.tab="checkPassword"
				/>
				<p
					:class="[
						passwordValid
							? 'passwordValid'
							: 'error-text passwordValid',
					]"
				>
					{{ errors.password }}
				</p>
			</div>
			<div class="group">
				<h3>Confirm Password</h3>
				<input
					type="password"
					placeholder="Enter Password"
					v-model="registerForm.rePassword"
					@click="checkPassword"
				/>
				<p
					:class="[
						rePasswordValid
							? 'rePasswordValid'
							: 'error-text rePasswordValid',
					]"
				>
					{{ errors.rePassword }}
				</p>
			</div>
			<input type="submit" value="Register" @click="submit" />
		</div>
	</div>
</template>

<script>
import { ref, reactive, computed } from "@vue/runtime-core";
import store from '../store/index.js'
import Swal from "sweetalert2";

export default {
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
			timer: 2500,
			timerProgressBar: true,
		});
		const authState = store.state.auth;

		const registerForm = reactive({
			email: "",
			username: "",
			password: "",
			rePassword: "",
		});

		const emailValid = ref(true);
		const usernameValid = ref(true);
		const passwordValid = ref(true);
		const rePasswordValid = ref(true);
		const errors = reactive({
			email: "",
			username: "",
			password:
				"* Use 8 or more characters with a mix of letters, numbers, symbols & at least one uppercase letter",
			rePassword: "",
		});

		// Confirm whether the Email complies with the rules
		async function checkEmail() {
			await store.dispatch("auth/registerEmailCheck", registerForm.email);

			// Wait for the result of registerEmailCheck to assign isEmailUsed value
			const isEmailUsed = computed(() => authState.isEmailUsed);

			if (!registerForm.email) {
				errors.email = "* Email required.";
				emailValid.value = false;
			} else if (!validEmail(registerForm.email)) {
				errors.email = "* Valid email required.";
				emailValid.value = false;
			} else if (isEmailUsed.value) {
				errors.email = "* This email is occupied.";
				emailValid.value = false;
			} else {
				errors.email = "";
				emailValid.value = true;
			}
		}

		// Confirm whether the Email and Username complies with the rules
		function checkUseranme() {
			checkEmail();
			if (!registerForm.username) {
				errors.username = "* Username required.";
				usernameValid.value = false;
			} else {
				errors.username = "";
				usernameValid.value = true;
			}
		}

		// Confirm whether the Email, Username and Password complies with the rules
		function checkPassword() {
			checkUseranme();
			if (!registerForm.password) {
				errors.password = "* Password required.";
				passwordValid.value = false;
			} else if (!validPassword(registerForm.password)) {
				errors.password =
					"* Use 8 or more characters with a mix of letters, numbers, symbols & at least one uppercase letter";
				passwordValid.value = false;
			} else {
				errors.password = "";
				passwordValid.value = true;
			}
		}

		// Confirm whether the Confirm Password complies with the rules
		function checkRePassword() {
			if (!registerForm.rePassword) {
				errors.rePassword = "* Confirm Password required.";
				rePasswordValid.value = false;
			} else if (!validRePassword(registerForm.rePassword)) {
				errors.rePassword =
					"* Those passwords didn't match. Try again.";
				rePasswordValid.value = false;
			} else {
				errors.rePassword = "";
				rePasswordValid.value = true;
			}
			
		}

		// Finally confirm whether the Email, Username, Password and RePassword conform to the rules
		//and then send the register form
		async function submit() {
			checkRePassword()

			if (
				!emailValid.value ||
				!usernameValid.value ||
				!passwordValid.value ||
				!rePasswordValid.value
			) {
				return Toast.fire({
					icon: "error",
					title: "Oops, please reconfirm your register form.",
				});
			}	

			store.dispatch("auth/userSingup", registerForm);

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
		function validRePassword(rePassword) {
			const re = registerForm.password;
			return rePassword === re ? true : false;
		}

		return {
			emailValid,
			usernameValid,
			passwordValid,
			rePasswordValid,
			registerForm,
			errors,
			checkEmail,
			checkUseranme,
			checkPassword,
			submit,
		};
	},
};
</script>

<style lang="scss">
* {
	padding: 0;
	margin: 0;
	list-style: none;
}

.register {
	width: 100vw;
	height: 100vh;
	background: url("../assets/loginBackground.jpg");
	background-size: 100% 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	filter: grayscale(20%);
	.register-form {
		width: 25vw;
		height: 80vh;
		background-color: rgba(255, 255, 255, 0.3);
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(50px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		position: relative;

		.sign-in {
			display: flex;
			align-items: center;
			position: absolute;
			text-decoration: none;
			left: 0.7em;
			top: 0.7em;
			color: #2a1204;
			font-size: 1em;
			cursor: pointer;
			transition: 0.3s;
			&:hover {
				color: #b05b3b;
			}

			.fa-arrow-left-long {
				margin-right: 0.3em;
			}
		}

		h2 {
			color: #2a1204;
			font-size: 3em;
			font-weight: 900;
			margin-bottom: 1.5em;
		}

		.group {
			width: 80%;
			margin-bottom: 1.5em;
			h3 {
				color: #2a1204;
				font-size: 1.5em;
				font-weight: 600;
				margin-bottom: 0.5em;
			}
			input {
				width: 100%;
				border: none;
				border-bottom: 1px solid #2a1204;
				background: transparent;
				color: #2a1204;
				outline: none;
				height: 2em;
				font-size: 1em;
				font-weight: 300;
				margin-top: 0.5em;

				&::placeholder {
					color: #444;
				}
			}
			p {
				font-size: 1em;
				font-weight: 700;
			}
			.emailValid,
			.usernameValid,
			.rePasswordValid {
				height: 0.5em;
				margin-top: 0.5em;
			}
			.passwordValid {
				width: 100%;
				height: 1em;
				margin: 0.5em 0;
				color: rgba(42, 18, 4, 0.5);
			}
			.error-text {
				color: rgb(218, 18, 18);
			}
		}

		input[type="submit"] {
			width: 80%;
			height: 2em;
			border: none;
			border-radius: 50px;
			background-color: #2a1204;
			color: #fff;
			font-size: 1.5em;
			font-weight: 600;
			cursor: pointer;
			transition: 0.3s;
			margin-top: 0.5em;
			&:hover {
				background-color: #b05b3b;
			}
		}
	}
}
</style>
