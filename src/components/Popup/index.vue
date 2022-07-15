<script>
export default {
    props:[
        "showDialog",
        "cancelText",
        "confirmText",
        "overlay"
    ],
    emits:[
        'cancel',
        'confirm',
    ],  
    setup() {

    }
}
</script>
<template src="./template.html"></template>
<style src="./style.scss"></style>