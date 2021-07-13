<template>
    <div id="app">
        <header>
            <h1>My personal cost</h1>
        </header>
        <main>
            <AddPayment @addNewPayment="addData" />
            <CategorySelect :categories="categories" />
            Total: {{getFPV}}
            <PaymentsDisplay :list="currentElements" />
            <Pagination :cur="curPage" :n="n" :length="paymentsList.length" @paginate="onChangePage" />
        </main>
    </div>
</template>
<script>
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import CategorySelect from "./components/CategorySelect.vue";
import Pagination from "./components/Pagination.vue";
import AddPayment from "./components/AddPayment.vue";
import { mapMutations, mapGetters, mapActions } from 'vuex';
export default {
    name: "App",
    components: {
        PaymentsDisplay,
        CategorySelect,
        AddPayment,
        Pagination
    },
    data() {
        return {
            page: '',
            curPage: 1,
            n: 5,
        }
    },
    methods: {
        ...mapMutations([
            'setPaymentListData',
            'addDataToPaymentsList'
        ]),
        ...mapActions([
            'fetchData',
            'fetchCategory'
        ]),
        addData(data) {
            this.addDataToPaymentsList(data);
        },
        onChangePage(p) {
            this.curPage = p
        }

    },
    computed: {
        ...mapGetters({
            paymentsList: 'getPaymentList',
            categories: 'getCategoryList'
        }),
        currentElements() {
            const { n, curPage } = this
            return this.paymentsList.slice(n * (curPage - 1), n * (curPage - 1) + n)
        },
        getFPV() {
            return this.$store.getters.getFullPyamentValue
        },
    },
    created() {
        this.fetchData()
        if (!this.categories.length) {
            this.fetchCategory()
        }
    },
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