import APIs from "../../api/User";
import Swal from "sweetalert2";
import router from "../../router";
import TokenService from "../../api/TokenService";
import { googleTokenLogin } from "vue3-google-login";
import axios from "axios";

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

export default {
	state: () => ({
		isEmailUsed: false,
		errors: {
			email: "",
		},
		loggedIn: TokenService.getUser() === null ? false : true,
		user: TokenService.getUser() || null,
		test2: "Lewis",
	}),

	getters: {},

	actions: {
		async registerEmailCheck({ commit }, data) {
			const response = await APIs.USER_EMAIL_CHECK({
				Email: data,
			});
			commit("REGISTER_ERROR", response);
		},
		async userSingup({ commit }, data) {
			const signupData = {
				Email: data.email,
				Name: data.username,
				Password: data.password,
			};
			const response = await APIs.USER_SIGNUP(signupData);

			if (response) {
				await Toast.fire({
					icon: "success",
					title: "Registration success",
				});
				router.replace("/");
			} else {
				Toast.fire({
					icon: "error",
					title: "Oops, please reconfirm your register form.",
				});
			}
		},
		async userSignin({ commit }, data) {
			const signinData = {
				Email: data.email,
				Password: data.password,
			};

			const response = await APIs.USER_SIGNIN(signinData);
			const { signinSuccess } = response;

			if (signinSuccess) {
				commit("SIGNIN_SUCCESS", response.data);
				router.push("/home/all");
			} else {
				return Toast.fire({
					icon: "error",
					title: "Incorrect email or password.",
				});
			}
		},
		googleSignin({ commit }) {
			googleTokenLogin().then((response) => {
				axios
					.post(import.meta.env.VITE_API_ADDRESS + '/auth/googleSignin' , {
						token: response.access_token,
					})
					.then((res) => {
						const userInfo = res.data
                        const signinSuccess = res.data.signinSuccess
                        delete userInfo['signinSuccess']

                        if (signinSuccess) {
                            commit("GOOGLE_SIGNIN_SUCCESS", userInfo);
                            router.push("/home/all");
                        } else {
                            return Toast.fire({
                                icon: "error",
                                title: "Incorrect email or password.",
                            });
                        }

					});
			});
		},
		async userSignout({ commit }) {
			const response = await APIs.USER_SIGNOUT()
			if(!response) {
				router.replace("/");
				commit("SIGNOUT");
			}
		},
		async userUpdateProfile({ commit }, data) {
			const { Email, Name } = data.value;
			const response = await APIs.USER_UPDATE_PROFILE({ Email, Name });
			const { updateSuccess } = response;
			if (updateSuccess) {
				Toast.fire({
					icon: "success",
					title: "Update profile success.",
				});
			}
			commit("USER_UPDATE_PROFILE", response.data);
		},
		async userUpdatePassword({ commit }, data) {
			const response = await APIs.USER_UPDATE_PASSWORD(data);
			if (!response) {
				return Toast.fire({
					icon: "error",
					title: "Opps! Update password failed.",
				});
			}
			await Toast.fire({
				icon: "success",
				title: "Update password success. Please Signin again ",
			});
			router.replace("/");
			commit("SIGNOUT");
		}
	},

	mutations: {
		REGISTER_ERROR(state, payload) {
			if (!payload) {
				state.isEmailUsed = false;
			} else {
				state.isEmailUsed = true;
			}
		},
		SIGNIN_SUCCESS(state, payload) {
			state.loggedIn = true;
			state.user = payload;
			TokenService.setUser(payload);
		},
		GOOGLE_SIGNIN_SUCCESS(state, payload) {
			state.loggedIn = true;
			state.user = payload;
			TokenService.setUser(payload);
		},
		SIGNOUT(state) {
			state.loggedIn = false;
			state.user = null;
			TokenService.removeUser();
		},
		USER_UPDATE_PROFILE(state, payload) {
			state.user.Email = payload.Email;
			state.user.Name = payload.Name;
			TokenService.setUser(state.user);
		}
	},
	namespaced: true,
};
