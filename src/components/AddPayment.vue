<template>
    <div>
        <button @click="showForm">{{title}}</button>
        <div v-show="toggle" class="form">
            <input v-model="date" placeholder="Payment date" />
            <input v-model.trim="category" placeholder="Payment description" />
            <input v-model.number="value" type="number" placeholder="Payment amount" />
            <button @click="onClick">Add +</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "AddPayment",
    data() {
        return {
            date: "",
            category: "",
            value: null,
            toggle: false,
            title: "ADD NEW COST +"
        }
    },
    methods: {
        showForm() {
            this.toggle = !this.toggle;
            if (this.title == "ADD NEW COST +") {
                this.title = "CLOSE"
            } else {
                this.title = "ADD NEW COST +"
            }

        },
        onClick() {
            const { category, value } = this
            const data = {
                date: this.date || this.getCurrentDate,
                category,
                value
            }
            //Вызов события, название события и аргументы
            this.$emit('addNewPayment', data)
        }
    },
    computed: {
        getCurrentDate() {
            const today = new Date();
            const d = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate();
            const m = ((today.getMonth() + 1) < 10) ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
            const y = today.getFullYear();
            return `${d}.${m}.${y}`;
        }
    },
}
</script>
<style scope>
button {
    height: 40px;
    width: 150px;
    border: none;
    padding: 10px;
    color: white;
    font-weight: 800;
    background-color: #25a79a;
    cursor: pointer;
}

.form {
    position: absolute;
    bottom: 50px;
    height: 300px;
    width: 500px;
    box-shadow: 3px 2px 5px 7px lightgray;
    padding: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

}

input {
    height: 40px;
    border-color: lightgray;
    padding-left: 10px;
}
</style>