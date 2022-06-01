const tabList = [
  {
    title: '10:00',
    name: '抢购中',
    state: 0,
    cardList: [
      {
        id: 11,
        title: 'Apple Watch Series 6智能手表 GPS+蜂窝款',
        img: 'http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg',
        name: '【618好物尽兴收】限量好物第一波',
        price: '￥5999',
        oldPrice: '￥6299',
        progress: '18'
      },
      {
        id: 22,
        title: '华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg',
        name: '【双屏双触控，价保618】创新副屏设计',
        price: '￥9969',
        oldPrice: '￥10999',
        progress: '38'
      },
      {
        id: 33,
        title: '惠普(HP)战66 商用办公台式机电脑整机',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg',
        name: '【618抢鲜购】战99高性能台式机',
        price: '￥3169',
        oldPrice: '￥3599',
        progress: '50'
      },
      {
        id: 44,
        title: '小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg',
        name: '小米11青春6月1-6月20日享白条12期免息',
        price: '￥2569',
        oldPrice: '￥2699',
        progress: '28'
      },
      {
        id: 55,
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      }
    ]

  },
  {
    title: '12:00',
    name: '即将开始',
    state: 1,
    cardList: [
      {
        title: 'Apple Watch Series 6智能手表 GPS+蜂窝款',
        img: 'http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg',
        name: '【618好物尽兴收】限量好物第一波',
        price: '￥5999',
        oldPrice: '￥6299',
        progress: '18'
      },
      {
        title: '华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg',
        name: '【双屏双触控，价保618】创新副屏设计',
        price: '￥9969',
        oldPrice: '￥10999',
        progress: '38'
      },
      {
        title: '惠普(HP)战66 商用办公台式机电脑整机',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg',
        name: '【618抢鲜购】战99高性能台式机',
        price: '￥3169',
        oldPrice: '￥3599',
        progress: '50'
      },
      {
        title: '小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg',
        name: '小米11青春6月1-6月20日享白条12期免息',
        price: '￥2569',
        oldPrice: '￥2699',
        progress: '28'
      },
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      }
    ]

  },
  {
    title: '14:00',
    name: '即将开始',
    state: 2,
    cardList: [
      {
        title: 'Apple Watch Series 6智能手表 GPS+蜂窝款',
        img: 'http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg',
        name: '【618好物尽兴收】限量好物第一波',
        price: '￥5999',
        oldPrice: '￥6299',
        progress: '18'
      },
      {
        title: '华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg',
        name: '【双屏双触控，价保618】创新副屏设计',
        price: '￥9969',
        oldPrice: '￥10999',
        progress: '38'
      },
      {
        title: '惠普(HP)战66 商用办公台式机电脑整机',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg',
        name: '【618抢鲜购】战99高性能台式机',
        price: '￥3169',
        oldPrice: '￥3599',
        progress: '50'
      },
      {
        title: '小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg',
        name: '小米11青春6月1-6月20日享白条12期免息',
        price: '￥2569',
        oldPrice: '￥2699',
        progress: '28'
      },
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      }
    ]
  },
  {
    title: '16:00',
    name: '即将开始',
    state: 3,
    cardList: [
      {
        title: 'Apple Watch Series 6智能手表 GPS+蜂窝款',
        img: 'http://img13.360buyimg.com/n7/jfs/t1/123755/39/12679/153400/5f616a18E20f6f089/4a4e4d2521d5b5ac.jpg',
        name: '【618好物尽兴收】限量好物第一波',
        price: '￥5999',
        oldPrice: '￥6299',
        progress: '18'
      },
      {
        title: '华硕(ASUS) 灵耀X双屏 11代酷睿14英寸轻薄笔记本',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176157/12/12972/361644/60ba0688E25c541e2/1319d9154af318d0.jpg',
        name: '【双屏双触控，价保618】创新副屏设计',
        price: '￥9969',
        oldPrice: '￥10999',
        progress: '38'
      },
      {
        title: '惠普(HP)战66 商用办公台式机电脑整机',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/176431/21/12295/77496/60b49785E83b18660/615be33318aa28db.jpg',
        name: '【618抢鲜购】战99高性能台式机',
        price: '￥3169',
        oldPrice: '￥3599',
        progress: '50'
      },
      {
        title: '小米11青春版 骁龙780G处理器 AMOLED柔性直屏 8GB+256GB',
        img: '//img12.360buyimg.com/n1/s450x450_jfs/t1/191961/14/6525/140890/60ba09e6Ee89a8ad6/ce4afe122da0a8ae.jpg',
        name: '小米11青春6月1-6月20日享白条12期免息',
        price: '￥2569',
        oldPrice: '￥2699',
        progress: '28'
      },
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      }
    ]
  },
  {
    title: '18:00',
    name: '即将开始',
    state: 4,
    cardList: [
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      },
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      },
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      },
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      },
      {
        title: '【玻尿酸巨补水新款面膜】大大发送的发送到发顺丰',
        img: '//img11.360buyimg.com/n1/jfs/t1/190365/10/6883/117909/60bcea01E63b0fe9d/61d386c9938efc7d.jpg',
        name: '迪丽热巴同款',
        price: '￥200',
        oldPrice: '￥399',
        progress: '15'
      }
    ]
  }
]

export default tabList
