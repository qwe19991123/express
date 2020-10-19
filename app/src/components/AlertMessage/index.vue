<template>
<div>
     <div class="alert-container" v-show="visible">
     </div>
     <div class="alertMessage" v-show="visible">
             <div class="msg">
            <p style="color:black; font-size:15px; padding:0 20px;">{{title}}</p>
            <p style="color:gray; padding:0 20px;">{{content}}</p>
            <p class="submit" @click="handleVisible" style="color:blue; font-size:20px">确定</p>
        </div>
     </div>
</div>
</template>

<script>
    export default {
        name: 'AlertMessage',
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ""
            },
            content: {
                type: String,
                default: ""
            }
        },
        methods: {
            handleVisible() {
                this.$emit("update:visible", false)
            }
        }

    }
</script>

<style lang="scss" scoped>
    .alert-container {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: 0.5;
        background: gray;
    }

    .alertMessage {
        height: 10rem;
        width: 20rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 20px;

        p {
            text-align: center;
            margin-top: 10px;
        }

        .msg {
            margin-top: 40px;
        }

        .submit {
            border-top: gray 1px solid;
            width: 90%;

            padding-top: 10px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
</style>