<template>
    <div class="payments-list">
        <header>
            <span>#</span><span>Date</span><span>Category</span><span>Value</span>
        </header>
        <div v-for="(item, idx) in list" :key="idx">
            <div class="row">
                <span>{{idx + 1}}</span>
                <span>{{item.date}}</span>
                <span>{{item.category}}</span>
                <span>{{item.value}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "PaymentsDisplay",
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {}
    }
}
</script>
<style scoped>
.payments-list {
    width: 35%;
    margin-top: 50px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 800;
    height: 50px;

}

header span {
    width: 30%;
}

header span:nth-child(1) {
    display: inline-block;
    width: 10%;
    border: 1ox solid;

}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid lightgrey;
}

.row span {
    display: inline-block;
    width: 30%;

}

.row span:nth-child(1) {
    width: 10%;
}
</style>