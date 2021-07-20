<template>
    <div class="wrapper">
        <div class="menu">
            <button class="menu-btn" v-for="(action, index) in actions" :key="index" @click="choseAction(action)">
                {{ action.name }}
            </button>
            <component :is="contextWindowContent" :item="item" :settings="settings" />
        </div>
    </div>
</template>
<script>
import EditPaymentForm from "./EditPaymentForm.vue";
import ConfirmWindow from "./ConfirmWindow.vue";
export default {
    name: "ContextMenu",
    components: {
        EditPaymentForm,
        ConfirmWindow,
    },

    props: {
        actions: Array,
        item: Object,
    },

    data() {
        return {
            contextWindowContent: "",
            settings: null,
        };
    },

    methods: {
        choseAction(action) {
            this.$set(this, "settings", action);
            this.contextWindowContent = action.comp;
        },

        onHideContentWindow() {
            this.contextWindowContent = "";
        },
    },

    mounted() {
        this.$context.EventBus.$on("hideContentWindow", this.onHideContentWindow);
    },
};
</script>
<style scoped>
i {
    font-size: 18px;
}

.icon-btn {
    width: 15px;
    padding: 5px;
    align-self: flex-end;
}

.icon-btn:hover {
    background-color: #eaeaea;
}

.wrapper {
    position: relative;
    max-width: 150px;
    display: flex;
    flex-direction: column;
}

button {

    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    background-color: transparent;
}

.menu-btn {
    height: 30px;
    -max-width: 150px;
    -min-width: 80px;
    width: 100%;
    justify-content: start;
    cursor: pointer;
}

.menu-btn:hover {
    background-color: #25a79a;
    color: #fff;
}

.menu {
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 100%;
    width: 150px;
    padding: 10px 5px;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.49);
    background-color: #fff;
}
</style>