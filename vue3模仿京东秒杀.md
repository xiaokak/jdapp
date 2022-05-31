vue3模仿京东秒杀

## vue3项目创建的准备

### 1-1安装vue-cli5

vue-cli 和vite2两种脚手架创建项目,这里我使用vue-cli5

我用的是yarn来安装

![image-20210531143214509](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210531143214509.png)

```
C:\Users\Administrator\AppData\Local\Yarn\bin
```

首先在系统环境变量添加yarn\bin目录的全局权限

安装

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

查看版本

```
vue -V

```

升级

如需升级全局的 Vue CLI 包，请运行：

```bash
npm update -g @vue/cli

# 或者
yarn global upgrade --latest @vue/cli
```

创建项目

```
vue create
```

![image-20210531145733007](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210531145733007.png)

选择手动配置安装

空格选择 需要的库包

![image-20210531151135874](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210531151135874.png)

1选择版本vue3

![image-20210531153802386](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210531153802386.png)

2提示是否使用history router模式(这里我选n,后期可改,为了上线方便)

![image-20210531154821711](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210531154821711.png)

3选择Eslint代码验证规则(EsLint Prettier比较常用)

![image-20210531154917916](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210531154917916.png)

4选择什么时候进行代码规则检测(lint save保存即检测)



5Where do you prefer placing config for Babel, ESLint, etc.?(babel,EsLint配置存放在哪?我选package.json)

![image-20210531155613771](F:%5Cvideo%5Cvue3%E4%BB%BF%E4%BA%AC%E4%B8%9C%E7%A7%92%E6%9D%80%5Cvue3%E6%A8%A1%E4%BB%BF%E4%BA%AC%E4%B8%9C%E7%A7%92%E6%9D%80.assets%5Cimage-20210531155613771.png)

*6 Save* *this* *as* *a* *preset* *for* *future* *projects?* (y/N) N 是否保存以上配置步骤的选项为今后所有项目的默认配置。不保存

![image-20210531155814945](F:%5Cvideo%5Cvue3%E4%BB%BF%E4%BA%AC%E4%B8%9C%E7%A7%92%E6%9D%80%5Cvue3%E6%A8%A1%E4%BB%BF%E4%BA%AC%E4%B8%9C%E7%A7%92%E6%9D%80.assets%5Cimage-20210531155814945.png)

### 1-2 安装vant Ui

```
# Vue 3 项目，安装 Vant 3：
yarn add vant@next -S
```

引入babel-plugin-import

```
yarn add babel-plugin-import -D
```

在.babelrc 或 babel.config.js 中添加配置：

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```

main.js中配置

```
import { createApp } from "vue";
import App from "./App.vue";
import {Button} from 'vant'

createApp(App).use(Button).mount("#app");
```

最后在页面中就可以使用了

```
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
</template>

<script>


export default {
  name: "App",
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```



### 1-3  compositionAPI新特性

首先得谈谈compositonAPI的优势

首先抛出 Vue2 的代码模式下存在的几个问题。

1. 随着功能的增长，复杂组件的代码变得越来越难以维护。 尤其发生你去新接手别人的代码时。 根本原因是 Vue 的现有 API 通过「选项」组织代码，但是在大部分情况下，通过逻辑考虑来组织代码更有意义。
2. 缺少一种比较「干净」的在多个组件之间提取和复用逻辑的机制。
3. 类型推断不够友好。

使用 (`data`、`computed`、`methods`、`watch`) 组件选项来组织逻辑通常都很有效。然而，当我们的组件开始变得更大时，**逻辑关注点**的列表也会增长。尤其对于那些一开始没有编写这些组件的人来说，这会导致组件难以阅读和理解。





![Vue 选项式 API: 按选项类型分组的代码](https://v3.cn.vuejs.org/images/options-api.png)

这是一个大型组件的示例，其中**逻辑关注点**按颜色进行分组。

这种碎片化使得理解和维护复杂组件变得困难。选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块。

如果能够将同一个逻辑关注点相关代码收集在一起会更好。而这正是组合式 API 使我们能够做到的

我们将 `setup` 返回的所有内容都暴露给组件的其余部分 (计算属性、方法、生命周期钩子等等) 以及组件的模板。

我们可以将界面中重复的部分连同其功能一起提取为可重用的代码段。仅此一项就可以使我们的应用在可维护性和灵活性方面走得相当远。然而，我们的经验已经证明，光靠这一点可能并不够，尤其是当你的应用变得非常大的时候——想想几百个组件。处理这样的大型应用时，共享和重用代码变得尤为重要。



## 2 秒杀首页

首页图片(展示下我们需要开发出的效果)

![image-20210608200044768](F:%5Cvideo%5Cvue3%E4%BB%BF%E4%BA%AC%E4%B8%9C%E7%A7%92%E6%9D%80%5Cvue3%E6%A8%A1%E4%BB%BF%E4%BA%AC%E4%B8%9C%E7%A7%92%E6%9D%80.assets%5Cimage-20210608200044768.png)

完成秒杀首页我需要vant UI的帮助

### 2-1 首页header

这里我们在app.vue中利用router-link完成tab

首先准备数据

```
    tabList: [
        {
          title: "10:00",
          name: "抢购中",
          state: 0,
     
        },
        {
          title: "12:00",
          name: "即将开始",
          state: 1,
     
        },
        {
          title: "14:00",
          name: "即将开始",
          state: 2,
     
        },
        {
          title: "16:00",
          name: "即将开始",
          state: 3,
 
        },
        {
          title: "18:00",
          name: "即将开始",
          state: 4,
      
        },
       ] 
```

然后,准备首页开发

```
<template>
  <div class="page">
    <!-- title -->
    <div class="hd-title">京东秒杀</div>
    <!-- tab -->
    <div class="tab-container">
      <div class="tab-items" v-for="(tab, index) in tabList" :key="index">
        <div
          class="tab-item"
          :class="{ active: num == tab.state }"
          @click="tabChange(tab.state)"
        >
          <div>{{ tab.title }}</div>
          <div>{{ tab.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    const num = ref(0);

    const tabChange = (index) => {
      num.value = index;
    };
    return {
      num,
      tabChange,
      tabList: [
        {
          title: "10:00",
          name: "抢购中",
          state: 0,
        },
        {
          title: "12:00",
          name: "即将开始",
          state: 1,
        },
        {
          title: "14:00",
          name: "即将开始",
          state: 2,
        },
        {
          title: "16:00",
          name: "即将开始",
          state: 3,
        },
        {
          title: "18:00",
          name: "即将开始",
          state: 4,
        },
      ],
    };
  },
};
</script>

<style>
.page {
  background: linear-gradient(#d1265f, #efeff4);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hd-title {
  color: #ffffff;
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
  color: #ffffff;
  font-size: 0.6rem;
  white-space: nowrap;
}
.active {
  color: #ff3333;
  margin: 5px 10px;
  font-size: 0.8rem;
}
</style>

```



### 2-2 ref

reactive 和 ref 都是用来定义响应式数据的 reactive更推荐去定义复杂的数据类型 ref 更推荐定义基本类型

ref 和 reactive 本质我们可以简单地理解为ref是对reactive的二次包装， ref定义的数据访问的时候要多一个.value

使用ref定义基本数据类型，ref也可以定义数组和对象。

```
  const num = ref(0);
    
    
   const tabChange = (index)=>{
      num.value = index
      
   }
   
    return {
      num,
      
      tabChange ,
      }
```

### 2-3Mockjs和axios

安装mockjs

```
yarn add mockjs -S

```


![image-20210609143132262](F:\video\vue3仿京东秒杀\vue3模仿京东秒杀.assets\image-20210609143132262.png)

 axios

安装 axios

```
yarn add axios -S
```

main.js中引入mock

```
import '../mock/mock'
```

创建mock文件夹,新建mock.js

```
import Mock from 'mockjs'
import tabList from './json/tab'


// tab数据
Mock.mock(
    '/api/getTabs',
    'get',
    () => {
        return {
            code :200,
            msg:'success',
            data:tabList
        }
    }

)


```



创建json文件tab.js

```


 const tabList= [
    {
      title: "10:00",
      name: "抢购中",
      state: 0,
      cardList:[
        {
            title: "Apple Watch Series 6智能手表 GPS+蜂窝款",
            img: "http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg",
            name: "【618好物尽兴收】限量好物第一波",
            price: "￥5999",
            oldPrice: "￥6299",
            progress: "18",
          },
          {
            title: "华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg",
            name: "【双屏双触控，价保618】创新副屏设计",
            price: "￥9969",
            oldPrice: "￥10999",
            progress: "38",
          },
          {
            title: "惠普(HP)战66 商用办公台式机电脑整机",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg",
            name: "【618抢鲜购】战99高性能台式机",
            price: "￥3169",
            oldPrice: "￥3599",
            progress: "50",
          },
          {
            title: "小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg",
            name: "小米11青春6月1-6月20日享白条12期免息",
            price: "￥2569",
            oldPrice: "￥2699",
            progress: "28",
          },
          {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
    ]
 
    },
    {
      title: "12:00",
      name: "即将开始",
      state: 1,
      cardList:[
        {
            title: "Apple Watch Series 6智能手表 GPS+蜂窝款",
            img: "http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg",
            name: "【618好物尽兴收】限量好物第一波",
            price: "￥5999",
            oldPrice: "￥6299",
            progress: "18",
          },
          {
            title: "华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg",
            name: "【双屏双触控，价保618】创新副屏设计",
            price: "￥9969",
            oldPrice: "￥10999",
            progress: "38",
          },
          {
            title: "惠普(HP)战66 商用办公台式机电脑整机",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg",
            name: "【618抢鲜购】战99高性能台式机",
            price: "￥3169",
            oldPrice: "￥3599",
            progress: "50",
          },
          {
            title: "小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg",
            name: "小米11青春6月1-6月20日享白条12期免息",
            price: "￥2569",
            oldPrice: "￥2699",
            progress: "28",
          },
          {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
    ]
 
    },
    {
      title: "14:00",
      name: "即将开始",
      state: 2,
      cardList:[
        {
            title: "Apple Watch Series 6智能手表 GPS+蜂窝款",
            img: "http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg",
            name: "【618好物尽兴收】限量好物第一波",
            price: "￥5999",
            oldPrice: "￥6299",
            progress: "18",
          },
          {
            title: "华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg",
            name: "【双屏双触控，价保618】创新副屏设计",
            price: "￥9969",
            oldPrice: "￥10999",
            progress: "38",
          },
          {
            title: "惠普(HP)战66 商用办公台式机电脑整机",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg",
            name: "【618抢鲜购】战99高性能台式机",
            price: "￥3169",
            oldPrice: "￥3599",
            progress: "50",
          },
          {
            title: "小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg",
            name: "小米11青春6月1-6月20日享白条12期免息",
            price: "￥2569",
            oldPrice: "￥2699",
            progress: "28",
          },
          {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
    ]
    },
    {
      title: "16:00",
      name: "即将开始",
      state: 3,
      cardList:[
        {
            title: "Apple Watch Series 6智能手表 GPS+蜂窝款",
            img: "http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg",
            name: "【618好物尽兴收】限量好物第一波",
            price: "￥5999",
            oldPrice: "￥6299",
            progress: "18",
          },
          {
            title: "华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg",
            name: "【双屏双触控，价保618】创新副屏设计",
            price: "￥9969",
            oldPrice: "￥10999",
            progress: "38",
          },
          {
            title: "惠普(HP)战66 商用办公台式机电脑整机",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg",
            name: "【618抢鲜购】战99高性能台式机",
            price: "￥3169",
            oldPrice: "￥3599",
            progress: "50",
          },
          {
            title: "小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB",
            img: "//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg",
            name: "小米11青春6月1-6月20日享白条12期免息",
            price: "￥2569",
            oldPrice: "￥2699",
            progress: "28",
          },
          {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
    ]
    },
    {
      title: "18:00",
      name: "即将开始",
      state: 4,
      cardList:[
        {
          title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
          img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
          name: "迪丽热巴同款",
          price: "￥200",
          oldPrice: "￥399",
          progress: "15",
        },
     {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
          {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
          {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
          {
            title: "【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰",
            img: "//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg",
            name: "迪丽热巴同款",
            price: "￥200",
            oldPrice: "￥399",
            progress: "15",
          },
    ]
    }
  ]

  export default tabList
```

安装axios

```
yarn add  axios -S
```

创建api文件夹

新建request.js

```
import axios from 'axios'

const instance = axios.create({
    baseURL: '/api/',
   
    
  })


  export default instance;
```

新建 miaosha.js

```
import instance from './request'

export const getTabs = () =>{
    return instance({
        url:'/getTabs',
        method:'GET'
    })
}

```

### 2-4 reactive

reactive的用法与ref的用法相似，也是将数据变成响应式数据，当数据发生变化时插值数据也会自动更新。不同的是ref用于基本数据类型，而reactive是用于复杂数据类型，比如对象和数组

```
<template>
  <div class="page">
    <!-- title -->
    <div class="qg-header">京东秒杀</div>
    <!-- 秒杀时间 -->
    <div class="qg-container" >
      <div class="qg-miaosha" v-for="(tab, index) in tabList" :key="index" >
        
           <div
          class="qg-content"
          :class="{ active: num == tab.state}"
          @click="tabChange(tab.state)"
        >
          <div>{{ tab.title }}</div>
          <div>{{ tab.name }}</div>
        </div>
        
      </div>
   
    </div>
    
    <app-list :msg="{num,cardList}" />
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import {getTabs} from "../../api/miaosha"
import AppList from '../components/AppList';
export default {
  components:{
    AppList
  },
  setup() {
    
    const num = ref(0);
    const dataList = reactive({
      tabList:'',
      cardList:''
    })
    
   const tabChange = (index)=>{
      num.value = index
      dataList.cardList = dataList.tabList[num.value].cardList
   }
   
  
    onMounted(()=>{
      getTabs().then((res) =>{
        
        dataList.tabList = res.data.data
        dataList.cardList = dataList.tabList[0].cardList
        
      })
    })
   
    return {
      num,
      ...toRefs(dataList),
      tabChange ,
     

     
    };
  },
};
</script>

<style>
.page {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(#d1265f, #efeff4);
}


.qg-header {
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
}
.qg-container {
   display: flex;
  flex-direction: row;
}
.qg-miaosha {
  display: flex;
  flex-direction: column;

}
.qg-content {
  margin: 5px 10px;
  font-weight: bold;
  color: #ffffff;
  font-size: 0.6rem;
  white-space: nowrap;
}
.active {
  margin: 5px 10px;
  color: #ff3333;
  font-size: 0.8rem;
}


</style>

```

### 2-5 vue3生命周期

- beforeCreate -> use setup()
- created -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestroy -> onBeforeUnmount
- destroyed -> onUnmounted
- errorCaptured -> onErrorCaptured

Vue3 Composition API 附带了一个 `setup()` 方法。此方法封装了我们的大多数组件代码，并处理了响应式，生命周期钩子函数等

### 2-6 props父子组件传参

![image-20210619152631937](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210619152631937.png)

父组件怎么传值给子组件的 props?

**props 传值的设置**

**子组件 设置响应式 props**

**父组件数据变化，子组件props**

### 2-7 productList产品列表

使用sass玩转css样式

yarn 安装 sass-loader   node-sass

```
yarn add sass-loader   node-sass -D
```

下一步组装数据

```
<template>
  <div class="main-box">
    <router-link to="About">
      <div class="card-box" v-for="(item, index) in cardList" :key="index">
        <aside>
          <img class="card-img" :src="item.img" />
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
              <div v-if="data == 0" class="btn-progress">
                <button v-if="data == 0" class="my-btn">去抢购</button>
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
import {  ref, watch } from "vue";

export default {
  name: "ProductList",
  props: {
    msg: Object,
  },

  setup(props) {
    const data = ref(props.msg.num);
    const cardList = ref(props.msg.cardList)
    watch(props, (newProps) => {
      data.value = newProps.msg.num;
      cardList.value = newProps.msg.cardList
    });


   
    return {
      data,
      cardList
     
    };
  },
};
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
              margin-top:3px;
              color: #949497;
            }
          }
        }
      }
    }
  }
}
</style>

```

### 2-8 watch监听数据

**watch**,

.具有一定的惰性lazy 第一次页面展示的时候不会执行，只有数据变化的时候才会执行

参数可以拿到当前值和原始值

可以侦听多个数据的变化，用一个侦听起承载

**watchEffect**

没有过多的参数 只有一个回调函数

1.立即执行，没有惰性，页面的首次加载就会执行。

2.自动检测内部代码，代码中有依赖 便会执行

3.不需要传递要侦听的内容 会自动感知代码依赖，不需要传递很多参数，只要传递一个回调函数

4.不能获取之前数据的值 只能获取当前值

5.一些=异步的操作放在这里会更加合适

```
   watch(props, (newProps) => {
      data.value = newProps.msg.num;
      cardList.value = newProps.msg.cardList
    });
```

watchEffect

```
watchEffect(()=>{
      console.log(data.value)
    })
```

## 3 商品详情页

### 3-1vue-router4安装使用

安装

```
yarn add vue-router@next -S
```

配置router/index.js

```
import {createRouter,createWebHashHistory} from "vue-router"
import Home from "../views/Home.vue"

const routes = [
    {
        path:"/",
        name:"Home",
        component:Home
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router
```

main.js当中引入router

```
import { createApp } from "vue";
import App from "./App.vue";
import {Button,Progress} from 'vant'
import '../mock/mock'
import router from './router'

createApp(App)
.use(Button)
.use(Progress)
.use(router)
.mount("#app");
```



### 3-2 params和query路由传参

传参可以使用params和query两种方式。

使用params传参只能用name来引入路由，即push里面只能是name:’xxxx’,不能是path:’/xxx’,因为params只能用name来引入路由，如果这里写成了path，接收参数页面会是undefined！！！。
使用query传参使用path来引入路由。

params是路由的一部分,必须要在路由后面添加参数名。query是拼接在url后面的参数，没有也没关系。


### 3-3 useRoute接受路由信息

------

```
import { useRoute } from "vue-router";
```

![image-20210623225709584](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210623225709584.png)

```
<template>
  <div>{{route}}</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import {useRoute} from 'vue-router'
export default {
  setup() {

    const route = useRoute()
    onMounted(()=>{
      const id = route.params.id
      console.log(id)
    })
    return {
      route
    }
  }
}
</script>

<style>

</style>
```

**vue2 this.$route**

引入上图代码 查看useRoute的参数

**vue3 useRoute**

- path
- name
- params
- query
- hash



### 3-4 获取宝贝详情数据

mock接口



```
// product数据获取
Mock.mock(
    '/api/getProduct',
    'get',
    (req) => {
        const id = req.body
        if(id == 11) {
            return {
                code :200,
                msg:'success',
                data:productInfo_11
            }
        } else if(id == 22) {
            return {
                code :200,
                msg:'success',
                data:productInfo_22
            }
        }
    }
)
```

json虚拟数据



api



调用数据

```
<template>
  <div class="product-layout">
    
      <!-- 轮播 -->
      <van-swipe :autoplay="2000" :height="350">
        <van-swipe-item v-for="(image, index) in productInfo.bannerList" :key="index">
          <img v-if="image.imgUrl" :src="image.imgUrl" class="lazy_img" />
        </van-swipe-item>
        <span class="btn-left" @click="$router.go(-1)">
          <van-icon name="arrow-left" />
        </span>
      </van-swipe>
      <!-- 秒杀价格 -->
      <section v-if="isSpike" class="progress-bar">
        <ul class="progress-left">
          <li class="spike-price">
            <span class="true-price">￥{{productInfo.newPrice}}</span>
          </li>
          <li class="spike-bottom">
            <del class="old-price">￥{{productInfo.oldPrice}}</del>
          </li>
        </ul>
        <ul class="progress-right">
          <div class="right-content">
            <li class="end-time">
              <i>距结束还剩:</i>
            </li>
            <li class="time-value">
              <i>18:26:50</i>
            </li>
          </div>
        </ul>
      </section>
      <!-- 选择规格 -->
      
      <!-- product footer -->
      <div class="product-footer">
        <van-action-bar>
          <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
          <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
          <van-action-bar-icon
            icon="cart-o"
            text="购物车"
            @click="onClickIcon"
          />
          <van-action-bar-button type="warning" text="加入购物车" />

          <van-action-bar-button
            type="danger"
            text="立即购买"
            @click="onClickButton"
          />
        </van-action-bar>
      </div>
    
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getProduct } from "../../api/miaosha";
export default {
  setup() {
    const isSpike = ref(true);
    const data = reactive({
      productInfo: [],
    });
    const route = useRoute();
    onMounted(() => {
      const id = route.params.id;
      getProduct(id).then((res) => {
        console.log(res)
        data.productInfo = res.data.data
      });
    });
    return {
      isSpike,
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
.product-layout {
  background-color: white;
  min-height: 100vh;
  margin-bottom: 45px;
  padding-bottom: 45px;
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

  .progress-bar {
    display: flex;
    flex-wrap: nowrap;
    .progress-left {
      display: inline-block;
      position: relative;
      min-width: 375px;
      height: 50px;
      background: url("../assets/image/product/rectangle-left.png") no-repeat
        left center;
      background-size: 76% 100%;
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
      display: inline-block;
      position: absolute;
      right: 0;
      width: 100%;
      height: 60px;
      background: url("../assets/image/product/rectangle-right.png") no-repeat
        right center;
      background-size: 32% 100%;
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
    .product-title {
      padding-left: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text-left {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .force-value {
        display: inline-block;
        width: 54px;
        text-align: center;
        line-height: 20px;
        height: 20px;
        color: #fff;
        font-size: 9px;
        background-color: #d8182d;
        border-radius: 10px 10px;
      }
      .heart-full {
        padding: 0 17px;
      }
      .item-desc {
        font-size: 14px;
        color: #3a3a3a;
        padding-left: 7px;
      }
    }
    .product-price {
      color: #949497;
      font-size: 9px;
      padding-top: 8px;
      font-weight: 600;
      padding-left: 16px;
    }
    .product-info {
      display: flex;
      justify-content: space-around;
      padding-left: 16px;
      padding-top: 20px;
      padding-bottom: 10px;
      font-size: 11px;
      color: #949497;
    }
    .store-info {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      margin-bottom: 10px;
      /deep/ .van-button--danger {
        background-color: #d8182d;
        border: 1px solid #d8182d;
      }
      .store-detail {
        padding-left: 16px;
        padding-top: 16px;
        .store-header {
          display: inline-block;
          width: 24px;
          height: 24px;
          vertical-align: middle;
        }
        .store-name {
          vertical-align: middle;
          color: #3a3a3a;
          padding-left: 4px;
        }
      }
      .store-btn {
        padding-right: 16px;
        padding-top: 10px;
        /deep/ .van-button {
          margin-left: 10px;
        }
      }
    }
    .item-info {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 95%;
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
    .html-class {
      margin-top: 20px;
      /deep/ img {
        width: 375px;
      }
      /deep/ div {
        background-size: 50% 100%;
      }
    }
  }
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
              width: 75px;
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
              width: 42px;
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
  /deep/ .van-popup--bottom {
    border-radius: 16px 16px 0 0;
  }
  .product-footer {
    /deep/ .van-button--warning {
      background-color: #f3ca43;
      border: 1px solid #f3ca43;
      height: 44px;
      line-height: 44px;
    }
    /deep/ .van-button--danger {
      height: 44px;
      line-height: 44px;
      background-color: #d8182d;
      border: 1px solid #d8182d;
    }
  }
}
</style>

```

### 3-5 商品详情首页

- ![image-20210629210340689](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210629210340689.png)

第一步 css样式

```
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
      background: url("../assets/image/product/rectangle-left.png") no-repeat
        left center;
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
            width: 75px;
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
```

整体布局

```
<template>
  <div class="product-layout">
    <div class="product-detail">
      <!-- 轮播 -->
      <van-swipe :autoplay="2000" :height="350">
        <van-swipe-item
          v-for="(image, index) in productInfo.bannerList"
          :key="index"
        >
          <img v-if="image.imgUrl" :src="image.imgUrl" class="lazy_img" />
        </van-swipe-item>
        <span class="btn-left" @click="$router.go(-1)">
          <van-icon name="arrow-left" />
        </span>
      </van-swipe>
      <!-- 秒杀价格 -->
      <section v-if="isSpike" class="progress-bar">
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
              <i>{{hour? hourString+':'+minuteString+':'+secondString : minuteString+':'+secondString}}</i>
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
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="item-details">
        <span>宝贝详情</span>
        <img :src="productInfo.ProductDetail" class="detail-img" />
      </div>
    </div>

    <!-- product footer -->

    <van-action-bar>
      <van-action-bar-icon icon="shop-o" text="店铺" />
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-action-bar-button type="warning" text="加入购物车" />

      <van-action-bar-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      />
    </van-action-bar>
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs, computed} from "vue";
import { useRoute } from "vue-router";
import { getProduct } from "../api/miaosha";

export default {
  setup() {
    const isSpike = ref(true);
    const state = reactive({
      productInfo: {},
      hour: "",
      minute: "",
      second: "",
      promiseTimer: "",
    });
    const route = useRoute();
    const formatNum = (num) => {
      return num < 10 ? "0" + num : "" + num;
    };
    const countDown = () => {
      clearInterval(state.promiseTimer);
      setInterval(function () {
        if (state.hour === 0) {
          if (state.minute !== 0 && state.second === 0) {
            state.second = 59;
            state.minute -= 1;
          } else if (state.minute === 0 && state.second === 0) {
            state.second = 0;

            clearInterval(state.promiseTimer);
          } else {
            state.second -= 1;
          }
        } else {
          if (state.minute !== 0 && state.second === 0) {
            state.second = 59;
            state.minute -= 1;
          } else if (state.minute === 0 && state.second === 0) {
            state.hour -= 1;
            state.minute = 59;
            state.second = 59;
          } else {
            state.second -= 1;
          }
        }
      }, 1000);
    };
    onMounted(() => {
      const id = route.params.id;
      getProduct(id).then((res) => {
        console.log(res);
        state.productInfo = res.data.data;
        var nowtime = new Date();
        var endtime = new Date(state.productInfo.time);
        var lefttime = endtime.getTime() - nowtime.getTime();
        (state.hour = 
          Math.floor((lefttime / (1000 * 60 * 60)) % 24)
        ), //计算小时数
          (state.minute = Math.floor((lefttime / (1000 * 60)) % 60)), //计算分钟数
          (state.second = Math.floor((lefttime / 1000) % 60)) //计算秒数
        countDown();
      });
    });

  const hourString = computed(() =>{
    return formatNum(state.hour)
  })

  const minuteString = computed(() =>{
    return formatNum(state.minute)
  })

  const secondString = computed(() =>{
    return formatNum(state.second)
  }) 

    return {
      isSpike,
      formatNum,
      countDown,
      hourString,
      minuteString,
      secondString,
      ...toRefs(state),
    };
  },
};
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
      background: url("../assets/image/product/rectangle-left.png") no-repeat
        left center;
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
}
</style>

```

### 3-6 &3-7 vue3实现倒计时功能

第一步 获取剩余时间

结束时间  - 当前时间 = 剩余时间

```
 var nowtime = new Date()
        var endtime = new Date(state.productInfo.time)
        var lefttime = endtime.getTime() - nowtime.getTime()
```

第二步 时 分 秒 计算时间单位

```
 state.hour = Math.floor((lefttime / (1000 *60 *60)) % 24)
        state.minute = Math.floor((lefttime / (1000 *60))% 60 )
        state.second = Math.floor((lefttime / 1000) % 60)
```

第三步 逐秒递减

setInterval定时调用方法

```
    const countDown = () =>{
      clearInterval( state.promiseTimer)
      state.promiseTimer = setInterval(()=>{
        if(state.hour === 0){
            if(state.minute!==0 && state.second === 0) {
              state.second = 59
              state.minute -= 1
            } else if (state.minute ===0 && state.second === 0) {
              state.second = 0
              clearInterval( state.promiseTimer)
            } else {
              state.second -= 1
            }
        } else {
          if(state.minute!==0 && state.second === 0) {
              state.second = 59
              state.minute -= 1
          } else if(state.minute ===0 && state.second === 0) {
            state.hour -=1
            state.minute = 59
            state.second = 59
          } else {
              state.second -= 1
            }

        }
      },1000)
    }
```



### 3-8 computed实现倒计时格式

 computed 和 watch 有什么区别及运用场景?

**区别**

computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。计算属性将被加入到 Vue 实例中。所有 getter 和 setter 的 this 上下文自动地绑定为 Vue 实例,

通过计算出来的属性不需要调用直接可以在 DOM 里使用

watch 侦听器 : 更多的是「观察」的作用,**无缓存性**,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。

**运用场景**

运用场景：

当我们需要进行数值计算,并且依赖于其它数据时,应该使用 computed,因为可以利用 computed 的缓存特性,避免每次获取值时,都要重新计算。

当我们需要在数据变化时执行异步或开销较大的操作时,应该使用 watch,使用 watch 选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。watch适合的场景是一个数据影响多个数据



**总结**

- 如果一个数据需要经过复杂计算就用 computed
- 如果一个数据需要被监听并且对数据做一些操作就用 watch

**格式计算**

```
// 格式+0
    const formatNum = (num) =>{
        return num < 10 ? "0" + num : num
    }

    // 时间格式计算
    const hourString = computed(() =>{
       return formatNum(state.hour)
    })

     const minuteString = computed(() =>{
    return formatNum(state.minute)
  })

  const secondString = computed(() =>{
    return formatNum(state.second)
  }) 

```



### 3-9 popup可弹出的商品规格

```
<template>
  <div class="product-layout">
    <div class="product-detail">
      <!-- 轮播 -->
      <van-swipe :autoplay="2000" :height="350">
        <van-swipe-item
          v-for="(image, index) in productInfo.bannerList"
          :key="index"
        >
          <img v-if="image.imgUrl" :src="image.imgUrl" class="lazy_img" />
        </van-swipe-item>
        <span class="btn-left" @click="$router.go(-1)">
          <van-icon name="arrow-left" />
        </span>
      </van-swipe>
      <!-- 秒杀价格 -->
      <section v-if="isSpike" class="progress-bar">
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
              <i>{{hour? hourString+':'+minuteString+':'+secondString : minuteString+':'+secondString}}</i>
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
          <van-icon name="arrow" />
        </div>
        <!-- 商品规则popup -->
        <van-popup
      class="select-popup"
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '75%' }"
    >
       <section class="popup-content">
        <span class="close-icon" @click="show = false">
          <van-icon name="close"></van-icon>
        </span>
        <ul class="popup-top">
          <img :src="imgStr" />
          <li class="item-specification">
            <span class="item-price">￥568</span>
            <span class="item-count">库存2279件</span>
            <span class="item-colors">选择颜色；尺码</span>
          </li>
        </ul>
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
          <li class="popup-quantity">
            <span class="quantity-text">购买数量</span>
            <van-stepper
              v-model="stepperValue"
              input-width="31px"
              button-size="12px"
            />
          </li>
        </ul>
      </section>
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
    </van-popup>
      </div>
      <!-- 宝贝详情 -->
      <div class="item-details">
        <span>宝贝详情</span>
        <img :src="productInfo.ProductDetail" class="detail-img" />
      </div>
    </div>

    <!-- product footer -->

    <van-action-bar>
      <van-action-bar-icon icon="shop-o" text="店铺" />
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-action-bar-button type="warning" text="加入购物车" />

      <van-action-bar-button
        type="danger"
        text="立即购买"
        @click="onClickButton"
      />
    </van-action-bar>
  </div>
</template>

<script>
import { onMounted, ref, reactive, toRefs, computed} from "vue";
import { useRoute } from "vue-router";
import { getProduct } from "../api/miaosha";


export default {
 
  setup() {
    const isSpike = ref(true);
    const show = ref(false)
    const state = reactive({
      productInfo: {},
      hour: "",
      minute: "",
      second: "",
      promiseTimer: "",
      listId:'',
      imgStr:'',
      color:''
    });
    const route = useRoute();
    const formatNum = (num) => {
      return num < 10 ? "0" + num : "" + num;
    };
    const countDown = () => {
      clearInterval(state.promiseTimer);
      setInterval(function () {
        if (state.hour === 0) {
          if (state.minute !== 0 && state.second === 0) {
            state.second = 59;
            state.minute -= 1;
          } else if (state.minute === 0 && state.second === 0) {
            state.second = 0;

            clearInterval(state.promiseTimer);
          } else {
            state.second -= 1;
          }
        } else {
          if (state.minute !== 0 && state.second === 0) {
            state.second = 59;
            state.minute -= 1;
          } else if (state.minute === 0 && state.second === 0) {
            state.hour -= 1;
            state.minute = 59;
            state.second = 59;
          } else {
            state.second -= 1;
          }
        }
      }, 1000);
    };
    onMounted(() => {
      const id = route.params.id;
      getProduct(id).then((res) => {
        console.log(res);
        state.productInfo = res.data.data;
         state.imgStr = state.productInfo.listData[0].imgSrc
        state.color = state.productInfo.listData[0].color
        var nowtime = new Date();
        var endtime = new Date(state.productInfo.time);
        var lefttime = endtime.getTime() - nowtime.getTime();
        (state.hour = 
          Math.floor((lefttime / (1000 * 60 * 60)) % 24)
        ), //计算小时数
          (state.minute = Math.floor((lefttime / (1000 * 60)) % 60)), //计算分钟数
          (state.second = Math.floor((lefttime / 1000) % 60)) //计算秒数
        countDown();

      });
    });

  const hourString = computed(() =>{
    return formatNum(state.hour)
  })

  const minuteString = computed(() =>{
    return formatNum(state.minute)
  })

  const secondString = computed(() =>{
    return formatNum(state.second)
  }) 

  
     // 展示冒泡
    const showPopup = () => {
      show.value = true;
    };

      // 选择颜色
    const handleSelected = item => {
      state.listId = item.listId
      state.imgStr = item.imgSrc
      state.color = item.color
    };

    return {
      isSpike,
      show,
      formatNum,
      countDown,
      hourString,
      minuteString,
      secondString,
      showPopup,
      handleSelected,
      ...toRefs(state),
    };
  },
};
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
      background: url("../assets/image/product/rectangle-left.png") no-repeat
        left center;
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
            width: 75px;
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

```

## 4 vuex实现购物车模块

### 4-1 了解下vuex4使用

安装vuex4

```
yarn add vuex@next
```

vuex4兼容 vue3

用法和之前大同小异

创建 store 之前是通过 new 实例来创建，现在是通过 createStore 这个工厂函数来创建实例

vuex3

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
   
  },
  mutations: {
    
  }
})
```

vuex4

```

import { createStore } from 'vuex'

// 创建 store 容器实例.
export default createStore({
  state () {
 
  },
  mutations: {
   
  }
})

```

在 setup() 内部，this 不会是该活跃实例的引用，所以如果是在 setup 函数中，需要使用 useStore 函数。这是一个新增的 API 

```
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
  }
}
```

使用

```
   // 添加购物车
    const AddCart = () =>{
        store.commit('set_count') //mutations
        state.badge = store.state.count //state
    }
```

### 4-2 mutations 添加购物车

> **前言**
>
> 1商品详情页面 初始化 商品规格 color
>
> 2 badge在初始化页面加载



vuex中mutations添加购物车函数

```
    // 添加商品进购物车
        AddGood(state,data) {
          let datas ={
              title:data.title,
              imgSrc:data.imgSrc,
              num:1,
              color:data.color,
              price:data.price,
              selected:true,
              id:data.id,
              listId:data.listId
          }

          let index = -1
          index = state.cartList.findIndex(item=>{
              return item.id == data.id && item.listId == data.listId
          })

        

          if(index==-1) {
              state.cartList.push(datas)
          } else{
              state.cartList[index].num++
          }
          Toast.success('添加成功')
        },
```

### 4-3 购物车界面

```
<template>
  <div class="shop-cart">
    <!-- header -->
    <header class="page-header">
      <div class="header-content">购物车</div>
      <span v-if="cartMode === false" class="appeal-record" @click="setCartMode"
        >完成</span
      >
      <span v-if="cartMode === true" class="appeal-record" @click="setCartMode"
        >编辑</span
      >
    </header>
    <!-- content -->
    <!-- 购物车无商品 -->
    <div class="cart-empty" v-if="emptyCart === true">
      <ul class="empty-content">
        <li class="img-cart">
          <van-icon name="cart-o" size="100" />
        </li>
        <li class="item-text">
          <p>您的购物车空空如也</p>
          <p>去看看心仪的商品</p>
        </li>
        <li class="item-btn">
          <router-link to="/" class="hairline-btn" tag="span"
            >立即去购物</router-link
          >
        </li>
      </ul>
    </div>
    <!-- 购物车有商品 -->
    <div v-else>
      <div class="order-card">
        <van-checkbox-group class="order-list">
            <div v-for="(item, index) in cartList" :key="index">
          <div class="order-info">
            <!-- 商品选择 -->
            <li class="check-item">
                <van-checkbox
                :key="index"
                checked-color="#91c958"
                :name="item"></van-checkbox>
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
                <van-stepper v-model="item.num" @plus="plus(item.id,item.listId)" @minus="minus(item.id,item.listId)"></van-stepper>
              </div>
            </li>
          </div>
        </div>
        </van-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const cartMode = ref(true);
    const emptyCart = ref(true);
    const state = reactive({
      cartList: [],
    });
    //切换完成和编辑
    const setCartMode = () => {
      cartMode.value = !cartMode.value;
    };
    // 购物车num加
    const plus = (id,listId)=>{
        const data = {
            id:id,
            listId:listId
        }

        store.commit("PlusNum",data)
        console.log(store.state.cartList)
    }

    // 购物车num减
     const minus = (id,listId)=>{
        const data = {
            id:id,
            listId:listId
        }

        store.commit("MinusNum",data)
        console.log(store.state.cartList)
    }

    // 页面初始化
    onMounted(() => {
      state.cartList = store.state.cartList;
      if (state.cartList.length == 0) {
        emptyCart.value = true;
      } else {
        emptyCart.value = false;
      }
    });

    // 输出
    return {
      cartMode,
      emptyCart,
      ...toRefs(state),
      setCartMode,
      plus,
      minus

    };
  },
};
</script>

<style lang="scss" scoped >
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
```



### 4-4 商品数量加减

![image-20210706231552851](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210706231552851.png)

购物车css样式

```
<style lang="scss" scoped >
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
```

![image-20210707002015012](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210707002015012.png)

在store index.js中

```
       // 购物车商品num+
        PlusNum(state,data) {
            const {id ,listId} = data
            let index = state.cartList.findIndex(item=>{
                return item.id == id && item.listId == listId
            })

            state.cartList[index].num++
            state.count++
        },
        // 购物车商品num-
        MinusNum(state,data) {
            const {id ,listId} = data
            let index = state.cartList.findIndex(item=>{
                return item.id == id && item.listId == listId
            })

            state.cartList[index].num--
            state.count--
        }

```

在cart.vue 的script中

```
    // 购物车num加
    const plus = (id,listId)=>{
        const data = {
            id:id,
            listId:listId
        }

        store.commit("PlusNum",data)
        console.log(store.state.cartList)
    }

    // 购物车num减
     const minus = (id,listId)=>{
        const data = {
            id:id,
            listId:listId
        }

        store.commit("MinusNum",data)
        console.log(store.state.cartList)
    }
```

### 4-5 购物车单选和全选

> **目标** 

完成购物车单选和全选功能并且联动

![image-20210712145221042](https://gitee.com/calvin08/typora-img/raw/master/img/image-20210712145221042.png)



> **思路**

[Checkbox]: https://vant-contrib.gitee.io/vant/v3/#/zh-CN/checkbox

绑定cart.vue页面中cartList.selected

- [ ] v-model
- [ ] change

单选 

在van-check-box添加绑定事件

```
v-model="item.selected"
@change="select(item.id,item.listId)"
```

单选

在vuex的mutations中添加单选改变事件SELECT

```
      // 单选
         SELECT(state,data) {
            const {id,listId} = data

          let index = state.cartList.findIndex(item=>{
                return item.id == id && item.listId == listId
            })

            !state.cartList[index].selected 

          
        },
```







全选

```
    // 多选
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
```

cart.vue内容

```
<template>
  <div class="shop-cart">
    <!-- header -->
    <header class="page-header">
      <div class="header-content">购物车</div>
      <span v-if="cartMode === false" class="appeal-record" @click="setCartMode"
        >完成</span
      >
      <span v-if="cartMode === true" class="appeal-record" @click="setCartMode"
        >编辑</span
      >
    </header>
    <!-- content -->
    <!-- 购物车无商品 -->
    <div class="cart-empty" v-if="emptyCart === true">
      <ul class="empty-content">
        <li class="img-cart">
          <van-icon name="cart-o" size="100" />
        </li>
        <li class="item-text">
          <p>您的购物车空空如也</p>
          <p>去看看心仪的商品</p>
        </li>
        <li class="item-btn">
          <router-link to="/" class="hairline-btn" tag="span"
            >立即去购物</router-link
          >
        </li>
      </ul>
    </div>
    <!-- 购物车有商品 -->
    <div v-else>
      <div class="order-card">
        <div class="order-list">
            <div v-for="(item, index) in cartList" :key="index">
          <div class="order-info">
            <!-- 商品选择 -->
            <li class="check-item">
                <van-checkbox
                
                checked-color="#d8182d"
                v-model="item.selected"
                
                @change="selected(item.id,item.listId)"
                ></van-checkbox>
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
                <van-stepper v-model="item.num" @plus="plus(item.id,item.listId)" @minus="minus(item.id,item.listId)"></van-stepper>
              </div>
            </li>
          </div>
        </div>
        </div>
      </div>
    </div>
    <!-- 底部tabar -->
    <div v-if="emptyCart === false">
      <section v-if="cartMode" class="options-edit">
        <van-submit-bar
          :price="allPrice"
          button-text="结算"
          @submit="submitSettlement"
        >
          <van-checkbox v-model="allSelect" checked-color="#d8182d"
          @change="changeAllSelect"
            >全选</van-checkbox
          >
        </van-submit-bar>
      </section>
      <section v-else class="options-delete">
        <van-submit-bar button-text="删除" @submit="submitDelete">
          <van-checkbox v-model="allSelect" checked-color="#d8182d"
           @click="changeAllSelect"
           
            >全选</van-checkbox
          >
        </van-submit-bar>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, toRefs} from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    // 完成&编辑
    const cartMode = ref(true);
    // 判断购物车是否为空
    const emptyCart = ref(true);
  
    // 获取购物车数据
    const state = reactive({
      allSelect:store.state.all_select,
      cartList:store.state.cartList,
      allPrice:store.getters.allMoney
    })
    

    
    //切换完成和编辑
    const setCartMode = () => {
      cartMode.value = !cartMode.value;
    };
    // 购物车num加
    const plus = (id,listId)=>{
        const data = {
            id:id,
            listId:listId
        }

        store.commit("PlusNum",data)
        console.log(store.state.cartList)
        console.log(state.cartList)
    }

    // 购物车num减
     const minus = (id,listId)=>{
        const data = {
            id:id,
            listId:listId
        }

        store.commit("MinusNum",data)
        console.log(store.state.cartList)
         console.log(state.cartList)
    }

    // 单选
    const selected = (id,listId) =>{
        const data = {
            id:id,
            listId:listId
        }

        store.commit('SELECT',data)
       let allChecked=state.cartList.every((item)=>{
                return item.selected==true
            })

            let allNotChecked = state.cartList.every((item)=>{
                return item.selected==false
            })
                
            if(allChecked){       //如果全部选中，则全选状态也改变
                state.allSelect=true
            }else if(allNotChecked){   
                state.allSelect=false
            }
        console.log(store.state.all_select)
        console.log(state.allSelect)
      
    }
 
 
  // 多选改变
  const changeAllSelect = () =>{
      store.commit('SELECTALL')
        console.log(store.state.cartList)
        console.log(store.state.all_select)
  }
 
    
    // 页面初始化
    onMounted(() => {
      
      if (state.cartList.length == 0) {
        emptyCart.value = true;
      } else {
        emptyCart.value = false;
      }
    });

    // 输出
    return {
      cartMode,
      emptyCart,
      selected,
      changeAllSelect,
     ...toRefs(state),
      setCartMode,
      plus,
      minus,

    };
   
  },

 
 
  
};
</script>

<style lang="scss" scoped >
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
```

### 4-6 合计金额

<!--解决bug badge 为0的时候显示为空--> 

在store的index.js中 添加getters计算属性,

当count为0时候返回null

```
            count(state) {
                if(state.count == 0) {
                    return  null
                } else {
                    return state.count
                }
            },
```

在product.vue商品详情页面绑定getters

```
  const state = reactive({
      productInfo: {},
      hour: "",
      minute: "",
      second: "",
      promiseTimer: "",
      imgStr: "",
      listId: "",
      color: "",
      price:"",
      badge:store.getters.count
    });
```

<!--合计金额计算-->

首先在store当中 getters 计算

```

             //选中商品的合计金额
             allMoney(state){
                let all_money=0
                state.cartList.forEach((item)=>{
                    if(item.selected){
                        all_money+=item.num*item.price
                    }
                })
                return state.all_money=all_money
            },
    
```

然后在cart.vue中引入computed技术属性allPrice

```
// 购物车结算价格
  const allPrice = computed(()=>{
      return store.getters.allMoney * 100
  })
```

总结:computed是基于依赖进行缓存,当依赖值发生变化,触发computed重新计算



### 4-7 购物车删除

<!--cart.vue中添加删除事务-->

```
// 删除购物车
  const submitDelete = () =>{

      let flag = state.cartList.some((item) =>{
                return item.selected == true
            })

            if(!flag) {
                Toast.fail('请至少选择一个商品')
            } else {
                Dialog.confirm({
                    title:"确定从购物车中删除吗？"

                }).then(()=>{
                    console.log("点击了确认按钮噢")
                   
                    state.cartList = state.cartList.filter(item =>{
                                return item.selected != true
                        })
                       
                        store.dispatch('DELETE')
                           
                     
                                    

                })
            }
        
  

      
      
  }
      
```

<!--在store 中mutation 添加DELETE-->

```
   // 删除
        DELETE(state) {
            state.cartList = state.cartList.filter(item =>{
                return item.selected != true
        })
        }
```

然后在actions中更新count

```
 actions:{
            DELETE(context) {
                context.commit('DELETE')
                context.getters.count
            }
        }
```

改变badge的值

