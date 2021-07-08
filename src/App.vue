<template>
    <div id="app">
        <header>
            <h1>My personal cost</h1>
        </header>
        <main>
            <AddPayment @addNewPayment="addData" />
            <PaymentsDisplay :list="paymentsList" />
        </main>
    </div>
</template>
<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import AddPayment from "./components/AddPayment.vue";

export default {
    name: "App",
    components: {
        PaymentsDisplay,
        AddPayment
    },
    data: () => ({
        paymentsList: [],

    }),
    methods: {
        addData(data) {
            this.paymentsList.push(data);
        },
        fetchData() {
            return [{
                    date: "28.03.2020",
                    category: "Food",
                    value: 169
                },
                {
                    date: "20.04.2021",
                    category: "Sport",
                    value: 400
                },
                {
                    date: "28.05.2020",
                    category: "Internet",
                    value: 200
                }
            ];
        }
    },
    created() {
        this.paymentsList = this.fetchData();
    }
};
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    max-width: 1200px;
    margin: 0 auto;
    color: #2c3e50;
    padding-top: 60px;
}
</style>