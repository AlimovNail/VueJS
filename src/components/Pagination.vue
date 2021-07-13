<template>
    <div :class="[$style.wrapper]">
        <div @click="onClick(cur - 1)">&laquo;
        </div>
        <div v-for="i in amount" :key="i" :class="{
      [$style.active]: cur === i
    }" @click="onClick(i)">{{ i }}
        </div>
        <div @click="onClick(cur + 1)">&raquo;</div>
    </div>
</template>
<script>
export default {
    props: {
        length: Number,
        n: Number,
        cur: Number
    },
    computed: {
        amount() {
            return Math.ceil(this.length / this.n)
        }
    },
    methods: {
        onClick(p) {
            if (p < 1 || p > this.amount || p === this.cur) {
                return
            }
            this.$emit('paginate', p)
        }
    }
}
</script>
<style module lang="scss">
.wrapper {
    display: flex;

    &>div {
        padding: 10px;
        cursor: pointer;
        border-radius: 10px;

        &.active {
            background: #25a79a;
        }
    }
}
</style>