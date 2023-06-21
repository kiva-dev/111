<template>
	<view class="detail-page">
		<!--右上角分享 start-->
		<view class="detail-share" @click="toggle2('bottom')">
			<image class="img" src="../../static/images/share1.png"></image>
		</view>
		<!--右上角分享 end-->
		<!--轮播图 start-->
		<view class="detail-big">
			<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="GoodsCont.images" :current="current"
				:mode="mode" field="content">
				<swiper class="swiper-box" autoplay="true" :circular="true" @change="change">
					<swiper-item v-for="(item, index) in GoodsCont.images" :key="index">
						<view :class="item.colorClass" class="swiper-item">
							<view class="big-img">
								<image class="image img" :src="item" mode="aspectFill" :draggable="false"
									@click="onBanner(index)" />
							</view>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<!--轮播图 end-->
		<!--商品标题信息 start-->
		<view class="detail-head">
			<view class="head-hd">
				<view class="price">
					RM<text
						class="f-34">{{$filter.formatValue(price, 'split')[0]}}</text>.{{$filter.formatValue(price, 'split')[1] ? $filter.formatValue(price, 'split')[1] : '00'}}
				</view>
				<view class="detail-follow" @click="onMineFocus(1)">
					<view class="icon">
						<image class="img" v-if="GoodsCont.is_goods_focus==1" src="../../static/images/auc1.png">
						</image>
						<image class="img" v-else src="../../static/images/xin.png"></image>
					</view>
					<text v-if="GoodsCont.is_goods_focus==1">{{$t('home.shop.queryguanzhu')}}</text>
					<text v-else>{{$t('home.shop.guanzhu')}}</text>
				</view>
			</view>
			<view class="head-bd">
				<view class="tag">{{GoodsCont.tag_name}}</view>
				<text>{{GoodsCont.goods_name}}</text>
			</view>
		</view>
		<!--商品标题信息 end-->
		<!--规格 start-->
		<view class="detail-one">
			<view class="one-li" @click="toggle1('bottom')">
				<view class="li-fl">
					<view class="label">{{$t('home.shop.gueige')}}</view>
					<view class="c">
						<block v-for="(item,index) in attrs" :key="{index}">
							<block v-if="index!=0">，</block>{{item}}
						</block>
					</view>
				</view>
				<view class="more">
					<image class="img" src="../../static/images/detail3.png"></image>
				</view>
			</view>
			<view class="one-li">
				<view class="li-fl">
					<view class="label">{{$t('home.shop.yunfei')}}</view>
					<view class="c">{{$t('home.shop.mianyunfei')}}</view>
				</view>
			</view>
		</view>
		<!--规格 end-->
		<!--评价 start-->
		<view class="detail-four" v-if="JudgeList.length">
			<view class="detail-title">
				<view class="t flex">{{$t('home.shop.pingjia')}}<text
						class="f-22 m-l-15">{{total}}{{$t('home.shop.tiao')}}</text></view>
				<view class="more" @click="navClick('appraise?id='+GoodsCont.goods_id)">
					<text>{{$t('home.shop.haopingdu')}} {{GoodsCont.judge_rate}}%</text>
					<view class="icon">
						<image class="img" src="../../static/images/detail3.png"></image>
					</view>
				</view>
			</view>
			<JudgeList :JudgeList="JudgeList"></JudgeList>
			<button class="four-btn"
				@click="navClick('appraise?id='+GoodsCont.goods_id)">{{$t('home.shop.chakanpingjia')}}</button>
		</view>
		<!--评价 end-->
		<!--店铺信息 start-->
		<view class="detail-five" v-if="GoodsCont.shop">
			<view class="five-hd" @click="navClick('shop/shop')">
				<view class="hd-fl">
					<view class="logo">
						<image class="img" :src="GoodsCont.shop.shop_logo"></image>
					</view>
					<view class="txt">
						<view class="t">{{GoodsCont.shop.shop_name}}</view>
						<view class="c">{{GoodsCont.shop.shop_info}}</view>
					</view>
				</view>
				<view class="more" @click="onshopCont">
					<image class="img" src="../../static/images/detail3.png"></image>
				</view>
			</view>
			<view class="five-bd">
				<view class="bd-li" @click="onMineFocus(2)">
					<view class="icon">
						<image class="img" v-if="GoodsCont.shop.is_shop_focus==1" src="../../static/images/detail1.png">
						</image>
						<image class="img" v-else src="../../static/images/xin.png"></image>
					</view>
					<text v-if="GoodsCont.shop.is_shop_focus==1">{{$t('home.shop.queryguanzhu')}}</text>
					<text v-else>{{$t('home.shop.guanzhu')}}</text>
				</view>
				<view class="bd-li" @click="onshopCont">
					<view class="icon">
						<image class="img" src="../../static/images/detail2.png"></image>
					</view>
					<text>{{$t('home.shop.guangguang')}}</text>
				</view>
			</view>
		</view>
		<!--店铺信息 end-->
		<!--商品详情 start-->
		<view class="detail-six">
			<view class="six-tit">
				<view class="line">
					<image class="img" src="../../static/images/detail6.png"></image>
				</view>
				<text>{{$t('home.shop.title')}}</text>
				<view class="line">
					<image class="img" src="../../static/images/detail7.png"></image>
				</view>
			</view>
			<view class="six-article" v-if="isShopCont" v-html="GoodsCont.english_content"></view>
			<view class="six-article" v-else v-html="GoodsCont.content"></view>
		</view>
		<!--商品详情 end-->
		<!--detail-fixed start-->
		<view class="detail-fixed">
			<view class="fixed-con">
				<view class="fixed-fl">
					<view class="li" @click="onshopCont">
						<view class="icon">
							<image class="img" src="../../static/images/icon11.png"></image>
						</view>
						<view class="t">{{$t('home.shop.dianpu')}}</view>
					</view>
					<view class="li" @click="onkefyu">
						<view class="icon">
							<image class="img" src="../../static/images/icon12.png"></image>
						</view>
						<view class="t">{{$t('home.shop.kefu')}}</view>
					</view>
					<view class="li" @click="onGoShop">
						<view class="icon">
							<image class="img" src="../../static/images/icon15.png"></image>
						</view>
						<view class="t">{{$t('home.shop.shpping')}}</view>
					</view>
				</view>
				<view class="fixed-fr">
					<view class="detail-btn orange" @click="toggle1('bottom')">{{$t('home.shop.addto')}}</view>
					<view class="detail-btn" @click="toggle1('bottom')">{{$t('home.shop.buynow')}}</view>
				</view>
			</view>
		</view>
		<!--detail-fixed end-->
		<!--购买弹出 start-->
		<uni-popup ref="popup1" type="bottom">
			<view class="rule-pop">
				<view class="pop-close" @click="toggle1Close">
					<image class="img" src="../../static/images/close1.png"></image>
				</view>
				<!--pop-hd start-->
				<view class="pop-hd">
					<view class="hd-img">
						<image class="img" :src="spec_image"></image>
					</view>
					<view class="hd-txt">
						<view class="t">{{GoodsCont.goods_name}}</view>
						<view class="c">
							<block v-for="(item,index) in attrs" :key="{index}">
								<block v-if="index!=0">，</block>{{item}}
							</block>
						</view>
						<view class="price">¥<text class="f-30">{{price}}</text></view>
					</view>
				</view>
				<!--pop-hd end-->
				<!--pop-li start-->
				<view v-for="item,k in GoodsCont.spec_list" :key="k" class="pop-li">
					<view class="li-t">{{item.spec_name}}</view>
					<view class="li-tags">
						<block v-for="items,j in item.attr" :key="j">
							<view class="tag" :class="items.isShow?'active':''" @click="onShopSKUClick(item,items)">
								{{items.spec_value}}</view>
						</block>
					</view>
				</view>
				<!--pop-li end-->
				<!--pop-num start-->
				<view class="pop-num">
					<view class="t">{{$t('home.shop.shuliang')}}</view>
					<view class="num-coum">
						<button class="coum-btn" @click="onJian">-</button>
						<input class="coum-input" v-model="num" disabled />
						<button class="coum-btn last" @click="onJia">+</button>
					</view>
				</view>
				<!--pop-num end-->
				<!--pop-bot start-->
				<view class="pop-bot">
					<button class="public-btn" style="background:#FFB202;"
						@click="onAddClick">{{$t('home.shop.addto')}}</button>
					<button class="public-btn" @click="onGoPay">{{$t('home.shop.buynow')}}</button>
				</view>
				<!--pop-bot end-->
			</view>
		</uni-popup>
		<!--购买弹出 start-->
		<!--分享弹出 start-->
		<uni-popup ref="popup2" type="bottom">
			<view class="share-pop">
				<view class="share-t">
					<block v-if="isShopCont">Share to</block>
					<block v-else>分享到</block>
				</view>
				<view class="share-ul">
					<view class="share-li" @click="ontweet">
						<view class="icon">
							<image class="img" src="../../static/images/share21.png"></image>
						</view>
						<view class="t">twitter</view>
					</view>
					<!-- <view class="share-li">
            <view class="icon">
              <image class="img" src="../../static/images/share22.png"></image>
            </view>
            <view class="t">Google</view>
          </view> -->
					<view class="share-li" @click="onfacebook">
						<view class="icon">
							<image class="img" src="../../static/images/share23.png"></image>
						</view>
						<view class="t">Facebook</view>
					</view>
					<!-- <view class="share-li">
            <view class="icon">
              <image class="img" src="../../static/images/share24.png"></image>
            </view>
            <view class="t">微信</view>
          </view> -->
					<view class="share-li" @click="onFuzhi">
						<view class="icon">
							<image class="img" src="../../static/images/share25.png"></image>
						</view>
						<view class="t">
							<block v-if="isShopCont">Copy Link</block>
							<block v-else>复制链接</block>
						</view>
					</view>
				</view>
				<view class="share-bot">
					<button class="share-btn" @click="toggle2Close">
						<block v-if="isShopCont">cancel</block>
						<block v-else>取消</block>
					</button>
				</view>
			</view>
		</uni-popup>
		<!--分享弹出 end-->
		<!--联系客服弹出 start-->
		<uni-popup ref="popup3" type="center">
			<view class="email-cont">
				<image class="query" @click="onQuery" src="../../static/images/close1.png"></image>
				<view class="title">{{$t('kefu.title')}}</view>
				<view class="cont">
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>cs-reply@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>info@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>reply@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>support@kolibrimall.com
					</view>
					<view class="list">
						<image class="invite-tobu" src="../../static/email.png"></image>help@kolibrimall.com
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import JudgeList from '@/components/judgeList'
	export default {
		components: {
			JudgeList
		},
		data() {
			return {
				current: 0, // 轮播图值
				mode: 'nav',
				GoodsCont: '', // 详情
				price: '', // 选中的价格
				spec_image: '', // 选中的商品图片
				attrs: [], // 属性值
				spec_sku_id: '', // sku属性id组合
				goods_spec_id: '', // skuid
				stock_num: '', // 库存
				isShopCont: false, // 商品详情显示中文还是英文
				num: 1, // 购买数量
				shopCont: '', // 选中的规格
				JudgeList: [], // 评价列表
				total: 0, // 评价总条数
				id: ''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			// 请求商品详情
			this.$http.post(this.$apiObj.IndexGoodsDetail, {
				goods_id: e.id
			}).then(res => {
				if (res.code == 1) {
					res.data.spec_list.map(item => {
						item.attr.map(items => {
							items.isShow = false
							res.data.now_sku.attrs.map(itemss => {
								if (itemss == items.spec_value) {
									items.isShow = true
								}
							})
						})
					})
					if (this.isShopCont) {
						res.data.goods_name = this.getCaption(res.data.goods_name, 1) ? this.getCaption(res.data
							.goods_name, 1) : res.data.goods_name
						res.data.tag_name = this.getCaption(res.data.tag_name, 1) ? this.getCaption(res.data
							.tag_name, 1) : res.data.tag_name
						res.data.sku_list.map(item => {
							item.attrs[0] = this.getCaption(item.attrs[0], 1) ? this.getCaption(item.attrs[
								0], 1) : item.attrs[0]
						})
						res.data.now_sku.attrs[0] = this.getCaption(res.data.now_sku.attrs[0], 1) ? this
							.getCaption(res.data.now_sku.attrs[0], 1) : res.data.now_sku.attrs[0]
						res.data.spec_list.map(item => {
							item.spec_name = this.getCaption(item.spec_name, 1) ? this.getCaption(item
								.spec_name, 1) : item.spec_name
							item.attr.map(items => {
								items.spec_value = this.getCaption(items.spec_value, 1) ? this
									.getCaption(items.spec_value, 1) : items.spec_value
							})
						})
					} else {
						res.data.goods_name = this.getCaption(res.data.goods_name, 0) ? this.getCaption(res.data
							.goods_name, 0) : res.data.goods_name
						res.data.tag_name = this.getCaption(res.data.tag_name, 0) ? this.getCaption(res.data
							.tag_name, 0) : res.data.tag_name
						res.data.sku_list.map(item => {
							item.attrs[0] = this.getCaption(item.attrs[0], 0) ? this.getCaption(item.attrs[
								0], 0) : item.attrs[0]
						})
						res.data.now_sku.attrs[0] = this.getCaption(res.data.now_sku.attrs[0], 0) ? this
							.getCaption(res.data.now_sku.attrs[0], 0) : res.data.now_sku.attrs[0]
						res.data.spec_list.map(item => {
							item.spec_name = this.getCaption(item.spec_name, 0) ? this.getCaption(item
								.spec_name, 0) : item.spec_name
							item.attr.map(items => {
								items.spec_value = this.getCaption(items.spec_value, 0) ? this
									.getCaption(items.spec_value, 0) : items.spec_value
							})
						})
					}
					res.data.content = this.onHtmlcont(res.data.content)
					res.data.english_content = this.onHtmlcont(res.data.english_content)
					this.GoodsCont = res.data // 全部
					this.shopCont = res.data.now_sku
					this.price = res.data.now_sku.goods_price // 选中的价格
					this.spec_image = res.data.now_sku.spec_image // 选中的图片
					this.attrs = res.data.now_sku.attrs // 属性值
					this.spec_sku_id = res.data.now_sku.spec_sku_id // sku属性id组合
					this.goods_spec_id = res.data.now_sku.goods_spec_id // skuid
					this.stock_num = res.data.now_sku.stock_num // 库存
				}
			})
			// 评价列表
			this.$http.post(this.$apiObj.OrderGoodsJudgeList, {
				goods_id: e.id,
				type: 1,
				page: 1,
				pagenum: 2
			}).then(res => {
				if (res.code == 1) {
					this.total = res.data.list.total
					this.JudgeList = res.data.list.data
				}
			})
		},
		methods: {
			getCaption(str, state) {
				if (state == 1) {
					if (str == undefined) {
						str = str
					} else {
						var indexs = str.indexOf("|")
						str = str.substring(indexs + 1, str.length);
					}
				} else {
					var index = str.indexOf("|")
					str = str.substring(0, index);
				}
				return str;
			},
			onkefyu() {
				this.$refs.popup3.open()
				// uni.navigateTo({
				//   url: '/pages/mine/custom?uuid=' + this.GoodsCont.shop.id + '&avatar=' + uni.getStorageSync('userCont').avatar
				// })
			},
			onQuery() {
				this.$refs.popup3.close()
			},
			onHtmlcont(html) {
				let richtext = html
				const regex = new RegExp('<img', 'gi');
				richtext = richtext.replace(regex, '<img style="max-width: 100%;"');
				const regex1 = new RegExp('data-fail="0" style="', 'gi');
				richtext = richtext.replace(regex1, 'data-fail="0" style="max-width: 100%;');
				return richtext
			},
			// 跳转店铺
			onshopCont() {
				uni.setStorageSync('shop_id', this.GoodsCont.shop.id)
				uni.navigateTo({
					url: '/pages/class/shop/shop'
				});
			},
			// 点击跳转购物车
			onGoShop() {
				uni.switchTab({
					url: '/pages/cart/cart'
				});
			},
			// 轮播图数字变
			change(e) {
				this.current = e.detail.current
			},
			// 商品关注、取消关注
			onMineFocus(e) {
				this.$http.post(this.$apiObj.MineFocus, {
					type: e,
					data_id: e == 1 ? this.GoodsCont.goods_id : this.GoodsCont.shop.id
				}).then(res => {
					if (res.code == 1) {
						if (e == 1) {
							if (this.GoodsCont.is_goods_focus == 1) {
								uni.showToast({
									icon: 'none',
									title: this.$t('home.shop.yiquery')
								})
								this.GoodsCont.is_goods_focus = 0
							} else {
								uni.showToast({
									icon: 'none',
									title: this.$t('home.shop.guanzhuchenggong')
								})
								this.GoodsCont.is_goods_focus = 1
							}
						}
						if (e == 2) {
							if (this.GoodsCont.shop.is_shop_focus == 1) {
								uni.showToast({
									icon: 'none',
									title: this.$t('home.shop.yiquery')
								})
								this.GoodsCont.shop.is_shop_focus = 0
							} else {
								uni.showToast({
									icon: 'none',
									title: this.$t('home.shop.guanzhuchenggong')
								})
								this.GoodsCont.shop.is_shop_focus = 1
							}
						}
					}
				})
			},
			// 点击sku选中
			onShopSKUClick(e, k) {
				this.num = 1
				e.attr.map(item => {
					item.isShow = false
				})
				k.isShow = true
				let spec_value_id = ''
				this.GoodsCont.spec_list.map(item => {
					item.attr.map(items => {
						if (items.isShow) {
							spec_value_id = spec_value_id ? (spec_value_id + '_' + items.spec_value_id) :
								items.spec_value_id
						}
					})
				})
				for (let i in this.GoodsCont.sku_list) {
					if (this.GoodsCont.sku_list[i].spec_sku_id == spec_value_id) {
						this.shopCont = this.GoodsCont.sku_list[i]
						this.price = this.GoodsCont.sku_list[i].goods_price // 选中的价格
						this.spec_image = this.GoodsCont.sku_list[i].spec_image // 选中的图片
						this.attrs = this.GoodsCont.sku_list[i].attrs // 属性值
						this.spec_sku_id = this.GoodsCont.sku_list[i].spec_sku_id // sku属性id组合
						this.goods_spec_id = this.GoodsCont.sku_list[i].goods_spec_id // skuid
						this.stock_num = this.GoodsCont.sku_list[i].stock_num // 库存
					}
				}
			},
			// 点击减
			onJian() {
				if (this.num == 1) return
				this.num--
			},
			// 点击加
			onJia() {
				if (this.num == this.stock_num) return
				this.num++
			},
			// 点击加入购物车
			onAddClick() {
				this.$http.post(this.$apiObj.CartAdd, {
					goods_spec_id: this.goods_spec_id,
					num: this.num
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: this.isShopCont ? 'Successfully added to shopping cart' : '加入购物车成功'
						})
					}
				})
			},
			// 点击弹框立即购买
			onGoPay() {
				let shopCont = {
					total: this.num * this.price, //总价
					cartdata: [{
						admin_id: this.GoodsCont.shop.id, //店铺id
						shop_name: this.GoodsCont.shop.shop_name, //店铺名称
						list: [{
							goods_id: this.GoodsCont.goods_id, //商品id
							price: this.price, // 价格
							num: this.num, //购买数量
							good_name: this.GoodsCont.goods_name, //商品名称
							image: this.spec_image, //图片
							admin_id: this.GoodsCont.shop.id, //店铺id
							attrs: this.attrs, // 规格
							goods_spec_id: this.goods_spec_id, // sku id
							spec_sku_id: this.spec_sku_id, //sku属性id的组合
							stock_num: this.stock_num, //库存
						}]
					}]
				}
				uni.navigateTo({
					url: './submit?shopCont=' + JSON.stringify(shopCont)
				})
				this.$refs.popup1.close()
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
			toggleClose(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.close(type)
			},
			toggle1() {
				this.$refs.popup1.open()
			},
			toggle1Close() {
				this.$refs.popup1.close()
			},
			toggle2(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup2.open(type)
			},
			toggle2Close(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup2.close(type)
			},

			onfacebook() {
				let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/class/Gdetail?id=' + this.id // 生成二维码的链接
				let url = `https://www.facebook.com/sharer/sharer.php?u=${qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
			},
			ontweet() {
				let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/class/Gdetail?id=' + this.id // 生成二维码的链接
				let url = `https://twitter.com/intent/tweet?url=${qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
			},
			onFuzhi() {
				let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/class/Gdetail?id=' + this.id // 生成二维码的链接
				// #ifdef H5
				let oInput = document.createElement('input');
				oInput.value = qrUrl;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				uni.showToast({
					icon: 'none',
					title: this.$t('user.order.detail.fzcg')
				})
				oInput.remove()
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: qrUrl,
					success: () => {
						uni.showToast({
							icon: 'none',
							title: this.$t('user.order.detail.fzcg')
						})
					}
				});
				// #endif
			}

		}
	}
</script>

<style lang="less" scoped>
	page {
		background: #f9f9f9;
	}

	.detail-page {
		padding-bottom: 100rpx;

		.detail-big {
			/deep/ uni-swiper {
				height: 475rpx;
			}

			.big-img {
				width: 100%;
				height: 475rpx;
			}

			/deep/.uni-swiper__dots-nav {
				background: none;
				display: flex;
				justify-content: flex-end;
				padding-bottom: 50rpx;
			}

			/deep/ .uni-swiper__dots-nav-item {
				width: 80rpx;
				height: 36rpx;
				background: rgba(0, 0, 0, 0.4);
				text-align: center;
				border-radius: 18rpx;
			}
		}

		//detail-follow S
		.detail-follow {
			display: flex;
			align-items: center;
			line-height: 1;

			.icon {
				width: 30rpx;
				height: 30rpx;
				margin-right: 15rpx;
			}
		}

		//detail-follow E
		//detail-head S
		.detail-head {
			background: #ffffff;
			border-radius: 20rpx 20rpx 0px 0px;
			padding: 30rpx;
			margin-top: -30rpx;
			position: relative;
			z-index: 11;

			.head-hd {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.sale {
					font-size: 24rpx;
					color: #999;
				}

				.price {
					color: #fc0609;
					font-size: 22rpx;
					font-weight: 550;
				}
			}

			.head-bd {
				display: inline-block;
				font-size: 28rpx;
				line-height: 40rpx;
				margin-top: 40rpx;

				.tag {
					height: 40rpx;
					background: #fc0609;
					border-radius: 6rpx;
					padding: 0 10rpx;
					color: #fff;
					font-size: 22rpx;
					color: #fff;
					line-height: 40rpx;
					white-space: nowrap;
					margin-right: 15rpx;
					display: inline-block;
				}
			}
		}

		//detail-head E

		//detail-one S
		.detail-one {
			background: #fff;
			margin: 20rpx 0;
			padding: 30rpx;

			.one-li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;

				.more {
					width: 12rpx;
					height: 22rpx;
					margin-left: 20rpx;
					min-width: 12rpx;
					max-width: 12rpx;
				}

				.li-fl {
					flex: 1;
					display: flex;
					line-height: 40rpx;

					.label {
						// width: 80rpx;
						font-size: 26rpx;
						min-width: 80rpx;
						margin-right: 20rpx;
					}

					.c {
						font-size: 28rpx;
					}
				}
			}
		}

		//detail-one E
		//detail-two S
		.detail-two {
			margin: 20rpx 0;
			background: #fff;
			padding: 30rpx;

			.two-li {
				display: flex;
				align-items: center;
				font-size: 26rpx;

				.icon {
					width: 43rpx;
					height: 39rpx;
					min-width: 43rpx;
					margin-right: 24rpx;
				}

				.pic {
					width: 45rpx;
					height: 45rpx;
					border-radius: 100%;
					overflow: hidden;
					min-width: 45rpx;
					max-width: 45rpx;
					margin-right: 15rpx;
				}
			}
		}

		//detail-two E

		.detail-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-left: 20rpx;
			font-size: 26rpx;
			position: relative;

			.more {
				font-size: 24rpx;
				color: #999;
				display: flex;
				align-items: center;

				.icon {
					width: 12rpx;
					height: 22rpx;
					margin-left: 10rpx;
				}
			}
		}

		.detail-title:before {
			width: 6rpx;
			height: 32rpx;
			background: #f52c1f;
			border-radius: 3rpx;
			display: block;
			content: "";
			position: absolute;
			left: 0;
			top: 50%;
			margin-top: -16rpx;
		}

		//detail-three S
		.detail-three {
			background: #fff;
			margin: 20rpx 0;
			padding: 30rpx;

			.three-li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 30rpx 0;

				.li-fl {
					display: flex;
					align-items: center;
					font-size: 26rpx;

					.pic {
						width: 45rpx;
						height: 45rpx;
						border-radius: 100%;
						overflow: hidden;
						margin-right: 15rpx;
					}
				}

				.li-fr {
					display: flex;
					align-items: center;

					.time {
						font-size: 26rpx;
						color: #999;
						margin-right: 12rpx;
					}
				}

				.three-btn {
					width: 100rpx;
					height: 45rpx;
					background: #fc0609;
					border-radius: 10rpx;
					margin: 0;
					line-height: 45rpx;
					color: #fff;
					font-size: 24rpx;
				}
			}
		}

		//detail-three E
		//detail-four S
		.detail-four {
			margin: 20rpx 0;
			background: #fff;
			padding: 30rpx;

			.four-li {
				margin: 30rpx 0;

				.li-hd {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.date {
						font-size: 26rpx;
					}

					.hd-fl {
						display: flex;
						align-items: center;

						.pic {
							width: 52rpx;
							height: 52rpx;
							border-radius: 100%;
							overflow: hidden;
							min-width: 52rpx;
							margin-right: 20rpx;
						}

						.txt {
							.t {
								font-size: 26rpx;
							}

							.star {
								display: flex;
								margin-top: 10rpx;

								.icon {
									width: 18rpx;
									height: 18rpx;
									margin-right: 10rpx;
								}
							}
						}
					}
				}

				.li-bd {
					margin: 20rpx 0;
					font-size: 26rpx;
					line-height: 36rpx;
				}

				.li-img {
					display: flex;
					overflow-x: auto;
					width: 100%;
					white-space: nowrap;

					.small {
						width: 190rpx;
						height: 190rpx;
						margin-right: 18rpx;
						min-width: 190rpx;
					}
				}
			}

			.four-btn {
				width: 210rpx;
				height: 60rpx;
				border: 1px solid #dddddd;
				border-radius: 30rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				margin: 50rpx auto;
			}
		}

		//detail-four E
		//detail-five S
		.detail-five {
			margin: 20rpx 0;
			padding: 30rpx;
			background: #fff;

			.five-hd {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.hd-fl {
					display: flex;
					align-items: center;
					flex: 1;

					.logo {
						width: 80rpx;
						height: 80rpx;
						border-radius: 100%;
						overflow: hidden;
						min-width: 80rpx;
						max-width: 80rpx;
						margin-right: 20rpx;
					}

					.txt {
						.t {
							font-size: 28rpx;
						}

						.c {
							font-size: 22rpx;
							margin-top: 10rpx;
						}
					}
				}

				.more {
					width: 12rpx;
					height: 22rpx;
					min-width: 12rpx;
					max-width: 12rpx;
					margin-left: 20rpx;
				}
			}

			.five-bd {
				display: flex;
				margin-top: 30rpx;
				justify-content: center;

				.bd-li {
					width: 281rpx;
					height: 70rpx;
					border: 1px solid #dddddd;
					border-radius: 35rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					margin: 0 30rpx;

					.icon {
						width: 34rpx;
						height: 34rpx;
						margin-right: 10rpx;
					}
				}
			}
		}

		//detail-five E
		//detail-six S
		.detail-six {
			margin: 0rpx 0;

			.six-tit {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				margin: 30rpx 0;

				.line {
					width: 85rpx;
					height: 6rpx;
					margin: 0 20rpx;
				}
			}

			.six-article {
				padding: 30rpx;
			}
		}

		//detail-six E
		//detail-fixed S
		.detail-fixed {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			z-index: 99;

			.fixed-con {
				padding: 15rpx 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.fixed-fl {
					display: flex;
					align-items: center;
					flex: 1;
					justify-content: space-between;

					.li {
						margin-right: 20rpx;
						text-align: center;

						.icon {
							width: 42rpx;
							height: 42rpx;
							margin: 0 auto;
						}

						.t {
							font-size: 22rpx;
							margin-top: 10rpx;
						}
					}
				}

				.fixed-fr {
					display: flex;
					align-items: center;

					.detail-btn {
						width: 200rpx;
						height: 75rpx;
						background: #fc0609;
						border-radius: 38rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						text-align: center;
						color: #fff;
						font-size: 28rpx;
						line-height: 30rpx;
						margin-left: 10rpx;
						flex-direction: column;
						justify-content: center;
					}

					.orange {
						background: #ffb202;
					}
				}
			}
		}

		//detail-fixed E

		//detail-share S
		.detail-share {
			width: 36rpx;
			height: 34rpx;
			position: fixed;
			right: 30rpx;
			top: 30rpx;
			z-index: 999;
		}

		//detail-share E

		//rule-pop S
		.rule-pop {
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			background: #fff;
			padding: 30rpx 24rpx;
			position: relative;

			.pop-close {
				width: 18rpx;
				height: 18rpx;
				position: absolute;
				right: 24rpx;
				top: 30rpx;
			}

			.pop-hd {
				display: flex;
				padding-right: 30rpx;

				.hd-txt {
					.t {
						font-size: 28rpx;
						line-height: 1.6;
					}

					.c {
						font-size: 26rpx;
						margin: 10rpx 0;
					}

					.price {
						color: #fc0609;
						font-weight: 550;
					}
				}

				.hd-img {
					width: 175rpx;
					height: 175rpx;
					border-radius: 10rpx;
					min-width: 175rpx;
					margin-right: 20rpx;
				}
			}

			.pop-li {
				margin: 30rpx 0;

				.li-t {
					font-size: 28rpx;
					margin-bottom: 20rpx;
				}

				.li-tags {
					display: flex;
					flex-wrap: wrap;
					margin: 0 -10rpx;

					.tag {
						height: 62rpx;
						background: #eeeeee;
						border-radius: 32rpx;
						border: 1px solid #eee;
						padding: 0 20rpx;
						line-height: 62rpx;
						margin: 10rpx;
					}

					.active {
						border: 1px solid #f41a0c;
						background: #ffe9e8;
						color: #f41a0c;
					}
				}
			}

			.pop-num {
				display: flex;
				margin: 30rpx 0;
				align-items: center;
				justify-content: space-between;

				.t {
					font-size: 28rpx;
				}

				.num-coum {
					display: flex;

					.coum-btn {
						width: 54rpx;
						height: 45rpx;
						background: #eeeeee;
						border-radius: 10rpx 0px 0px 10rpx;
						text-align: center;
						line-height: 45rpx;
						color: #666;
						text-align: center;
					}

					.coum-btn.last {
						border-radius: 0px 10rpx 10rpx 0px;
					}

					.coum-input {
						width: 54rpx;
						height: 45rpx;
						background: #eeeeee;
						text-align: center;
						font-size: 30rpx;
						color: #666;
						text-align: center;
						margin: 0 3rpx;
					}
				}
			}
		}

		.pop-bot {
			margin: 50rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.public-btn {
				width: 330rpx;
				height: 90rpx;
				line-height: 90rpx;
			}
		}

		//rule-pop E

		//share-pop S
		.share-pop {
			background: #ffffff;
			border-radius: 20rpx 20rpx 0px 0px;

			.share-t {
				font-size: 28rpx;
				font-weight: 550;
				text-align: center;
				padding: 30rpx;
			}

			.share-ul {
				display: flex;
				flex-wrap: wrap;
				padding: 50rpx 30rpx;
				text-align: center;

				.share-li {
					width: 33.333%;

					.icon {
						width: 90rpx;
						height: 90rpx;
						margin: 0 auto;
					}

					.t {
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						line-height: 1;
						margin-top: 25rpx;
					}
				}
			}

			.share-bot {
				padding: 40rpx 30rpx;
				border-top: 1px solid #f5f5f5;

				.share-btn {
					font-size: 28rpx;
					font-weight: 550;
					width: 100%;
					padding: 0;
					margin: 0;
				}
			}
		}

		//share-pop E
	}
</style>