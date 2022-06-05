<template>
  <div class="shop-cart">
    <!-- header -->
    <header class="page-header">
      <span class="btn-left" @click="$router.go(-2)">
          <van-icon name="arrow-left"/>
      </span>
      <div class="header-content"> 购物车</div>
      <span v-if="cartMode === false" class="appeal-record" @click="setCartMode">完成</span>
      <span v-if="cartMode === true" class="appeal-record" @click="setCartMode">编辑</span>
    </header>
    <!-- content -->
    <!-- 购物车空 -->
    <div class="cart-empty" v-if="emptyCart === true">
      <ul class="empty-content">
        <li class="img-cart">
          <van-icon name="cart-o" size="100"/>
        </li>
        <li class="item-text">
          <p>您的购物车空空如也</p>
          <p>去看看心仪的商品</p>
        </li>
        <li class="item-btn">
          <router-link to="/" class="hairline-btn">立即去购物</router-link>
        </li>
      </ul>
    </div>
    <!-- 购物车不空 -->
    <div v-else>
      <div class="order-card">
        <div class="order-list">
          <div v-for="(item, index) in cartList" :key="index">
            <div class="order-info">
              <!-- 商品选择 -->
              <li class="check-item">
                <van-checkbox checked-color="#d8182d" v-model="item.selected" @change="selected(item.id, item.listId)">
                </van-checkbox>
              </li>
              <!-- 商品数据展示 -->
              <img :src="item.imgSrc" />
              <li class="order-detail">
                <ul>
                  <li class="info-one">
                    <span>{{ item.title }}</span>
                  </li>
                  <li class="info-two">
                    <span>{{ item.color }}</span>
                  </li>
                </ul>
                <div class="info-count">
                  <span>{{ item.price }}</span>
                  <van-stepper v-model="item.num" @plus="plus(item.id, item.listId)"
                               @minus="minus(item.id, item.listId)">
                  </van-stepper>
                </div>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部tabar -->
    <div v-if="emptyCart === false">
      <div v-if="cartMode" class="options-edit">
        <van-submit-bar :price="AllPrice" button-text="结算" @submit="onSubmit">
          <van-checkbox checked-color="#d8182d" v-model="allSelect" @change="changeAllSelect">
            全选
          </van-checkbox>
        </van-submit-bar>

      </div>
      <div v-else class="options-delete">
        <van-submit-bar button-text="删除" @submit="submitDelete">
          <van-checkbox checked-color="#d8182d" v-model="allSelect" @change="changeAllSelect">
            全选
          </van-checkbox>
        </van-submit-bar>

      </div>

    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import { Dialog, Toast } from 'vant'

export default {
  setup () {
    const store = useStore()
    const cartMode = ref(true)
    const emptyCart = ref(true)
    const state = reactive({
      allSelect: store.state.allSelect,
      cartList: store.state.cartList,
      allPrice: store.getters.allMoney
    })
    // 切换完成和编辑
    const setCartMode = () => {
      cartMode.value = !cartMode.value
    }
    // 购物车加
    const plus = (id, listId) => {
      const data = {
        id: id,
        listId: listId
      }
      store.commit('PlusNum', data)
    }
    // 购物车减
    const minus = (id, listId) => {
      const data = {
        id: id,
        listId: listId
      }
      store.commit('MinusNum', data)
    }
    // 单选
    const selected = (id, listId) => {
      const data = {
        id: id,
        listId: listId
      }
      store.commit('SELECT', data)

      console.log(state.cartList)
      const allChecked = state.cartList.every((item) => {
        return item.selected === true
      })

      const allNotChecked = state.cartList.every((item) => {
        return item.selected === false
      })

      if (allChecked) {
        state.allSelect = true
      } else if (allNotChecked) {
        state.allSelect = false
      }
    }
    // 多选改变
    const changeAllSelect = () => {
      store.commit('SELECTALL')
    }
    // 合计金额
    const AllPrice = computed(() => {
      return store.getters.allMoney * 100
    })

    // 删除事件
    const submitDelete = () => {
      const flag = state.cartList.some((item) => {
        return item.selected === true
      })

      if (!flag) {
        Toast.fail('请至少选择一个商品')
      } else {
        Dialog.confirm({
          title: '你确定要从购物车中删除吗?'
        }).then(() => {
          state.cartList = state.cartList.filter(item => {
            return item.selected !== true
          })

          store.dispatch('DELETE')
          console.log(store.state.cartList)
        })
      }
    }
    // 页面初始化
    onMounted(() => {
      state.cartList = store.state.cartList
      if (state.cartList.length === 0) {
        emptyCart.value = true
      } else {
        emptyCart.value = false
      }
    })
    return {
      cartMode,
      emptyCart,
      setCartMode,
      plus,
      minus,
      selected,
      changeAllSelect,
      submitDelete,
      AllPrice,
      ...toRefs(state)
    }
  }
}

</script>

<style lang="scss" scoped>
.shop-cart {
  padding: 0 16px;
  margin-bottom: 100px;

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .header-content {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #3a3a3a;
    }

    .appeal-record {
      color: #d8182d;
      font-size: 13px;
    }
  }

  .cart-empty {
    .empty-content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 40px;
      padding-bottom: 50px;

      .img-cart {
        margin-bottom: 50px;

        .svg-icon {
          width: 156px;
          height: 161px;
        }
      }

      .item-text {
        color: #3a3a3a;
        font-size: 17px;
      }

      .item-btn {
        margin-top: 18px;

        .hairline-btn {
          width: 150px;
          height: 44px;
          font-size: 17px;
          color: #d8182d;
          border: 1px solid #d8182d;
          padding: 10px 32px;
          border-radius: 4px;
        }
      }
    }
  }

  .options-edit {
    /deep/ .van-checkbox {
      padding-left: 24px;

      .van-checkbox__label {
        font-size: 13px;
        color: #949497;
      }
    }

    /deep/ .van-submit-bar {
      .van-submit-bar__bar {
        height: 44px;
        line-height: 44px;
      }

      bottom: 50px;

      .van-submit-bar__text {
        font-size: 17px;
        color: #333333;
      }
    }

    /deep/ .van-submit-bar__price {
      color: #d8182d;
      font-size: 17px;
      font-weight: 600;
      padding-left: 5px;
    }
  }

  .options-delete {
    /deep/ .van-checkbox {
      padding-left: 24px;
      float: left;

      .van-checkbox__label {
        font-size: 13px;
        color: #949497;
      }
    }

    /deep/ .van-submit-bar {
      .van-submit-bar__bar {
        display: flex;
        justify-content: space-between;
        height: 44px;
        line-height: 44px;
      }

      bottom: 50px;

      .van-submit-bar__text {
        font-size: 17px;
        color: #333333;
      }
    }
  }

  /deep/ .van-button--danger {
    background-color: #d8182d;
    height: 44px;
    line-height: 44px;

    .van-button__text {
      font-size: 18px;
    }
  }

  .order-card {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-top: 20px;

    /deep/ .van-checkbox {
      padding-left: 0;

      .van-checkbox__label {
        font-size: 13px;
        color: #949497;
      }
    }

    .checkbox-all {
      .store-info {
        display: flex;
        justify-content: center;
        align-items: center;

        .header-img {
          width: 24px;
          height: 24px;
        }

        span {
          color: #3a3a3a;
          font-size: 11px;
          padding-left: 4px;
        }
      }
    }

    .order-list {
      .order-info {
        width: 100%;
        padding-top: 10px;
        padding-bottom: 16px;
        display: flex;
        justify-content: flex-start;

        .check-item {
          display: flex;
          align-items: center;
        }

        img {
          margin-left: 5px;
          width: 100px;
          height: 100px;
          display: inline-block;
          background-color: #d8182d;
          border-radius: 4px;
        }

        .order-detail {
          width: 55%;
          padding-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .info-one,
          .info-two {
            display: flex;
            padding-top: 4px;
            justify-content: space-between;
            font-size: 13px;
          }

          .info-one {
            color: #3a3a3a;
            padding-bottom: 5px;

            span {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          .info-two {
            color: #949497;
          }

          .info-count {
            color: #d8182d;
            font-size: 14px;
            font-weight: 600;
            display: flex;
            justify-content: space-between;
            align-items: center;

            /deep/ .van-stepper__input {
              width: 31px;
              height: 22px;
              padding: 0;
              color: #949497;
              font-weight: normal;
              background-color: transparent;
              border: 1px solid #dbdbdb;
            }

            /deep/ .van-stepper__plus {
              border: 1px solid #dbdbdb;
              background-color: transparent;
              width: 16px;
              height: 22px;
              border-radius: 0;
            }

            /deep/ .van-stepper__minus {
              border-radius: 0;
              border: 1px solid #dbdbdb;
              background-color: transparent;
              width: 16px;
              height: 22px;
            }
          }
        }
      }

      .order-total {
        color: #949497;
        font-size: 14px;
        text-align: right;

        span {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
