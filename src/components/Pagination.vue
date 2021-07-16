<template>
  <div class="wrapper-pagination">
    <button v-for="n in pages" :key="n" @click="changePage(n)">
      {{ n }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pagination",
  props: {
    paymentsPerPage: Number,
  },

  computed: {
    ...mapGetters(["getTotalPayments", "getFetchedPaymentsLength"]),
    pages() {
      return Math.ceil(this.getTotalPayments / this.paymentsPerPage);
    },
  },

  methods: {
    ...mapActions(["fetchData"]),
    changePage(number) {
      if (
        number > Math.ceil(this.getFetchedPaymentsLength / this.paymentsPerPage)
      ) {
        this.fetchData(number);
      }
      this.$emit("pageChange", number);
    },
  },
};
</script>

<style scoped>
.wrapper-pagination {
    width: 400px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
}

   button{
    border:none;
    width: 40px;
    background-color: #25a79a;
    padding: 10px;
    cursor: pointer;
    border-radius: 8px;
    margin-right: 10px;
    color:#fff;
   } 
</style>