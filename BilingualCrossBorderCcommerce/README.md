# 跨境电商双语uniApp+H5

#### 介绍
跨境电商双语uniAPP+H5

#### h5打包配置

路由模式：history

路径：/h5/

#### 常用公共代码

#####  时间搓

```vue
<view>{{$filter.to_date_time(shopCont.addtime)}}</view>
```

##### 价格小数点前后不一致

```vue
<text>RM<text>{{$filter.formatValue(shopCont.pay_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.pay_price, 'split')[1] ? $filter.formatValue(shopCont.pay_price, 'split')[1] : '00'}}</text>
```

##### 连点

```vue
<template>
   <button @click.stop="$noMultipleClicks(onLoginEmailLogin)">按钮</button>
</template>
<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
    }
  },
  onShow () { },
  methods: {}
}
</script>
```
