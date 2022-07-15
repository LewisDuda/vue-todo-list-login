import axios from "axios";
import TokenService from "./TokenService";
import router from "../router";
import APIs from "../api/User";


const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_ADDRESS,
	headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
	(config) => {
		if (
			config.url == "/auth/signin" ||
			config.url == "/auth/googleSignin" ||
			config.url == "/auth/register/checkEmail" ||
			config.url == "/auth/signup"
		) {
			return config;
		}
		const token = TokenService.getLocalAccessToken();
		if (token) {
			config.headers.Authorization = "Bearer" + " " + token;
			return config;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (err) => {
		const originalConfig = err.config;

		if (
			originalConfig.url != "/auth/signin" &&
			originalConfig.url != "/auth/googleSignin" &&
			originalConfig.url != "/auth/register/checkEmail" &&
			originalConfig.url != "/auth/signup" &&
			err.response
		) {
			// Access Token was expired
			if (err.response.status === 401 && !originalConfig._retry) {
				originalConfig._retry = true;

				try {
					// Use refreshToken get accessToken
					const response = await axiosInstance.post("/auth/token", {
						refreshToken: TokenService.getLocalReFreshToken(),
					});

					const { loggedIn, accessToken, refreshToken } = response.data
					const token = { accessToken, refreshToken }

					if(!loggedIn){
						alert("You have been idle for too long, please signin again.")

						const response = await APIs.USER_SIGNOUT()
						if(!response) {
							router.replace("/");
							TokenService.removeUser();
						}
					}
					TokenService.updateLocalAccessToken(token);

					return axiosInstance(originalConfig);
				} catch (_error) {
					return Promise.reject(_error);
				}
			}
		}

		return Promise.reject(err);
	}
);

export default axiosInstance;