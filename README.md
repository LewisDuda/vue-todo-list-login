# Todo List with JWT
This web application is built with **Frontend**: Vue3 + Vite, **Backend**: Node.js + Express, **Database**: Firebase, allowing you to easily log, view and manage your tasks using your personal account or Google account.


### Features of this project
**To enhance security**
- Use JWT(Jsonwebtoken) when exchanging data with the backend to improve data security.


**To enhance convenience**
- Use Google OAuth 2.0 Login to eliminate the process of registering an account and increase convenience.

___

## Project Features
>- Register an account
>> User fills in email, username, password to register an account.

>- Log in with email
>> User can use the registered email to log in to the account.

>- Log in with Google account
>> User can use Google account to log in to the account.

>- Log out
>> Users can use the log out of the account with confidence.

>- View all todos of user
>> Users can view all todos after logging in with account.

>- Create todo of user
>> Users can create todo after logging in with account.

>- Edit todo of user
>> Users can edit todo after logging in with account.

>- Fiter todos of user
>> User can view the categories according to the completion progress,<br> which are All todos, Active todos, and Completed todos.

>- 404(Page not found)
>> User can get error messages when travel to pages that don't exist.

___

## Project Demo
[https://lewisduda.github.io/vue-todo-list-login/](https://lewisduda.github.io/vue-todo-list-login/)

If you don't want to sign up for a new account, consider using the following guest account to experience this project.

**Email**: Guest@mail.com
**Password**: Guest1234


___
## Prerequisites for this project
**Install the backend app**
- [App Backend](https://github.com/LewisDuda/express-firebase)

```
$ git clone https://github.com/LewisDuda/express-firebase.git
```


**Google OAuth 2.0**

&emsp;Please refer to the following URL to generate a Google OAuth 2.0 API key.
- [How to generate a Google OAuth 2.0 API key](https://medium.com/@lewisduda46/%E7%AD%86%E8%A8%98-%E5%9C%A8vue3%E5%B0%88%E6%A1%88%E4%B8%AD%E5%8A%A0%E5%85%A5-google%E7%99%BB%E5%85%A5-%E7%9A%84%E5%8A%9F%E8%83%BD-397403182378)

___

## Install this project
If you need a copy of this project and run it locally on your computer please see the instructions below.


### Clone Project

```
$ git clone https://github.com/LewisDuda/vue-todo-list-login.git
```


### Usage Packages

- [npm](https://docs.npmjs.com/)
- [vue-router](https://www.npmjs.com/package/vue-router)
- [vuex](https://www.npmjs.com/package/vuex)
- [axios](https://www.npmjs.com/package/axios)
- [sweetalert2](https://www.npmjs.com/package/sweetalert2)
- [vue-writer](https://www.npmjs.com/package/vue-writer)
- [vue3-google-login](https://www.npmjs.com/package/vue3-google-login)


### Setup App

**1. Install npm**

```
$ npm install
```

**2. Create .env file**

```
$ touch .env
```

**3. Write your API ADDRESS and GOOGLE_CLIENT_ID into .env file and save.**

```
// Use environment variables in VITE as follows.
// You must prefix your own environment variable with VITE_
// VITE_EXAMPLE_VARIABLE = YOUR_VALUE 

VITE_API_ADDRESS = <YOUR_API_ADDRESS>
VITE_GOOGLE_CLIENT_ID = <YOUR_GOOGLE_CLIENT_ID>

// Import your environment variables in VITE
// const variables = import.meta.env.VITE_EXAMPLE_VARIABLE
```

**4. Start the App**

```
$ npm run dev
```

**5. Finding the following message indicates the App is running successfully.**

```
vite v2.9.14 dev server running at:
> Local: http://localhost:3000/
```

___


## Project production experience
[Vue3 TodoList with google Login and JWT authentication](https://medium.com/@lewisduda46/%E7%AD%86%E8%A8%98-%E5%9C%A8vue3-vite%E5%B0%88%E6%A1%88%E4%B8%AD%E5%8A%A0%E5%85%A5google-login%E6%8F%90%E5%8D%87%E4%BE%BF%E5%88%A9%E6%80%A7-%E4%BB%A5%E5%8F%8A%E4%BD%BF%E7%94%A8jwt%E6%8F%90%E5%8D%87%E8%A8%8A%E6%81%AF%E5%82%B3%E9%81%9E%E7%9A%84%E5%AE%89%E5%85%A8%E6%80%A7-44d7c3600d7a)
___


## Author
[Lewis](https://github.com/LewisDuda)
