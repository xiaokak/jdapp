/* eslint-disable */
import { createStore } from 'vuex'
import { Toast } from 'vant'

export default createStore({
  state: {
    count: 0,
    cartList: [],
    allSelect: true,
    allMoney: 0
  },
  mutations: {
    set_count (state) {
      state.count += 1
    },
    // 购物车添加
    AddGood (state, data) {
      let datas = {
        title: data.title,
        imgSrc: data.imgSrc,
        num: 1,
        color: data.color,
        price: data.price,
        selected: true,
        id: data.id,
        listId: data.listId
      }
      let index = -1
      index = state.cartList.findIndex(item => {
        return item.id == data.id && item.listId == data.listId
      })

      if (index == -1) {
        state.cartList.push(datas)
      } else {
        state.cartList[index].num++
      }
      Toast.success('添加成功')
    },
    PlusNum(state, data) {
      const {id, listId} = data
      let index = state.cartList.findIndex(item => {
        return item.id == id && item.listId ==listId
      })
      state.cartList[index].num++
      state.count++
    },
    MinusNum(state, data) {
      const {id, listId} = data
      let index = state.cartList.findIndex(item => {
        return item.id == id && item.listId ==listId
      })
      state.cartList[index].num--
      state.count--
    },
    SELECT(state, data) {
      const {id, listId} = data
      let index = state.cartList.findIndex(item => {
        return item.id == id && item.listId ==listId
      })
      !state.cartList[index].selected
    },
    SELECTALL(state){
      state.all_select =!state.all_select
      if(state.all_select === true){

        state.cartList.forEach((item)=>{
          item.selected=true
        })
      }else if(state.all_select === false){
        state.cartList.forEach((item)=>{
          item.selected=false
        })
      }
    },
    count(state) {
      if(state.count == 0) {
        return  null
      } else {
        return state.count
      }
    },
    allMoney(state){
      let all_money=0
      state.cartList.forEach((item)=>{
        if(item.selected){
          all_money+=item.num*item.price
        }
      })
      return state.all_money=all_money
    },
    // 删除
    DELETE(state) {
      state.cartList = state.cartList.filter(item =>{
        return item.selected != true
      })
    }
  },
  getters:{

    // 计算count
    count(state) {
      if(state.count == 0) {
        return null
      } else {
        return state.cartList.length
      }

    },

    // 计算合计金额
    allMoney(state) {
      let all_money = 0
      state.cartList.forEach((item)=>{
        if(item.selected) {
          all_money += item.num*item.price
        }
      })

      return state.allMoney = all_money
    }
  } ,
  actions:{
    DELETE(context) {
      context.commit("DELETE")
      context.getters.count
    }
  }
})
