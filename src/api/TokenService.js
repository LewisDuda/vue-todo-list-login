export default {
    getLocalReFreshToken () {
        const user = JSON.parse(localStorage.getItem("user"))
        return user.RefreshToken
    },
    getLocalAccessToken () {
        const user = JSON.parse(localStorage.getItem("user"))
        return user.AccessToken
    },
    updateLocalAccessToken (token) {
        const user = JSON.parse(localStorage.getItem("user"))
        const { accessToken, refreshToken } = token;
        user.AccessToken = accessToken
        user.RefreshToken = refreshToken
        localStorage.setItem("user", JSON.stringify(user))
    },
    getUser () {
        return JSON.parse(localStorage.getItem("user"))
    },
    setUser (user) {
        localStorage.setItem("user", JSON.stringify(user))
    },
    removeUser () {
        localStorage.removeItem("user")
    }
}