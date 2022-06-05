/* eslint-disable */
import Mock from 'mockjs'
import tabList from './json/tab'
// eslint-disable-next-line camelcase
import { productInfo_11, productInfo_22 } from './json/product'

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

// product数据获取
Mock.mock(
  '/api/getProduct',
  'get',
  (req) => {
    const id = req.body
    if (id == 11) {
      return {
        code: 200,
        msg: 'success',
        data: productInfo_11
      }
    } else if (id == 22) {
      return {
        code: 200,
        msg: 'success',
        data: productInfo_22
      }
    }
  }
)
