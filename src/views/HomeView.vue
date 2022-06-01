<template>
  <div class="page">
    <!-- title -->
    <div class="hd-title">京东秒杀</div>
    <!--tab-->
    <div class="tab-container">
      <div class="tab-items" v-for="(tab,index) in tabList" :key="index">
        <div class="tab-item" :class="{active:num === tab.state}" @click="tabChange(tab.state)">
          <div>{{ tab.title }}</div>
          <div>{{ tab.name }}</div>
        </div>
      </div>
    </div>
    <product-list :msg="{num,cardList}"/>
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs } from 'vue'
import { getTabs } from '@/api/miaosha'
import ProductList from '@/components/ProductList'

export default {
  components: {
    ProductList
  },
  setup () {
    const num = ref(0)
    const dataList = reactive({
      tabList: '',
      cardList: ''
    })

    const tabChange = (index) => {
      num.value = index
      dataList.cardList = dataList.tabList[num.value].cardList
    }

    onMounted(() => {
      getTabs().then(res => {
        dataList.tabList = res.data.data
        dataList.cardList = dataList.tabList[0].cardList
      })
    })

    return {
      num,
      tabChange,
      ...toRefs(dataList)
    }
  }
}
</script>

<style lang="less">
.page {
  background: linear-gradient(#d1265f, #efeff4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hd-title {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.tab-container {
  display: flex;
  flex-direction: row;
}

.tab-items {
  display: flex;
  flex-direction: column;
}

.tab-item {
  margin: 5px 10px;
  font-weight: bold;
  color: white;
  font-size: 0.6rem;
  white-space: nowrap;
}

.active {
  color: #ff3333;
  margin: 5px 10px;
  font-size: 0.8rem;
}
</style>
