import Mock from 'mockjs'
import tabList from './json/tab'

// tab数据
Mock.mock(
  '/api/getTabs',
  'get',
  () => {
    return {
      code: 200,
      msg: 'success',
      data: tabList
    }
  }

)
