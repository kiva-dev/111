<template>
	<view class="cart">
		<view class="head">
			<image src="/static/images/new-index/return.png" class="return" @click="toBack()"></image>
			<view class="txt">{{$t('new.wdgwc')}}</view>
			<view class="right" v-show="showBtm" @click="switchBtm()">
				<image src="/static/images/new-index/edit.png"></image>
				<view>{{$t('user.address.edit')}}</view>
			</view>
			<view class="right" v-show="showEditbtm" @click="switchBtm()">{{$t('user.nick.wancheng')}}</view>
		</view>

		<!--购物车商品列表-->
		<view class="list" v-for="item in productList" :key="item.admin_id">

			<view class="head_info">
				<image src="../../static/images/new-index/wxz.png" class="head_logo" v-show="!item.select"
					@click="switchSelect(1,item)"></image>
				<image src="../../static/images/new-index/xz.png" class="head_logo" v-show="item.select"
					@click="switchSelect(1,item)"></image>
				<view class="head_txt">{{item.shop_name}}</view>
				<image src="../../static/images/products/right.png" class="head_more"></image>
			</view>

			<block v-for="(data,i) in item.goods" :key="data.id">
				<scroll-view scroll-x style="width: 750rpx;">
					<view class="item">
						<view class="item-info">
							<view class="detail">
								<image src="/static/images/new-index/wxz.png" class="logo" v-show="!data.select"
									@click="switchSelect(2,data)"></image>
								<image src="../../static/images/new-index/xz.png" class="logo" v-show="data.select"
									@click="switchSelect(2,data)">
								</image>
								<image :src="data.spec_image" class="img"></image>
								<view class="info">
									<view class="name">{{data.goods_name}}</view>
									<!-- <view class="guige" @click="getProductSpec(data)">
										<view>{{data.attrs}}</view>
										<image src="/static/images/new-index/btm.png"></image>
									</view> -->
									<!-- <view class="tags">
										<view>xiaomi</view>
									</view> -->
								</view>
							</view>
							<view class="price-info">
								<view class="price">RM<span>{{data.goods_price}}</span></view>
								<view class="btn">
									<view class="jian" @click="changNum('jian',data)">
										<image src="../../static/images/new-index/jian1.png" v-if="data.num==1"></image>
										<image src="/static/images/new-index/jian.png" v-else></image>
									</view>
									<view class="myinput">
										<input type="number" v-model="data.num" @confirm="inspectNum(data)" />
									</view>
									<view class="jia" @click="changNum('jia',data)">
										<image src="../../static/images/new-index/jia.png"></image>
									</view>
								</view>
							</view>
						</view>

						<view class="item-other">
							<!-- <view class="item-other-info">
								<image src="../../static/images/new-index/sc.png"></image>
							</view> -->
							<view class="item-other-info" style="background: rgb(135, 138, 155);"
								@click="switchDelete(1,data.id)">
								<image src="../../static/images/new-index/del.png"></image>
							</view>
						</view>

					</view>

				</scroll-view>
			</block>

		</view>

		<view class="notcart" v-show="showNot">
			<uni-empty image="/static/images/kbrick/cart.png" :width="280" :message="$t('new.notcart')"></uni-empty>
		</view>

		<view class="hotList" v-show="showNot">
			<view class="hotList-head">
				<image src="/static/images/new-index/detail_icon_hot.png"></image>
				<view>{{$t('detail.hot')}}</view>
			</view>
			<scroll-view scroll-x style="width: 750rpx;white-space: nowrap;">
				<view v-for="(item,i) in hotList" :key="i" style="display: inline-block;width: 750rpx;">
					<view class="hotinfo">
						<view class="hotitem" v-for="data in item.list" :key="data.auction_goods_id">
							<image :src="data.image"></image>
							<view class="name">{{data.goods_name}}</view>
							<view class="price">RM<text>{{data.price}}</text></view>
						</view>
					</view>

				</view>
			</scroll-view>
		</view>

		<!--常规支付底部-->
		<view class="btm" v-show="showBtm">
			<image src="../../static/images/new-index/wxz.png" @click="selectAll()" v-show="!isSelectAll"></image>
			<image src="../../static/images/new-index/xz.png" @click="selectAll()" v-show="isSelectAll"></image>
			<view class="btm-all">{{$t('new.all')}}</view>
			<view class="btm-price">{{$t('new.zg')}}:<span>RM</span><span
					style="font-size: 36rpx;">{{totalPrice}}</span></view>
			<view class="btm-btn" @click="toPay()">{{$t('auction.detail.quzhifu')}}({{selectNum}})</view>
		</view>

		<!--编辑底部-->
		<view class="edit-btm" v-show="showEditbtm">
			<image src="../../static/images/new-index/wxz.png" @click="selectAll()" v-show="!isSelectAll"></image>
			<image src="../../static/images/new-index/xz.png" @click="selectAll()" v-show="isSelectAll"></image>
			<view class="edit-btm-all">{{$t('new.all')}}</view>
			<!-- <view class="edit-btm-favorite" @click="$refs.popsc.open()">Add Favorite</view> -->
			<view class="edit-btm-delete" @click="switchDelete(2,0)">{{$t('cart.shanchu')}}</view>
		</view>

		<!--规格选择-->
		<uni-popup ref="popup" type="bottom">
			<view class="showgg">
				<view class="top">
					<image :src="info.url" class="product-img"></image>
					<image src="/static/images/close1.png" class="close" @click="closeShowgg()"></image>
					<view class="name">{{info.tags}}</view>
					<view class="price">RM<span>{{info.price}}</span></view>
				</view>

				<view class="line"></view>

				<view class="info" v-for="item in info.list" :key="item.id">
					<view class="info-name">{{item.spec_name}}</view>
					<view class="info-tags">
						<view class="info-tag" v-for="data in item.attr" :key="data.id"
							:class="data.select ?'select':''">{{data.spec_value}}</view>
					</view>
				</view>

				<view class="confirm" @click="editProductSpec()">Confirm</view>

			</view>
		</uni-popup>

		<!--收藏-->
		<uni-popup ref="popsc" type="bottom">
			<view class="favorite">
				<view class="favorite-top">2 products moved into favorites?</view>
				<view class="favorite-ok">Confirm</view>
			</view>
			<view class="cancel" @click="$refs.popsc.close()">Cancel</view>
		</uni-popup>

		<!--删除-->
		<uni-popup ref="popdel" type="bottom">
			<view class="favorite">
				<view class="favorite-top">{{$t('new.scz')}} {{deleteNum}} {{$t('new.scsp')}}</view>
				<view class="favorite-ok" @click="confirmDelete()">{{$t('cart.shanchu')}}</view>
			</view>
			<view class="cancel" @click="$refs.popdel.close()">{{$t('order.query')}}</view>
		</uni-popup>

		<view style="height: 136rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSelectAll: false, //是否全选
				showEditbtm: false, //显示编辑
				showBtm: false, //显示购买
				num: 1,
				deleteId: 0, //右滑删除时的id
				deleteNum: 0, //删除数量
				selectNum: 0, //选中商品数量
				timer: '', //定时器
				productList: [], //商品列表
				productInfo: {}, //商品详情
				info: {}, //页面显示数据
				totalPrice: 0, //总价值
				hotList: [],
				showNot: false,
				updateNum: 0, //记录上次修改的数量
			}
		},
		onShow() {
			this.getCartList()
		},
		onHide() {
			
		},
		methods: {
			//为你推荐
			getHotList() {
				this.$http.post(this.$apiObj.GetHotList, {
					page: 1,
					pagenum: 18
				}).then(res => {
					this.hotList = []
					let arr = res.data.data
					let one = []
					let two = []
					let three = []
					for (var i = 0; i < arr.length; i++) {
						if (i < 6) {
							one.push(arr[i])
						} else if (i >= 6 && i < 12) {
							two.push(arr[i])
						} else {
							three.push(arr[i])
						}
					}

					if (one.length > 0) this.hotList.push({
						list: one
					})
					if (two.length > 0) this.hotList.push({
						list: two
					})
					if (three.length > 0) this.hotList.push({
						list: three
					})

				})
			},
			//获取所有购物车数据
			getCartList() {
				this.totalPrice = 0
				this.$http.post(this.$apiObj.CartList).then(res => {
					res.data.data.forEach(item => {
						this.$set(item, 'select', false)
						item.goods.forEach(data => {
							data.attrs = data.attrs.toString()
							this.$set(data, 'select', false)
							this.totalPrice += (data.goods_price * 1) * data.num
						})
					})
					this.productList = res.data.data
					this.showBtm = this.productList.length > 0 ? true : false

					if (!this.showBtm) this.showEditbtm = this.productList.length > 0 ? true : false
					if (this.productList.length < 1) {
						this.showNot = true
						this.getHotList()
					}

				})
			},
			//修改购物车商品数量
			editCartProductNum(data) {
				if (data.stock_num < data.num) {
					uni.showToast({
						title: '库存不足',
						icon: 'none',
						duration: 2000
					})
					data.num = data.stock_num
					return
				}
				this.$http.post(this.$apiObj.CartEdit, {
					cart_id: data.id,
					goods_spec_id: data.goods_spec_id,
					num: data.num
				}).then(res => {
					if (res.code != 1) {
						// data.num = this.updateNum
					}
				})
			},
			//获取商品详情规格
			getProductSpec(data) {
				this.$http.post(this.$apiObj.IndexGoodsDetail, {
					goods_id: data.goods_id
				}).then(res => {
					let data = {
						url: res.data.now_sku.spec_image,
						tags: res.data.now_sku.attrs.toString(),
						price: res.data.now_sku.goods_price,
						list: res.data.spec_list
					}
					this.productInfo = res.data
					this.info = data
					this.$refs.popup.open()
				})
			},
			//修改商品规格
			editProductSpec() {

			},
			//切换是否选中;1：店铺 2：商品
			switchSelect(num, info) {
				this.deleteNum = 0
				this.selectNum = 0
				if (num == 1) {
					let id = info.admin_id
					info.select = !info.select
					this.productList.forEach(item => {
						if (id == item.admin_id) {
							item.goods.forEach(data => {
								data.select = info.select
							})
						}

					})
				} else {
					console.log(num)
					//如果是商品，先把选中取反，然后遍历数组，如果全选中了店铺变为选中，否则为未选中
					info.select = !info.select
					let flag = true
					let id = info.admin_id
					console.log(info.admin_id)
					this.productList.forEach(item => {
						if (item.admin_id == id) {
							item.goods.forEach(data => {
								if (!data.select) flag = false
							})
						}

					})
					this.productList.forEach(item => {
						if (id == item.admin_id) item.select = flag ? true : false
					})

				}

				//如果全部选中了
				let isAll = true
				this.productList.forEach(item => {
					if (!item.select) isAll = false
					item.goods.forEach(data=>{
						if(data.select){
							this.deleteNum++
							this.selectNum++
						}
					})
				})
				this.isSelectAll = isAll
			},
			//全选
			selectAll() {
				this.isSelectAll = !this.isSelectAll
				this.deleteNum = 0
				this.selectNum = 0
				this.productList.forEach(item => {
					item.select = this.isSelectAll ? true : false
					item.goods.forEach(data => {
						data.select = this.isSelectAll ? true : false
						if (data.select) {
							this.deleteNum++
							this.selectNum++
						}
					})
				})
			},
			switchDelete(num, id) {
				this.$refs.popdel.open()
				if (num == 1) {
					this.deleteId = id
					this.deleteNum = 1
				}
			},
			confirmDelete() {
				if (this.deleteId > 0) this.deleteById(this.deleteId)
				else this.deleteProductById()
			},
			//右滑删除
			deleteById(id) {
				this.$http.post(this.$apiObj.CartDelete, {
					cart_ids: id
				}).then(res => {
					if (res.code == 1) this.getCartList()

					uni.showToast({
						icon: 'none',
						title: res.msg
					})

					this.$refs.popdel.close()
				})
			},
			//删除购物车商品
			deleteProductById() {
				let arr = []
				this.productList.forEach(item => {
					item.goods.forEach(data => {
						if (data.select) arr.push(data.id)
					})
				})

				if (arr.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请选择要删除的商品'
					})
					this.$refs.popdel.close()
					return
				}
				this.$http.post(this.$apiObj.CartDelete, {
					cart_ids: arr.toString()
				}).then(res => {
					if (res.code == 1) this.getCartList()

					uni.showToast({
						icon: 'none',
						title: res.msg
					})

					this.selectNum = 0
					this.deleteNum = 0
					this.isSelectAll = false

					this.$refs.popdel.close()
				})
			},

			//支付结算
			toPay() {
				let arr = []
				this.productList.forEach(item => {
					item.goods.forEach(data => {
						if (data.select) arr.push(data.id)
					})
				})

				if (arr.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '请选择商品'
					})
					return
				}

				uni.navigateTo({
					url: "/pages/cart/submit?cart_ids=" + arr.toString()
				})
			},

			//切换底部
			switchBtm() {
				this.showBtm = !this.showBtm
				this.showEditbtm = !this.showEditbtm
			},

			toBack() {
				uni.navigateBack()
			},
			//加减数字
			changNum(type, data) {
				if (type == 'jia') {
					data.num++
				} else {
					if (data.num == 1) return
					data.num--
				}
				this.updateNum = data.num
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.editCartProductNum(data)
				}, 1000)
			},
			//验证数据是否合法
			inspectNum(data) {
				if (data.num < 1) data.num = 1
			},
			showggPop() {
				this.$refs.popup.open()
			},
			closeShowgg() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		height: 720rpx;
	}

	.grid-img {
		width: 220rpx;
		height: 220rpx;
	}

	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>

<style lang="less" scoped>
	/deep/.uni-input-input {
		text-align: center !important;
	}

	.cart {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.head {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: rgb(10, 198, 142);

			.return {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			.txt {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.right {
				position: absolute;
				right: 32rpx;
				font-size: 32rpx;
				color: rgb(255, 255, 255);
				display: flex;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
		}

		.btm {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 96rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);

			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 32rpx;
			}

			.btm-all {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
				margin-left: 24rpx;
			}

			.btm-price {
				position: absolute;
				right: 248rpx;
				font-size: 28rpx;
				color: rgb(51, 51, 51);

				span {
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);
				}
			}

			.btm-btn {
				position: absolute;
				right: 32rpx;
				width: 200rpx;
				height: 72rpx;
				line-height: 72rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 72rpx;
			}

		}

		.edit-btm {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 96rpx;
			display: flex;
			align-items: center;
			background: rgb(255, 255, 255);

			image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 32rpx;
			}

			.edit-btm-all {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
				margin-left: 24rpx;
			}

			.edit-btm-favorite {
				position: absolute;
				right: 188rpx;
				width: 200rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				text-align: center;
				box-sizing: border-box;
				border: 1rpx solid rgb(204, 204, 204);
				border-radius: 62rpx;
			}

			.edit-btm-delete {
				position: absolute;
				right: 32rpx;
				width: 124rpx;
				height: 64rpx;
				line-height: 64rpx;
				font-size: 28rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 64rpx;
			}


		}

		.list {
			width: 100%;
			padding-top: 32rpx;
			background: #fff;
			margin-bottom: 8rpx;

			.head_info {
				width: 100%;
				display: flex;
				align-items: center;

				.head_logo {
					width: 40rpx;
					height: 40rpx;
					margin-left: 32rpx;
				}

				.head_txt {
					font-size: 36rpx;
					color: rgb(51, 51, 51);
					margin-left: 24rpx;
				}

				.head_more {
					width: 28rpx;
					height: 28rpx;
					margin-left: 8rpx;
				}
			}

			.item {
				width: 906rpx;
				height: 260rpx;
				padding-bottom: 10rpx;
				display: flex;
				align-items: center;
			}

			.detail {
				position: relative;
				width: 100%;
				height: 172rpx;
				display: flex;
				align-items: center;
				margin-top: 40rpx;

				.logo {
					width: 40rpx;
					height: 40rpx;
					margin: 0 24rpx 0 32rpx;
				}

				.img {
					width: 172rpx;
					height: 172rpx;
					border-radius: 16rpx;
					margin-right: 24rpx;
				}

				.info {
					width: 416rpx;
					height: 172rpx;

					.name {
						width: 416rpx;
						font-size: 24rpx;
						line-height: 36rpx;
						color: rgb(51, 51, 51);
						word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.guige {
						width: 260rpx;
						height: 40rpx;
						font-size: 24rpx;
						color: rgb(153, 153, 153);
						display: flex;
						align-items: center;
						justify-content: center;
						background: rgb(242, 242, 242);
						border-radius: 40rpx;
						margin-top: 16rpx;

						view {
							width: 196rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						image {
							width: 16rpx;
							height: 16rpx;
							margin-left: 8rpx;
						}
					}

					.tags {
						width: 100%;
						display: flex;
						align-items: center;
						margin-top: 12rpx;

						view {
							font-size: 16rpx;
							color: rgb(102, 102, 102);
							padding: 4rpx 8rpx;
							box-sizing: border-box;
							border: 1rpx solid rgb(204, 204, 204);
							border-radius: 4rpx;
							margin-right: 12rpx;
						}
					}

				}

			}

			.price-info {
				position: relative;
				width: 750rpx;
				height: 48rpx;
				display: flex;
				align-items: center;
				// margin-top: 16rpx;

				.price {
					position: absolute;
					left: 292rpx;
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);

					span {
						font-size: 28rpx;
					}
				}

				.btn {
					position: absolute;
					right: 32rpx;
					width: 132rpx;
					height: 48rpx;
					display: flex;
					align-items: center;
					background: #fff;
					box-sizing: border-box;
					border: 1rpx solid rgb(204, 204, 204);
					border-radius: 48rpx;

					.jian {
						width: 40rpx;
						height: 48rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 16rpx;
							height: 2rpx;
						}
					}

					.jia {
						width: 40rpx;
						height: 48rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 16rpx;
							height: 16rpx;
						}
					}

					.myinput {
						width: 52rpx;
						height: 100%;
						border: 1rpx solid rgb(204, 204, 204);
						border-top: none;
						border-bottom: none;
					}
				}
			}

			.item-other {
				display: flex;
				align-items: center;

				.item-other-info {
					position: relative;
					width: 156rpx;
					height: 270rpx;
					background: rgb(236, 118, 132);

					image {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 44rpx;
						height: 44rpx;
					}
				}
			}
		}

		.notcart {
			background: #fff;
		}

		.hotList {
			width: 750rpx;
			padding: 22rpx 0;
			background: #fff;
			margin-top: 20rpx;

			.hotList-head {
				width: 750rpx;
				display: flex;
				align-items: center;
				margin-bottom: 26rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-left: 32rpx;
				}

				view {
					font-size: 32rpx;
					color: rgb(51, 51, 51);
					margin-left: 12rpx;
				}
			}

			.hotinfo {
				width: 732rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin: 0 auto;
			}

			.hotitem {
				width: 220rpx;
				height: 350rpx;
				margin: 0 12rpx 24rpx 12rpx;

				image {
					display: block;
					width: 220rpx;
					height: 220rpx;
					border-radius: 16rpx;
				}

				.name {
					width: 220rpx;
					font-size: 20rpx;
					color: rgb(51, 51, 51);
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					margin: 12rpx 0 14rpx 0;
				}

				.price {
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);

					text {
						font-size: 32rpx;
					}
				}
			}
		}

		//规格选择
		.showgg {
			position: relative;
			width: 750rpx;
			// height: 1276rpx;
			padding-top: 32rpx;
			padding-bottom: 40rpx;
			background: #fff;
			border-radius: 24rpx 24rpx 0 0;

			.top {
				position: relative;
				width: 100%;
				height: 240rpx;

				.product-img {
					width: 240rpx;
					height: 240rpx;
					border-radius: 16rpx;
					margin-left: 32rpx;
				}

				.close {
					position: absolute;
					top: 0;
					right: 36rpx;
					width: 20rpx;
					height: 20rpx;
				}

				.name {
					position: absolute;
					left: 296rpx;
					bottom: 62rpx;
					font-size: 24rpx;
					color: rgb(153, 153, 153);
				}

				.price {
					position: absolute;
					left: 296rpx;
					bottom: 0;
					font-size: 20rpx;
					font-weight: bold;
					color: rgb(255, 57, 57);

					span {
						font-size: 32rpx;
					}
				}
			}

			.line {
				width: 686rpx;
				border-bottom: 1rpx solid rgb(204, 204, 204);
				margin: 32rpx auto;
			}

			.info {
				width: 100%;
				margin-bottom: 40rpx;

				.info-name {
					font-size: 28rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
					margin-left: 32rpx;
				}

				.info-tags {
					width: 686rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					margin: 0 auto;

					.info-tag {
						font-size: 26rpx;
						color: rgb(102, 102, 102);
						padding: 20rpx 40rpx;
						background: rgb(245, 245, 245);
						border-radius: 100rpx;
						margin: 22rpx 24rpx 0rpx 0;
					}

					.select {
						color: rgb(10, 198, 142);
						background: rgba(10, 198, 142, 0.1);
						box-sizing: border-box;
						border: 1rpx solid rgb(10, 198, 142);
					}
				}
			}

			.confirm {
				width: 686rpx;
				height: 88rpx;
				line-height: 88rpx;
				font-size: 40rpx;
				font-weight: bold;
				color: #fff;
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 88rpx;
				margin-left: 32rpx;
			}

		}

		//收藏
		.favorite {
			width: 710rpx;
			background: #fff;
			border-radius: 28rpx;
			margin: 0 auto;

			.favorite-top {
				height: 84rpx;
				line-height: 84rpx;
				font-size: 28rpx;
				color: rgb(153, 153, 153);
				text-align: center;
				border-radius: 28rpx 28rpx 0 0;
			}

			.favorite-ok {
				height: 114rpx;
				line-height: 114rpx;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				text-align: center;
				box-sizing: border-box;
				border-top: 1rpx solid rgb(239, 239, 239);
				border-radius: 0 0 28rpx 28rpx;
			}

		}

		.cancel {
			width: 710rpx;
			height: 114rpx;
			line-height: 114rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: rgb(10, 198, 142);
			text-align: center;
			background: #fff;
			border-radius: 28rpx;
			margin: 20rpx auto;
		}

	}
</style>