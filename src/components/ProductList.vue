<template>
  <div class="main-box">
    <router-link to="About">
      <div class="card-box" v-for="(item, index) in cardList" :key="index">
        <aside>
          <img class="card-img" :src="item.img"/>
        </aside>

        <ul class="card-right">
          <div class="item-title">
            <div class="card-cite">{{ item.title }}</div>
            <small class="card-small">{{ item.name }}</small>
          </div>
          <div class="item-bottom">
            <li class="item-low-price">
              <div>历史最低价</div>
            </li>
            <div class="item-desc">
              <div class="price">
                <b class="item-price">{{ item.price }}</b>
                <del class="item-del">{{ item.oldPrice }}</del>
              </div>

              <!-- 如果进入抢购时间段 -->
              <div v-if="data === 0" class="btn-progress">
                <button v-if="data === 0" class="my-btn">去抢购</button>
                <div class="lm-progress">
                  <van-progress
                    class="progress"
                    color="#ffffff"
                    stroke-width="5"
                    :show-pivot="false"
                    :percentage="item.progress"
                  />
                  <div class="percent">{{ item.progress }}%</div>
                </div>
              </div>
              <!-- 等候抢购 -->
              <div v-else class="btn-remind">
                <button class="remind-me-btn">提醒我</button>
                <div class="set-reminder">200已设置提醒</div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'ProductList',
  props: {
    msg: Object
  },

  setup (props) {
    const data = ref(props.msg.num)
    const cardList = ref(props.msg.cardList)
    watch(props, (newProps) => {
      data.value = newProps.msg.num
      cardList.value = newProps.msg.cardList
    })

    return {
      data,
      cardList

    }
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  margin: 16px;

  .card-box {
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: inherit;
    margin-top: 10px;

    .card-img {
      width: 110px;
      height: 110px;
      display: inline-block;
    }

    .card-right {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 10px;

      .item-title {
        display: flex;
        flex-direction: column;

        .card-cite {
          font-size: 13px;
          color: #3a3a3a;
          padding-bottom: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 200px;
        }

        .card-small {
          display: flex;
          justify-content: flex-start;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 11px;
          color: #d8182d;
        }
      }

      .item-bottom {
        width: 100%;

        .item-low-price {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background-color: #efeff4;
          font-size: 9px;
          color: #949497;
          width: 64px;
          text-align: center;
          border-radius: 4px;
          height: 18px;
          line-height: 18px;
        }

        .item-desc {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 16px;
          padding-top: 2px;

          .price {
            display: flex;
            flex-direction: column;

            .item-price {
              font-size: 17px;
              color: #d8182d;
            }

            .item-del {
              font-size: 13px;
            }
          }

          .btn-progress {
            display: flex;
            flex-direction: column;
            background-color: #d8182d;
            border-radius: 5px;
            box-shadow: #3a3a3a;

            .lm-progress {
              display: flex;
              flex-wrap: nowrap;
              justify-content: center;
              align-items: center;

              width: 80px;
              height: 20px;
              margin: 3px 5px;

              .percent {
                margin-left: 5px;
                width: 20px;
                color: #ffffff;
                font-size: 5px;
              }

              .progress {
                width: 60px;

                border-radius: 35px;
              }
            }

            .my-btn {
              background-color: #d8182d;
              border-radius: 2px;
              width: 74px;
              height: 24px;
              color: #fff;
              font-size: 11px;
              border: none;
              text-align: center;
            }
          }

          .btn-remind {
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: #3a3a3a;

            .remind-me-btn {
              background-color: #91c95b;
              border-radius: 2px;
              width: 80px;
              height: 24px;
              color: #fff;
              border: none;
              font-size: 11px;
              text-align: center;
            }

            .set-reminder {
              font-size: 6px;
              margin-top: 3px;
              color: #949497;
            }
          }
        }
      }
    }
  }
}
</style>
