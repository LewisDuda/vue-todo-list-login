import api from "./Api.js";
import TokenService from "../api/TokenService";

const USER_ENDPOINT = "/auth";

export default {
	USER_EMAIL_CHECK(data) {
		return api
			.post(USER_ENDPOINT + "/register/checkEmail", data)
			.then((res) => {
				return res.data.isEmailTaken;
			});
	},
	USER_SIGNUP(data) {
		return api
			.post(USER_ENDPOINT + "/signup", data)
			.then((res) => {
				const signupSuccess = res.data.signupSuccess;
				return signupSuccess;
			})
			.catch((error) => {
				const signupSuccess = error.response.data.signupSuccess;
				return signupSuccess;
			});
	},
	USER_SIGNIN(data) {
		return api
			.post(USER_ENDPOINT + "/signin", data)
			.then((res) => {
				const signinSuccess = res.data.signinSuccess;
				const data = res.data;
				delete data["signinSuccess"];
				return { data, signinSuccess };
			})
			.catch((error) => {
				const signinSuccess = error.response.data.signinSuccess;
				return signinSuccess;
			});
	},
	USER_SIGNOUT() {
		return api
			.post(USER_ENDPOINT + "/signout", { RefreshToken : TokenService.getLocalReFreshToken() })
			.then((res) => {
				const { loggedIn } = res.data
				return loggedIn
			})
	},
	USER_UPDATE_PROFILE(data) {
		return api
			.post(USER_ENDPOINT + "/update/profile", data)
			.then((res) => {
				const updateSuccess = res.data.updateSuccess;
				const data = res.data;
				delete data["updateSuccess"];
				return { data, updateSuccess };
			})
			.catch((error) => {
				const updateSuccess = error.response.data.updateSuccess;
				return updateSuccess;
			});
	},
	USER_UPDATE_PASSWORD(data) {
		return api
			.post(USER_ENDPOINT + "/update/password", data)
			.then((res) => {
				const updateSuccess = res.data.updateSuccess;
				return updateSuccess;
			})
			.catch((error) => {
				const updateSuccess = error.response.data.updateSuccess;
				return updateSuccess;
			});
	}
};
