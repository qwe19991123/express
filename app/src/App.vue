<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html{
            height: 100%;
            overflow: hidden;//overflow去掉滚动条
        }

        body{
            height: 100%;
        }  
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
