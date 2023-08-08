<template>
	<view class="add-page">
		<uni-header :title="$t('top.bjshdz')"></uni-header>
		<view class="add-box">
			<view class="add-li">
				<view class="label">{{$t('user.address.shr')}}</view>
				<view class="li-fr">
					<view class="li-input">
						<input class="input" placeholder-class="color-9999" v-model="name"
							:placeholder="$t('user.address.qtxxm')" />
					</view>
				</view>
			</view>
			<!-- 区域 -->
			<!-- <view class="add-li">
				<view class="label" style="fontSize:12px">{{$t('user.address.yjdq')}}</view>
				<view class="li-fr">
					<view class="li-input" @click="pickerShow = true">
						<input class="input" placeholder-class="color-9999" v-model="AreaForm.label" :placeholder="$t('user.address.xzyjdq')" />
					</view>
				</view>
			</view>
			<u-picker :show="pickerShow" :columns="columns" keyName="label" @confirm="pickerFun" @cancel="pickerCancel" confirmText="confirm" cancelText="cancel"></u-picker> -->
			
			<view class="add-li">
				<view class="label">{{$t('user.address.sjhm')}}</view>
				<view class="li-fr active">
					<view class="label" @click="navClick">
						<text>{{mobile_area_code}}</text>
						<view class="icon">
							<image class="img" src="../../static/images/icon5.png"></image>
						</view>
					</view>
					<view class="li-input">
						<input class="input" placeholder-class="color-9999" v-model="mobile"
							:placeholder="$t('user.address.qtxsjhm')" />
					</view>
				</view>
			</view>
			<view class="add-li">
				<view class="label">{{$t('user.address.shdz')}}</view>
				<view class="li-fr">
					<view class="li-input">
						<textarea class="text" auto-height placeholder-class="color-999" v-model="detail"
							:placeholder="$t('user.address.qtxshdz')"></textarea>
					</view>
				</view>
			</view>
			<view class="add-li">
				<view class="li-fl">{{$t('user.address.swmrshdz')}}</view>
				<view class="switch">
					<switch color="rgb(10, 198, 142)" :checked="is_default?true:false" style="transform:scale(0.7);"
						@change="switchChange" />
				</view>
			</view>
			<!--add-bot start-->
			<view class="add-bot">
				<view class="li">
					<button class="add-gray" @click="onDel">{{$t('user.address.del')}}</button>
				</view>
				<view class="li">
					<button class="public-btn" style="background: rgb(10, 198, 142);"
						@click.stop="$noMultipleClicks(onAddClick)">{{$t('user.address.baocun')}}</button>
				</view>
			</view>
			<uni-popup ref="popup1" type="center">
				<view class="public-pop">
					<view class="pop-con">
						<view class="pop-t">{{$t('user.address.tishi')}}</view>
						<view class="pop-c">{{$t('user.address.qddel')}}</view>
						<view class="pop-b">
							<button class="pop-btn" @click="onQuery">{{$t('user.address.query')}}</button>
							<button class="pop-btn" style="background: rgb(10, 198, 142); color: rgb(255, 255, 255);"
								@click.stop="$noMultipleClicks(onAddressDelete)">{{$t('user.address.btnsub')}}</button>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				noClick: true, // 防止重复点击 
				mobile_area_code: '', // 手机号区域编码
				mobile: '', // 手机号码
				detail: '', // 收货地址
				is_default: false, // 1默认，0不默认
				name: '', // 收货人
				address_id: '',
				pickerShow: false,
				AreaForm:{label:'',delivery_area_id:''}, // 递邮寄地区
                columns: [[]],
			}
		},
		onLoad(args) {
			console.log(JSON.parse(args.conter));
			const isEnglish = uni.getStorageSync('locale') !== 'zh-Hans';
			const {
				delivery_area_id,
				delivery_area_name,
				delivery_area_name_en,
				mobile_area_code,
				mobile,
				detail,
				is_default,
				name,
				id
			} = JSON.parse(args.conter)
			// this.AreaForm = {
			// 	label: isEnglish ? delivery_area_name_en : delivery_area_name,
			// 	delivery_area_id
			// }
			this.mobile_area_code = mobile_area_code // 手机号区域编码
			this.mobile = mobile // 手机号码
			this.detail = detail // 收货地址
			this.is_default = is_default == 1 ? true : false // 1默认，0不默认
			this.name =  name // 收货人
			this.address_id = id
		},
		onShow() {
			if (uni.getStorageSync('phoneCont')) {
				this.mobile_area_code = JSON.parse(uni.getStorageSync('phoneCont')).code
			} else {
				this.mobile_area_code = '+60'
				let title = {
					city: this.$t('phone.mlxy'),
					code: "+60",
					"sou": "M"
				}
				uni.setStorageSync('phoneCont', JSON.stringify(title))
			}
			// this.getAreaList()
		},
		methods: {
			async getAreaList() {
				const isEnglish = uni.getStorageSync('locale') !== 'zh-Hans';
				try {
					const res = await this.$http.post(this.$apiObj.GetDeliveryArea,{pagenum:20});
					const options = res.data.data.map(({ name, name_en, delivery_area_id }) => ({
						label: isEnglish ? name_en : name,
						delivery_area_id
					}));
					this.columns = [options];
				} catch (error) {
					console.error(error);
				}
			},
			pickerCancel(){
				this.pickerShow = false
			},
			pickerFun(e) {
				if (!e.value || !Array.isArray(e.value)) {
					console.error('Invalid e.value format:', e.value);
					return;
				}
				const newName = e.value.filter(item => item && typeof item === 'object').map(({ label, delivery_area_id }) => ({ label, delivery_area_id }));
				if (newName.length > 0) { // Empty type judgment and assignment
					this.AreaForm = newName[0];
				} else {
					uni.showToast({
						title: this.$t('user.address.xzyjdq'),
						icon: 'none'
					})
					console.error('No valid elements found in e.value');
				}
				this.pickerShow = false;
			},
			// 切换状态
			switchChange() {
				this.is_default = !this.is_default
			},
			//导航点击的跳转处理函数
			navClick() {
				uni.navigateTo({
					url: '../public/ownership'
				})
			},
			// 编辑收货地址
			onAddClick() {
				if (!this.name) return uni.showToast({
					title: this.$t('user.address.qsrshrxm'),
					icon: 'none'
				})
				if (!this.mobile) return uni.showToast({
					title: this.$t('user.address.qsrsjhm'),
					icon: 'none'
				})
				if (this.mobile_area_code == 86) {
					if (this.mobile) {
						var reg_tel =
							/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
						if (!reg_tel.test(this.mobile)) return uni.showToast({
							title: this.$t('user.address.qsrzqsjh'),
							icon: 'none'
						})
					}
				}
				if (!this.detail) return uni.showToast({
					title: this.$t('user.address.qsrshdz'),
					icon: 'none'
				})
				/* const {delivery_area_id} = this.AreaForm
				if(!delivery_area_id){
					uni.showToast({
						title: this.$t('user.address.xzyjdq'),
						icon: 'none'
					})
					return
				} */
				this.$http.post(this.$apiObj.AddressEdit, {
					mobile_area_code: this.mobile_area_code.slice(1), // 手机号区域编码
					mobile: this.mobile, // 手机号码
					detail: this.detail, // 收货地址
					is_default: this.is_default == true ? 1 : 0, // 1默认，0不默认
					name: this.name, // 收货人
					// delivery_area_id, // 邮寄地区
					address_id: this.address_id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.address.xgcg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				})
			},
			// 点击删除
			onDel() {
				this.$refs.popup1.open()
			},
			// 点击删除取消
			onQuery() {
				this.$refs.popup1.close()
			},
			// 删除数据
			onAddressDelete() {
				this.$http.post(this.$apiObj.AddressDelete, {
					address_id: this.address_id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('user.address.delcg'),
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.add-page {
		.add-box {
			padding: 30rpx;

			.add-bot {
				margin: 50rpx 0;
				display: flex;

				.li {
					flex: 1;
					margin: 0 10rpx;
				}

				.add-gray {
					height: 90rpx;
					background: #dddddd;
					border-radius: 45rpx;
					padding: 0;
					margin: 0;
					line-height: 90rpx;
					text-align: center;
					font-size: 32rpx;
				}
			}

			.add-li {
				margin: 30rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.li-fl {
					font-size: 28rpx;
				}

				.li-fr {
					flex: 1;

					&.active {
						display: flex;
						align-items: center;

						.label {
							width: 100rpx;
							margin-right: 10rpx;
							font-size: 28rpx;
							display: flex;
							align-items: center;
							line-height: 1;

							.icon {
								width: 11rpx;
								height: 7rpx;
								min-width: 11rpx;
								max-width: 11rpx;
								margin-left: 10rpx;
							}
						}

						.li-input {
							width: 360rpx;
						}
					}

					.li-input {
						background: #f5f5f5;
						border-radius: 30rpx;
						padding: 10rpx 30rpx;

						.input {
							height: 70rpx;
							font-size: 28rpx;
							width: 100%;
						}

						.text {
							padding: 10rpx 0;
							font-size: 28rpx;
							width: 100%;
							min-height: 200rpx;
						}

						.pick {
							height: 70rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;

							.pick-input {
								font-size: 28rpx;
							}

							.more {
								width: 10rpx;
								height: 19rpx;
								min-width: 10rpx;
							}
						}
					}
				}

				.label {
					font-size: 28rpx;
					font-weight: 550;
					white-space: nowrap;
					width: 160rpx;
				}
			}
		}
	}
</style>