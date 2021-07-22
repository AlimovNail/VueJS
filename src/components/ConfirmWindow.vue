<template>
    <div>
        {{ settings.name }} {{ settings.itemName }}? <br />
        <button @click="confirmAction">Yes</button>
        <button @click="closeWindow">Cancel</button>
    </div>
</template>
<script>
export default {
    name: "ConfirmWindow",
    props: {
        item: Object,
        settings: Object,
    },

    methods: {
        confirmAction() {
            this.$context.emitAction(
                this.item,
                this.settings.name + this.settings.itemName
            );
            this.closeWindow();
            this.$context.hide();
        },
        closeWindow() {
            this.$context.hideContentWindow();
        },
    },
};
</script>
<style scoped>
button {
    margin: 10px;
    cursor: pointer;
    border: 1px solid #25a79a;
    background-color: transparent;
    width: 70px;
}

button:hover {
    background-color: #25a79a;
    color: #fff;
}
</style>