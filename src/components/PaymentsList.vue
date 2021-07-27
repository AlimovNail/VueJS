<template>
    <div>
        <v-row class="font-weight-bold border-bottom">
            <v-col cols="1">#</v-col>
            <v-col cols="4">Date</v-col>
            <v-col cols="4">Category</v-col>
            <v-col cols="2" class="px-0">Amount</v-col>
            <v-spacer></v-spacer>
        </v-row>
        <v-row v-for="(payment, index) in paymentsList" :key="payment.number" class="border-bottom">
            <v-col cols="1">{{ payment.number }}</v-col>
            <v-col cols="4">{{ payment.date }}</v-col>
            <v-col cols="4">{{ payment.category }}</v-col>
            <v-col cols="2">
                {{ payment.amount }}
            </v-col>
            <v-col cols="1">
                <v-btn small icon @click="showContextMenu(payment, $event)">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-col>
            <v-menu :close-on-click="false" :close-on-content-click="false" content-class="elevation-1" v-model="displayMenu" :position-x="x" :position-y="y">
                <ContextMenu v-if="showMenuForID === payment.id" :actions="contextActions" :item="{ ...payments[index] }" />
            </v-menu>
        </v-row>
    </div>
</template>
<script>
import ContextMenu from "./ContextMenu.vue";
import formatDate from "../utils/formatDate.js";
export default {
    name: "PaymentsList",
    components: {
        ContextMenu,
    },
    props: {
        payments: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            paymentActions: [
                { name: "Edit", comp: "EditPaymentForm", itemName: "Payment" },
                { name: "Delete", comp: "ConfirmWindow", itemName: "Payment" },
            ],
            displayMenu: false,
            showMenuForID: null,
            contextActions: null,
            x: 0,
            y: 0,
        };
    },

    computed: {
        paymentsList() {
            const formatedPayments = this.payments.map((payment) => ({ ...payment }));
            formatedPayments.forEach((payment) => {
                payment.date = formatDate(new Date(payment.date));
            });
            return formatedPayments;
        },
    },

    methods: {
        showContextMenu(payment, e) {
            this.x = e.clientX + 10;
            this.y = e.clientY;
            if (this.showMenuForID === payment.id && this.displayMenu) {
                this.displayMenu = false;
                return;
            }
            this.$context.show(payment, this.paymentActions);
        },
    },

    mounted() {
        this.$context.EventBus.$on("show", (data) => {
            this.contextActions = data.actions;
            this.showMenuForID = data.item.id;
            this.displayMenu = true;
        });

        this.$context.EventBus.$on("hide", () => {
            this.displayMenu = false;
        });
    },
};
</script>
<style scoped>
.amount-col {
    display: flex;
    justify-content: space-between;
}

.border-bottom {
    border-bottom: 1px solid #BDBDBD
}
</style>