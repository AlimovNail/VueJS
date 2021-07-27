<template>
    <div>
        <v-container>
            <v-row>
                <v-col md="6" sm="12">
                    <h2 class="text-h3 mb-6">My Payments Tracker</h2>
                    <v-dialog v-model="showPaymentForm" width="500">
                        <template #activator="{ on }">
                            <v-btn color="teal" dark large v-on="on" class="mb-6">
                                <v-icon left>mdi-plus-thick</v-icon>
                                ADD NEW PAYMENT
                            </v-btn>
                        </template>
                        <v-card>
                            <AddPaymentForm @addNewPayment="newPayment" />
                        </v-card>
                    </v-dialog>
                    <PaymentsList :payments="currentPagePayments" />
                    <Pagination :paymentsPerPage="paymentsPerPage" @pageChange="changePage" :currentPage="currentPage" class="mt-6" />
                </v-col>
                <v-col md="6" sm="12">
                    <h2 class="text-h5 text-center">Payments by categories</h2>
                    <div class="chart">
                        <pie-chart width="350px" height="350px" :donut="true" :data="pieChartData" legend="right"></pie-chart>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import PaymentsList from "../components/PaymentsList.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import Pagination from "../components/Pagination.vue";

export default {
    name: "PageDashboard",

    components: {
        PaymentsList,
        AddPaymentForm,
        Pagination,
    },

    data() {
        return {
            paymentsPerPage: 5,
            currentPage: this.$route.params.page || 1,
            showPaymentForm: this.openPaymentForm,
        };
    },


    computed: {
        ...mapGetters({
            paymentsList: "getPayments",
            pieChartData: "getPieChartData",
        }),

        currentPagePayments() {
            const { currentPage, paymentsList, paymentsPerPage } = this;
            let startIndex = (currentPage - 1) * paymentsPerPage;
            const paymentsToDisplay = paymentsList.slice(
                startIndex,
                startIndex + paymentsPerPage
            );
            return paymentsToDisplay;
        },
    },

    methods: {
        ...mapActions([
            "fetchData",
            "addNewPayment",
            "editPayment",
            "deletePayment",
        ]),

        newPayment(newPayment) {
            this.addNewPayment(newPayment);
            if (this.$route.path !== "/dashboard") {
                this.$router.push({ path: "/dashboard" });
            }
        },

        changePage(number) {
            this.currentPage = number;
            this.$router.push({ path: `/dashboard/${number}` });
        },

        removePayment(payment) {
            this.deletePayment(payment);
        },

        updatePayment(payment) {
            this.editPayment(payment);
        },
    },

    created() {
        if (!this.paymentsList.length) {
            this.fetchData(this.currentPage, this.paymentsPerPage);
        }
    },

    mounted() {
        this.$context.EventBus.$on("deletepayment", this.removePayment);
        this.$context.EventBus.$on("editpayment", this.updatePayment);
    },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.chart {
    display: flex;
    justify-content: center
}
</style>