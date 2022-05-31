import instance from './request'

export const getTabs = () => {
  return instance({
    url: '/getTabs',
    method: 'Get'
  })
}
