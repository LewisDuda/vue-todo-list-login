<template>
	<div class="login">
		<div class="login-form">
			<h2>SIGN IN</h2>
			<div class="group">
				<h3>Email</h3>
				<input
					type="text"
					placeholder="Enter Email"
					v-model="loginForm.email"
				/>
			</div>
			<div class="group">
				<h3>Password</h3>
				<input
					type="password"
					placeholder="Enter Password"
					v-model="loginForm.password"
				/>
			</div>
			<div class="btn-group">
				<input type="submit" value="Login" @click="submit" />
				<div class="separate-line">
					<small>or</small>
				</div>
				<div class="google-btn">
					<i class="fab fa-google"></i>
					<input type="button" value="Sign in with Google" @click="googleSignin"/>
				</div>
			</div>
			<router-link class="register-href" to="/register">Don't have an account?</router-link>
		</div>
	</div>
</template>

<script>
import { reactive } from "@vue/runtime-core";
import store from '../store/index.js'
import Swal from "sweetalert2";

export default {
	setup() {
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

		const loginForm = reactive({
			email: "guest@mail.com",
			password: "Guest1234",
		});

		function submit() {
			if (!loginForm.email || !loginForm.password) {
				return Toast.fire({
					icon: "error",
					title: "Oops, please reconfirm your login form.",
				});
			} else {
				store.dispatch("auth/userSignin", loginForm);
			}
		}

		function googleSignin() {
			store.dispatch('auth/googleSignin')
		}

		return {
			loginForm,
			submit,
			googleSignin,
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

.login {
	width: 100vw;
	height: 100vh;
	background: url("../assets/loginBackground.jpg");
	background-size: 100% 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	filter: grayscale(20%);
	.login-form {
		width: 20vw;
		height: 60vh;
		background-color: rgba(255, 255, 255, 0.3);
		box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(50px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		h2 {
			color: #2a1204;
			font-size: 3em;
			font-weight: 900;
			margin: 1em 0;
		}
		.group {
			width: 80%;
			margin-bottom: 2em;
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
			}
		}
		.btn-group {
			width: 80%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-top: 1em;

			input[type="submit"] {
				width: 100%;
				height: 2em;
				border: none;
				border-radius: 50px;
				background-color: #2a1204;
				color: #fff;
				font-size: 1.5em;
				font-weight: 600;
				cursor: pointer;
				transition: 0.3s;
				&:hover {
					background-color: #b05b3b;
				}
			}

			.separate-line {
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				margin: 0.5em 0;
				small {
					font-size: 1.5em;
				}
				&::before {
					content: "";
					height: 0.005em;
					width: 40%;
					background-color: #2a1204;
					position: absolute;
					left: 3%;
					top: 55%;
				}
				&::after {
					content: "";
					height: 0.005em;
					width: 40%;
					background-color: #2a1204;
					position: absolute;
					right: 3%;
					top: 55%;
				}
			}

			.google-btn {
				width: 100%;
				height: 2em;
				border: none;
				border-radius: 50px;
				background-color: #2a1204;
				color: #fff;
				font-size: 1.5em;
				font-weight: 600;
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: 0.3s;
				&:hover {
					background-color: #b05b3b;
				}

				input[type="button"] {
					width: 80%;
					height: 2em;
					font-size: 1em;
					color: #fff;
					background-color: transparent;
					border: none;
					cursor: pointer;
				}
			}
		}
		.register-href {
			margin: 1em 0;
			text-decoration: none;
			margin-bottom: 0.3em;
			color: #2a1204;
			font-size: 1em;
			font-weight: 500;
			&:hover {
				color: #865439;
			}
		}
	}
}
</style>
