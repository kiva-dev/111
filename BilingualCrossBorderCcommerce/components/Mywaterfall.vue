<template>
	<view>
		<view class="products-list">
			<view class="products-list-left">
				<view class="products-item" v-for="item in leftList" :key="item.goods_id"
					@click="toProductInfo(item.goods_id)">
					<image :src="item.image"></image>
					<view class="products-item-name">{{item.goods_name}}</view>
					<view class="products-item-tags">
						<block v-for="(data,index) in item.litestore_tag">
							<view v-if="(index+1)%3==1" class="lan">{{data.name}}</view>
							<view v-else-if="(index+1)%3==2" class="chen"
								:style="(index+1)%3==2?'margin-right: 0rpx;':''">
								{{data.name}}
							</view>
							<view v-else="(index+1)%3==0" class="red">{{data.name}}</view>
						</block>
					</view>
					<view class="products-item-price">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
				</view>
			</view>

			<view class="products-list-right">
				<view class="products-item" v-for="item in rightList" :key="item.goods_id"
					@click="toProductInfo(item.goods_id)">
					<image :src="item.image"></image>
					<view class="products-item-name">{{item.goods_name}}</view>
					<view class="products-item-tags">
						<block v-for="(data,index) in item.litestore_tag">
							<view v-if="(index+1)%3==1" class="lan">{{data.name}}</view>
							<view v-else-if="(index+1)%3==2" class="chen"
								:style="(index+1)%3==2?'margin-right: 0rpx;':''">
								{{data.name}}
							</view>
							<view v-else="(index+1)%3==0" class="red">{{data.name}}</view>
						</block>
					</view>
					<view class="products-item-price">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftList: [],
				rightList: [],
				productList:[],
				page:1,
				pagenum:10,
				totalPageNum:0
			}
		},
		onLoad() {
			
		},
		mounted() {
			this.$bus.$on('switchSelect',(id)=>{
				this.productList = []
				this.leftList=[]
				this.rightList=[]
				this.page = 1
				this.pagenum = 10
				this.getAllProducts(id)
			})
			
			this.$bus.$on('onReachBottom',(id)=>{
				if (this.totalPageNum <= this.page * this.pagenum) return
				this.page++
				this.getAllProducts(id)
			})
			
			this.getAllProducts(0)
		},
		methods: {
			toProductInfo(id) {
				uni.navigateTo({
					url: '/pages/auction/product_info?goodsId=' + id
				})
			},
			getAllProducts(id) {
				this.$http.post(this.$apiObj.LitestoregoodsIndex, {
					page: this.page,
					pagenum: this.pagenum,
					category_id: id == 0 ? '' : id
				}).then(res => {
					if (res.code == 1) {
						this.totalPageNum = res.data.total
						res.data.data.forEach(item => {
							item.litestore_tag.forEach(data => {
								let arr = data.name.split("|")
								if (!this.isShopCont) data.name = arr[0]
								else data.name = arr[1]
							})
						})
						this.leftList=[]
						this.rightList=[]
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data.data]
						let arr = this.productList
						for (var i = 0; i < arr.length; i++) {
							if (i % 2 == 0) this.leftList.push(arr[i])
							else this.rightList.push(arr[i])
						}
					}
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	//商品列表
	.products-list {
		width: 670rpx;

		// column-count: 2;
		display: flex;
		flex-wrap: wrap;
		// align-items: flex-start;
		justify-content: space-between;
		margin-top: 40rpx;
		margin-left: 40rpx;

		.products-item {
			width: 320rpx;
			// flex-grow: 1;
			// display: flex;
			// flex-direction: column;
			// break-inside: avoid;
			// height: 100%;
			padding-bottom: 10rpx;
			background: #fff;
			border-radius: 16rpx;
			box-shadow: 0px 4rpx 14rpx rgba(190, 190, 190, 0.3);
			margin: 0 0 30rpx 0;

			image {
				// display: block;
				width: 320rpx;
				height: 320rpx;
				border-radius: 16rpx 16rpx 0 0;
			}

			.products-item-name {
				width: 300rpx;
				font-size: 20rpx;
				color: rgb(44, 44, 44);
				margin: 10rpx auto;
				word-break: break-all;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.products-item-tags {
				width: 300rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin: 10rpx auto;

				view {
					font-size: 16rpx;
					padding: 6rpx 10rpx;
					border-radius: 6rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
				}

				.lan {
					color: rgb(0, 169, 255);
					background: rgba(93, 191, 254, 0.3);
				}

				.red {
					color: rgb(255, 0, 0);
					background: rgba(255, 198, 188, 0.5);
				}

				.chen {
					color: rgb(255, 78, 47);
					background: rgba(255, 221, 175, 0.5);
				}

			}

			.products-item-price {
				font-size: 24rpx;
				color: rgb(255, 78, 47);
				margin-left: 10rpx;

				span {
					font-size: 32rpx;
				}
			}

		}
	}
</style>