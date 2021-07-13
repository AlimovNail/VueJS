import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: []
    },

    mutations: {
        setPaymentListData(state, payload) {
            state.paymentsList = payload
        },
        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategoryList(state, payload) {
            if (!Array.isArray(payload)) {
                payload = [payload]
            }
            state.categoryList.push(...payload)

        }
    },

    actions: {
        fetchData({ commit }) {
            return new Promise((resolve) => {
                    // имитируем работу с сетью, ставим задержку получения данных в 1 секунду
                    setTimeout(() => {
                        resolve([{
                                date: '28.03.2020',
                                category: 'Food',
                                value: 169,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Transport',
                                value: 360,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Transport',
                                value: 360,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            }, {
                                date: '28.03.2020',
                                category: 'Food',
                                value: 169,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Transport',
                                value: 360,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            },
                            {
                                date: '28.03.2020',
                                category: 'Food',
                                value: 169,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Transport',
                                value: 360,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            },
                            {
                                date: '28.03.2020',
                                category: 'Food',
                                value: 169,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Transport',
                                value: 360,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            },
                        ])
                    }, 1000)
                })
                .then(res => {
                    // запускаем изменение состояния через commit
                    commit('setPaymentListData', res)
                })
        },

        fetchCategory({ commit }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(['Food', 'Sport', 'Education', 'Auto', 'Health', 'Family'])
                }, 1000)
            }).then(res => {
                commit('setCategoryList', res)
            })
        }
    },

    getters: {
        getPaymentList: state => [...state.paymentsList],

        getFullPyamentValue: state => {
            return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
        },
        getCategoryList: state => state.categoryList
    }
})