<template>
	<div class="not-found-page">
        <h1 class="title">Opps...<br>Page not found</h1>
		<h1 class="left-4">4</h1>
		<h1 class="right-4">4</h1>
        <router-link to="/" class="return-btn">SIGN IN</router-link>
	</div>
</template>
<style lang="scss">
    * {
        padding: 0;
        margin: 0;
    }
    .not-found-page {
        width: 100vw;
        height: 100vh;
        background: url("../assets/404background.jpg");
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .title{
            position: absolute;
            top: 5%;
            font-size: 4em;
            color: #fff;
            text-align: center;
            text-shadow: 10px 10px 15px rgba(0,0,0,0.7);
        }

        .left-4,
        .right-4{
            display: flex;
            justify-content: center;
            position: absolute;
            font-size: 25em;
            font-weight: 1100;
            top: 20%;
            color: #fff;
            text-shadow: 10px 10px 15px rgba(0,0,0,0.7);
        }
        .left-4{
            left: 25%;
        }
        .right-4{
            right: 28%;
        }
        .return-btn{
            width: 8em;
            height: 3em;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            border-radius: 10em;
            border: none;
            background-color: #2a1204;
            color: #fff;
            font-size: 2em;
            box-shadow: 5px 10px 10px rgba(0,0,0,0.7);
            cursor: pointer;
            position: absolute;
            top: 75%;
            left: 43%;
            transition: .3s;

            &:hover{
                background-color: #b05b3b;
            }
        }
    }
</style>
