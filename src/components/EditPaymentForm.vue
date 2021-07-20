<template>
    <div class="wrapper">
        <input type="date" v-model="dateToHTML" />
        <select v-model="item.category">
            <option v-for="(option, index) in getCategoriesList" :value="option" :key="index">
                {{ option }}
            </option>
        </select>
        <input type="text" placeholder="Amount" v-model.number="item.amount" />
        <button @click="updatePayment">Save</button>
        <button @click="closeForm">Cancel</button>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: "EditPaymentForm",
    data() {
        return {
            dateToHTML: "",
        };
    },
    props: {
        item: Object,
        settings: Object,
    },

    computed: {
        ...mapGetters(["getCategoriesList"]),
        dateWithCorrectTimezone() {
            const offset = new Date().getTimezoneOffset() * 60000;
            return new Date(new Date(this.item.date).getTime() - offset)
                .toISOString()
                .slice(0, 10);
        },
    },

    methods: {
        updatePayment() {
            this.$context.emitAction({ ...this.item, date: this.dateToHTML },
                this.settings.name + this.settings.itemName
            );

            this.closeForm();
            this.$context.hide();
        },
        closeForm() {
            this.$context.hideContentWindow();
        },
    },

    mounted() {
        this.dateToHTML = this.dateWithCorrectTimezone;
    },
};
</script>
<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 150px;
    margin-top: 20px;
}

button {

    cursor: pointer;
    border: 1px solid #25a79a;
    background-color: transparent;

}

button:hover {
    background-color: #25a79a;
    color: #fff;
}
</style>