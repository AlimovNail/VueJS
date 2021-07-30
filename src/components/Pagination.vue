<template>
  <div>
    <v-pagination
      v-model="page"
      :length="pages"
      @input="changePage"
      color="teal"
    ></v-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pagination",
  props: {
    paymentsPerPage: Number,
    currentPage: Number,
  },

  data() {
    return {
      page: this.currentPage,
    };
  },

  computed: {
    ...mapGetters(["getPaymentsLength"]),
    pages() {
      return Math.ceil(this.getPaymentsLength / this.paymentsPerPage);
    },
  },

  methods: {
    ...mapActions(["fetchData"]),
    changePage(number) {
      if (number > Math.ceil(this.getPaymentsLength / this.paymentsPerPage)) {
        this.fetchData(number, this.paymentsPerPage);
      }
      this.$emit("pageChange", number);
    },
  },
};
</script>

<style>
</style>