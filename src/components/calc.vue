<template>
	<div>
		<h1>{{title}}</h1>
		<div class="display">
			<input v-model.lazy="operand1" placeholder="0">
			<input v-model.lazy="operand2" placeholder="0">
			= {{result}}
		</div>
		<div v-show="error" class="error">Ошибка! {{ error }}</div>
		<div class="keyboard">

		<button 
            v-for="operand in operands" 
            :key="operand"
            :disabled = "operand1 === '' || operand2 === ''"
            @click="calculate(operand)">
            {{operand}}
        </button>

    </div> 
    <p class="checkbox">
        <input type="checkbox" id="checkbox" v-model="checked">
        <label for="checkbox">Отобразить экранную клавиатуру</label>
    </p>
    <div class="keybord" v-show="checked === true">
     <button
     v-for="key in keyboard" 
     :key="key"
     @click="(key !== '<=') ? typeform(key) : clear()"
     >{{key}}
    </button>
    <div class="radio">
    <input type="radio" id="one" value="one" v-model="picked">
    <label for="one">Операнд 1</label>
    <input type="radio" id="two" value="two" v-model="picked">
    <label for="two">Операнд 2</label>
    </div>
</div>
  <!--   <p v-bind="operand1">{{operand1}}</p>
    <p v-bind="operand2">{{operand2}}</p> -->
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
            title: "Калькулятор",
            error: '',
            operands : ['+', '-', '/', '*', 'pow', 'trunc'],
            checked: false,
             keyboard: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "<="],
            picked: '',
          
        }
    },
    methods: {
      calculate (operation = '+') {
         this.error = '';
         switch (operation) {
            case '+':
            this.result = +this.operand1 + +this.operand2;
            break;
            case '-':
            this.result = this.operand1 - this.operand2;
            break;
            case '*':
            this.result = this.operand1 * this.operand2
            break;
            case '/':
				if (this.operand2 === 0) {
					this.error = 'Делить на 0 нельзя!';
					break;
				} else {
					this.result = this.operand1 / this.operand2;
					break;
				}
			case 'pow':
            this.result = Math.pow(this.operand1, this.operand2);
            break;
            case 'trunc':
            this.result = Math.trunc(this.operand1 / this.operand2);
            break;
            }
        },
        typeform(key){
          
            if (this.picked === "one"){
                this.operand1 += key; 
            } else {
                this.operand2 += key;
            }
        },

        clear(){
            if (this.picked === "one"){
                this.operand1 = this.operand1.slice(0,-1); 
            } else {
                this.operand2 = this.operand2.slice(0,-1);
            }
        }

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
     margin-bottom: 50px;
 }

 input {
     height: 30px;
     max-width: 100px;
     font-size: 25px;
     padding: 5px;
 }

 button {
     height: 50px;
     min-width: 50px;
     cursor: pointer;
     border: 1px solid;
     background-color: lightblue;
     color: white;
     font-size: 30px;
     padding: 5px;
 }
 .error{
     height:50px;
     color:red;
     font-weight:900;
 }
 button[disabled ='disabled']{
    background-color:lightgrey;
    cursor:not-allowed;
}
.checkbox, .radio{
    display:flex;
    justify-content:center;
    align-items:center;
}
</style>