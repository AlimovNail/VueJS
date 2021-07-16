<template>
  <div>
    <div class="wrapper">
    <button @click="showPaymentForm = !showPaymentForm">ADD NEW COST+</button>
   
    <button @click="quickPayment('Food', 200)">Food 200</button>

    <button @click="quickPayment('Transport', 50)">
      Transport 50
    </button>

    <button @click="quickPayment('Entertainment', 2000)">
      Entertainment 2000
    </button>
   </div>
    <AddPaymentForm @addNewPayment="newPayment" v-show="showPaymentForm" />
    <PaymentsList :payments="currentPagePayments" />
    <Pagination :paymentsPerPage="paymentsPerPage" @pageChange="changePage" />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

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
      showPaymentForm: false,
      paymentsPerPage: 5,
      currentPage: 1,
    };
  },

  computed: {
    ...mapGetters({ paymentsList: "getFetchedPayments" }),

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
    ...mapMutations(["addNewPayment"]),
    ...mapActions(["fetchData"]),

    newPayment(newPayment) {
      this.addNewPayment(newPayment);
    },

    changePage(number) {
      this.currentPage = number;
      this.$router.push({ path: `/dashboard/${number}` });
    },

    quickPayment(category, value) {
      this.$router.push({ path: `/add/payment/${category}?value=${value}` });
    },
  },

  created() {
    this.currentPage = Number(this.$route.params.page) || 1;
    this.fetchData(this.currentPage);

    this.showPaymentForm = this.$attrs.showPaymentForm || false;
  },
};
</script>

<style scoped>
button {
    height: 40px;
    width: 200px;
    border: none;
    padding: 10px;
    color: white;
    font-weight: 800;
    background-color: #25a79a;
    cursor: pointer;
}
.wrapper{
  display:flex;
  justify-content: space-between;
}
</style>