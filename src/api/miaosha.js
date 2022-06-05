import instance from './request'

export const getTabs = () => {
  return instance({
    url: '/getTabs',
    method: 'Get'
  })
}

export const getProduct = (res) => {
  return instance({
    url: '/getProduct',
    method: 'GET',
    data: res
  })
}
