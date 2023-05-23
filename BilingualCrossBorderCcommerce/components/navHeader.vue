<template>
	<view class="header-sticky" style="width: 100%;">
		<view class="title-bar-custom" :style="getBarHeight">
			<template>
				<view class="uni-btn-icon">
					<slot name="left">
						<i class="uni-btn-icon" @click="goBackMethods"
							style="font-size: 27px;position: relative;left: -8rpx;color: #fff;"></i>
					</slot>
				</view>
			</template>
			<view class="title-words" :animation="defaultTitleAni" v-show="changeDelayStatus">
				<slot name="header">默认标题</slot>
			</view>

			<view class="title-words" :animation="defaultTitleAni" style="transform:translateY(44)"
				v-show="!changeDelayStatus">
				<slot name="change-header">改变的标题</slot>
			</view>

			<view class="right-icons">
				<slot name="right">

				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	function debounce(fn, seconds) {
		let timer = null
		return () => {
			if (timer) {
				clearTimeout(timer)
			}
			timer = setTimeout(() => {
				fn()
				timer = null
			}, seconds)
		}
	}
	export default {
		data() {
			return {
				changeTitleAni: {},
				//延缓修改状态，达到延缓显示的目的
				changeDelayStatus: true,
				defaultTitleAni: {},
				animation: {}
			}
		},
		props: {
			animateTime: {
				type: Number,
				default: 800
			},
			showDefaultTitle: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			showDefaultTitle(old, newVal) {
				// 没有设置slot的情况
				if (old !== newVal) {
					this.watchScrollerChangeTitle(newVal)
				}
			},
		},
		created() {
			if (this.animateTime >>> 0 === 0) {
				console.warn('错误信息: animateTime请传入正确的数字!')
				return
			}
			this.animation = uni.createAnimation({
				duration: this.animateTime,
				timingFunction: 'ease',
			})
		},

		computed: {
			getBarHeight() {

				// #ifdef  APP-PLUS 
				if (uni.getSystemInfoSync().platform === 'android' || uni.getSystemInfoSync().platform === 'ios') {
					const barHeight = plus.navigator.getStatusbarHeight()
					return 'padding-top:' + barHeight + 'px;'
				}
				// #endif
				return ''
			}
		},
		methods: {
			goUpAndOpacityToHide() {
				this.animation.translateY(-44).opacity(0).step()
				this.animation.opacity(0).translateY(0).opacity(1).step()
				this.defaultTitleAni = this.animation.export()
				setTimeout(() => {
					this.changeDelayStatus = false
				}, this.animateTime - 300)
			},
			goDownAndOpacityToHide() {
				this.animation.translateY(44).opacity(0).step()
				this.animation.opacity(0).translateY(0).opacity(1).step()
				this.defaultTitleAni = this.animation.export()

				setTimeout(() => {
					this.changeDelayStatus = true
				}, this.animateTime - 300)
			},
			watchScrollerChangeTitle(status) {
				const callBack = debounce(() => {
					if (status) {
						this.goUpAndOpacityToHide()
					} else {
						this.goDownAndOpacityToHide()
					}

					setTimeout(() => {

					}, 400)
				}, 100)
				callBack()
			},
			goBackMethods() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
	view {
		box-sizing: unset;
	}

	.right-icons {
		position: absolute;
		height: 88rpx;
		display: flex;
		align-items: center;
		right: 0;
		/* top: 22rpx; */
		/* right: 5rpx; */
	}

	.uni-btn-icon {
		position: absolute;
		height: 88rpx;
		display: flex;
		align-items: center;
		left: 14rpx;
	}

	.header-sticky {
		/* 固定导航栏 */
		position: sticky;
		/* #ifdef H5 */
		top: 0px;
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
		z-index: 999;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
	}

	.title-words {
		font-size: 16px;
		color: #fff;
		/* padding: 22rpx; */
		/* #ifdef APP-VUE */
		display: inline-block;
		/* #endif */
		width: 80%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		max-width: 80%;
		min-width: 80%;
		flex: 1;
		text-align: center;
		/* 防止标题坍塌 */
		padding: 22rpx 0;
	}

	.title-words /deep/ .elipse {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.title-words-active {
		border-bottom: 2px solid white;
	}

	.title-bar-custom {
		/* margin-top: var(--status-bar-height); */
		/* height: 88rpx; */
		/* #ifdef APP-PLUS */
		/* box-sizing: border-box; */
		/* #endif */
		/* padding-top: var(--status-bar-height);; */
		/* padding: 8rpx; */
		background: rgb(255, 78, 47);
		/* #ifdef APP-VUE */
		display: flex;
		/* #endif */
		/* #ifdef H5 */
		display: flex;
		/* padding: 9rpx 0; */
		/* #endif */
		align-items: center;
		justify-content: center;
		position: relative;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 88rpx;
	}

	.status_bar {
		/* height: var(--status-bar-height); */
		width: 100%;
		/* #ifdef APP-VUE */
		display: block;
		/* #endif */
	}
</style>