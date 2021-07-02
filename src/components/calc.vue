<template>
    <div>
        <h1>{{title}}</h1>
        <div class="display">
            <input v-model.number="operand1" placeholder="0" />
            <input v-model.number="operand2" placeholder="0" />
            = {{result}}
        </div>
        <div class="keyboard">
            <button @click="sum">+</button>
            <button @click="ext">-</button>
            <button @click="div">/</button>
            <button @click="mul">*</button>
            <button @click="pow">^</button>
            <button @click="trunc">\</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'calc',
    data() {
        return {
            operand1: "",
            operand2: "",
            result: 0,
            title: "Калькулятор"
        }
    },
    methods: {
        sum: function() {
            this.result = this.operand1 + this.operand2
        },
        ext: function() {
            this.result = this.operand1 - this.operand2
        },
        div: function() {
            this.result = this.operand1 / this.operand2
        },
        mul: function() {
            this.result = this.operand1 * this.operand2
        },
        trunc: function() {
            this.result = Math.trunc(this.operand1 / this.operand2)
        },
        pow: function() {
            this.result = Math.pow(this.operand1, this.operand2)
        },
    }

}
</script>
<style scoped lang="scss">
.display {
    max-width: 600px;
    font-size: 30px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 30px;
}

input {
    height: 30px;
    max-width: 100px;
    font-size: 25px;
    padding: 5px;
}

button {
    height: 50px;
    width: 50px;
    cursor: pointer;
    border: 1px solid;
    background-color: lightblue;
    color: white;
    font-size: 30px;
    padding: 10px;
}
</style>