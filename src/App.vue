<template>
    <div id="app">
        <calc />
    </div>
</template>
<script>
import calc from './components/calc.vue'

export default {
    name: 'App',
    components: {
        // HelloWorld,
        calc
    }
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>