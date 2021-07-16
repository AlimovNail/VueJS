<template>

  <div v-show="toggle" class="form">
    <input type="text" placeholder="Date" v-model="date" />
    <select v-model="category">
      <option
        v-for="(option, index) in getCategoriesList"
        :value="option"
        :key="index"
      >
        {{ option }}
      </option>
    </select>

    <input type="text" placeholder="Amount" v-model.number="amount" />
    <button @click="sendPayment">Save</button>
  </div>

</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      amount: "",
      category: "Food",
      date: "",
      toggle: true,
     
    };
  },

  computed: {
    ...mapGetters(["getCategoriesList", "getTotalPayments"]),
    getCurrentDate() {
        const today = new Date();
        const d = (today.getDate() < 10) ? "0" + today.getDate() : today.getDate();
        const m = ((today.getMonth() + 1) < 10) ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
        const y = today.getFullYear();
        return `${d}.${m}.${y}`;
    }
  },

  methods: {
    ...mapMutations(["increaseTotalPayments"]),
    sendPayment() {
      const { category, amount } = this;

      const data = {
        id: this.getTotalPayments + 1,
        amount,
        category,
        date: this.date || this.getCurrentDate,
      };
      this.increaseTotalPayments();
      this.$emit("addNewPayment", data);
    },

    acceptQuickPayment() {
      if (this.$route.params.category) {
        this.category = this.$route.params.category;
        this.date = this.getCurrentDate;
      }

      if (this.$route.query.value) {
        this.amount = this.$route.query.value;
        setTimeout(() => {
          this.sendPayment();
        }, 300);
      }
    },
  },

  watch: {
    $route() {
      this.acceptQuickPayment();
    },
  },

  mounted() {
    this.acceptQuickPayment();
  },
};
</script>

<style scoped>
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

input, select, option {
    height: 40px;
    border-color: lightgray;
    padding-left: 10px;
}
</style>