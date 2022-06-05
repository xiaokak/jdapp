<template>
  <div class="product-layout">
    <div class="product-detail">
      <!-- 轮播 -->
      <van-swipe :autoplay="2000" :height="350">
        <van-swipe-item
          v-for="(image, index) in productInfo.bannerList"
          :key="index"
        >
          <img v-if="image.imgUrl" :src="image.imgUrl" class="lazy_img"/>
        </van-swipe-item>
      </van-swipe>
      <span class="btn-left" @click="$router.go(-1)">
          <van-icon name="arrow-left"/>
      </span>
      <!-- 秒杀价格 -->
      <section class="progress-bar">
        <ul class="progress-left">
          <li class="spike-price">
            <span class="true-price">￥{{ productInfo.newPrice }}</span>
          </li>
          <li class="spike-bottom">
            <del class="old-price">￥{{ productInfo.oldPrice }}</del>
          </li>
        </ul>
        <ul class="progress-right">
          <div class="right-content">
            <li class="end-time">
              <i>距结束还剩:</i>
            </li>
            <li class="time-value">
              <i>{{
                  hour
                    ? hourString + ':' + minuteString + ':' + secondString
                    : minuteString + ':' + secondString
                }}</i>
            </li>
          </div>
        </ul>
      </section>
      <div class="product-content">
        <!-- 商品标题 -->
        <div class="item-info">
          <div>{{ productInfo.title }}</div>
        </div>
        <!-- 选择规格 -->
        <div class="item-info" @click="showPopup">
          <van-field label="选择" disabled :placeholder="color"></van-field>
          <van-icon name="arrow"/>
        </div>
        <!-- 商品规则popup -->
        <van-popup
          class="select-popup"
          v-model:show="show"
          round
          position="bottom"
          :style="{ height: '75%' }"
        >
          <div class="popup-content">
            <span class="close-icon" @click="show = false">
              <van-icon name="close"></van-icon>
            </span>
            <ul class="popup-top">
              <img :src="imgStr"/>
              <li class="item-specification">
                <span class="item-price">￥{{ productInfo.newPrice }}</span>
                <span class="item-count">库存2279件</span>
                <span class="item-colors">选择颜色；尺码</span>
              </li>
            </ul>
            <!-- 产品规格选择 -->
            <ul class="popup-center">
              <li class="popup-color">
                <span class="color-text">颜色</span>
                <div class="color-list">
                  <span
                    class="color-tag"
                    v-for="(items, index) in productInfo.listData"
                    :key="index"
                    :class="{ active: items.listId == listId }"
                    @click="handleSelected(items)"
                  >
                    <span>{{ items.color }}</span>
                  </span>
                </div>
              </li>
              <li class="popup-size">
                <span class="size-text">版本</span>
                <div class="size-list">
                  <span class="size-item">官方标配</span>
                </div>
              </li>
            </ul>
            <div class="product-footer">
              <van-action-bar>
                <van-action-bar-button
                  @click="handleAddToCart"
                  type="warning"
                  text="加入购物车"
                />
                <van-action-bar-button
                  type="danger"
                  @click="handleToBuy"
                  text="立即购买"
                />
              </van-action-bar>
            </div>
          </div>
        </van-popup>
      </div>
      <!-- 宝贝详情 -->
      <div class="item-details">
        <span>宝贝详情</span>
        <img :src="productInfo.ProductDetail" class="detail-img"/>
      </div>
    </div>

    <!-- product footer -->

    <van-action-bar>
      <van-action-bar-icon icon="shop-o" text="店铺"/>
      <van-action-bar-icon icon="chat-o" text="客服"/>
      <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickToCart" :badge="badge"/>
      <van-action-bar-button type="warning" text="加入购物车" @click="handleAddToCart"/>

      <van-action-bar-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      />
    </van-action-bar>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import { getProduct } from '../api/miaosha'
import { useStore } from 'vuex'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const show = ref(false)
    const store = useStore()
    const state = reactive({
      productInfo: {},
      hour: '',
      minute: '',
      second: '',
      promiseTimer: '',
      imgStr: '',
      listId: '',
      color: '',
      price: '',
      badge: store.getters.count
    })
    // 秒杀递减
    const countDown = () => {
      clearInterval(state.promiseTimer)
      state.promiseTimer = setInterval(() => {
        if (state.hour === 0) {
          if (state.minute !== 0 && state.second === 0) {
            state.second = 59
            state.minute -= 1
          } else if (state.minute === 0 && state.second === 0) {
            state.second = 0
            clearInterval(state.promiseTimer)
          } else {
            state.second -= 1
          }
        } else {
          if (state.minute !== 0 && state.second === 0) {
            state.second = 59
            state.minute -= 1
          } else if (state.minute === 0 && state.second === 0) {
            state.hour -= 1
            state.minute = 59
            state.second = 59
          } else {
            state.second -= 1
          }
        }
      }, 1000)
    }

    // 格式+0
    const formatNum = (num) => {
      return num < 10 ? '0' + num : num
    }

    // 时间格式计算
    const hourString = computed(() => {
      return formatNum(state.hour)
    })

    const minuteString = computed(() => {
      return formatNum(state.minute)
    })

    const secondString = computed(() => {
      return formatNum(state.second)
    })

    // 控制popup弹出
    const showPopup = () => {
      show.value = true
    }

    // 切换产品规格
    const handleSelected = (item) => {
      state.listId = item.listId
      state.imgStr = item.imgSrc
      state.color = item.color
    }
    // 添加商品到购物车
    const handleAddToCart = () => {
      const data = {
        id: state.productInfo.id,
        listId: state.listId
      }
      store.commit('set_count', data)
      state.badge = store.state.count
      const cartData = state.productInfo.listData[state.listId]
      cartData.title = state.productInfo.title
      cartData.id = state.productInfo.id
      store.commit('AddGood', cartData)
      console.log(store.state.cartList)
    }
    // 跳转购物车界面
    const onClickToCart = () => {
      router.push({ path: '/cart' })
    }
    onMounted(() => {
      const id = route.params.id
      getProduct(id).then((res) => {
        state.productInfo = res.data.data
        state.imgStr = state.productInfo.listData[0].imgSrc
        state.color = state.productInfo.listData[0].color
        state.listId = state.productInfo.listData[0].listId
        // 倒计时
        var nowtime = new Date()
        var endtime = new Date(state.productInfo.time)
        var lefttime = endtime.getTime() - nowtime.getTime()
        console.log(lefttime)
        state.hour = Math.floor((lefttime / (1000 * 60 * 60)) % 24)
        state.minute = Math.floor((lefttime / (1000 * 60)) % 60)
        state.second = Math.floor((lefttime / 1000) % 60)
        countDown()
      })
    })

    return {
      show,
      ...toRefs(state),
      countDown,
      formatNum,
      hourString,
      minuteString,
      secondString,
      showPopup,
      handleSelected,
      handleAddToCart,
      onClickToCart

    }
  }
}
</script>

<style lang="scss" scoped>
.product-layout {
  background-color: white;
  min-height: 100vh;

  /deep/ .van-swipe-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .lazy_img {
    height: 350px;
    width: 100%;
  }

  .btn-left {
    position: fixed;
    left: 16px;
    top: 14px;
  }

  .product-detail {
    height: calc(100vh - 50px);
    overflow: hidden;
    overflow-y: auto;
  }

  .progress-bar {
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    background: #f3ca43;

    .progress-left {
      display: flex;

      width: 80%;
      height: 50px;
      background: url("../assets/image/product/rectangle-left.png") no-repeat left center;
      background-size: 100% 100%;
      z-index: 2;
      padding: 6px 16px;

      .spike-price {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: white;

        .true-price {
          font-size: 17px;
        }

        .exchange-rate {
          font-size: 9px;
          border: 1px solid white;
          border-radius: 6px;
          display: inline-block;
          width: 108px;
          text-align: center;
          line-height: 20px;
          height: 20px;
          margin-left: 10px;
        }
      }

      .spike-bottom {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .old-price {
          font-size: 11px;
          color: #fff;
          margin-right: 16px;
        }

        .lm-progress {
          width: 70px;
          height: 10px;
          border-radius: 5px;
          color: #d8182d;
          display: inline-block;
        }
      }
    }

    .progress-right {
      width: 40%;
      height: 60px;
      padding-right: 16px 20px;

      .right-content {
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: flex-end;
        font-size: 10px;

        .end-time {
          padding-top: 10px;
          padding-right: 10px;
          font-size: 8px;
          color: white;
        }

        .time-value {
          padding-right: 10px;
        }
      }
    }
  }

  .product-content {
    padding-top: 20px;
    font-size: 14px;

    .item-info {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      width: 95%;
      margin: 2px 5px;
      font-weight: bold;
      position: relative;

      .anchor-point {
        position: absolute;
        left: 90px;

        .svg-icon {
          width: 15px;
          height: 15px;
        }
      }
    }

    .product-detail {
      padding-left: 16px;
      padding-top: 20px;
      color: #d8182d;
    }
  }

  .item-details {
    text-align: center;
    font-size: 16px;
    color: #3a3a3a;
    padding-top: 50px;

    span {
      box-shadow: 1px -10px 1px -4px rgba(254, 77, 109, 0.5) inset;
    }

    .detail-img {
      width: 100%;
    }
  }

  // 冒泡
  .select-popup {
    padding: 20px;

    .popup-content {
      padding: 15px;

      .close-icon {
        float: right;
      }

      .popup-top {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        .item-specification {
          display: flex;
          padding-left: 10px;
          justify-content: flex-end;
          align-items: flex-start;
          flex-direction: column;
          font-size: 14px;
          height: 100px;
          color: #3a3a3a;

          .item-count {
            font-size: 14px;
            padding: 3px 0;
          }

          .item-colors {
            font-size: 11px;
            padding: 3px 0;
          }

          .item-price {
            padding: 3px 0;
            color: #d8182d;
            font-size: 17px;
            font-weight: 600;
          }
        }

        img {
          width: 100px;
          height: 100px;
        }
      }

      .popup-center {
        .popup-color {
          .color-text {
            font-size: 14px;
            color: #3a3a3a;
            font-weight: 600;
            padding-bottom: 10px;
          }

          .color-list {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .color-tag {
              display: flex;
              justify-content: flex-start;
              align-items: center;
              min-width: 75px;
              height: 29px;
              font-size: 14px;
              background-color: #efeff4;
              border: 1px solid #efeff4;
              border-radius: 4px;
              margin-right: 16px;
              padding-right: 10px;
              margin-top: 10px;

              img {
                padding-right: 10px;
                padding-left: 2px;
                width: 24px;
                height: 24px;
              }

              span {
                min-width: 30px;
              }
            }

            .color-tag.active {
              border: 1px solid #d8182d;
              background-color: white;
              color: #d8182d;
            }
          }
        }

        .popup-size {
          .size-text {
            font-size: 14px;
            color: #3a3a3a;
            font-weight: 600;
            padding-bottom: 10px;
          }

          .size-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;

            .size-item {
              font-size: 13px;
              width: 55px;
              height: 24px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              background-color: #efeff4;
              margin-right: 16px;
              margin-top: 10px;
            }
          }
        }

        .popup-quantity {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;

          .quantity-text {
            font-weight: 600;
            font-size: 14px;
            color: #3a3a3a;
          }

          /deep/ .van-stepper__input {
            width: 31px;
            height: 20px;
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
  }
}
</style>
