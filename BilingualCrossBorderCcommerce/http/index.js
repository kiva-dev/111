// import store from '@/store/index.js'
import $ from '../common/jquery-3.6.1.min.js'
import Vue from 'vue'
import md5 from 'js-md5';
import axios from 'axios';

var Fly = require("flyio/dist/npm/wx");
var request = new Fly();

Vue.prototype.$version = '1.5.2';

// Vue.prototype.$baseUrl = 线上：wish.kolibrimall.com 测试：kjtest.ysxrj.cn
Vue.prototype.$baseUrl = 'https://wish.kolibrimall.com/';

// request.config.baseURL = 'https://kuajing.ysxrj.cn/api/';
request.config.baseURL = 'https://wish.kolibrimall.com/api/';

Vue.prototype.$Fly = request;
// Vue.prototype.$url = 'https://kuajing.ysxrj.cn/api/';
Vue.prototype.$url = 'https://wish.kolibrimall.com/api/';
request.interceptors.request.use((request) => {
	const token = uni.getStorageSync('token')
	// request.headers['Content-Type'] = 'multipart/form-data'
	// 防止缓存
	if (request.method === 'POST') {
		request.body = {
			...request.body,
			token, // body 添加自定义token
		}
	} else if (request.method === 'GET') {
		request.params = {
			token, // body 添加自定义token
			...request.params
		}
	}
	return request
})
request.interceptors.response.use(function(response) { //不要使用箭头函数，否则调用this.lock()时，this指向不对
	// uni.hideLoading();

	let errmsg = '';
	const data = response.data;
	// if (data.data.code == 10002) return uni.showToast({ title: data.data.msg, icon: 'none' })
	if (!data || typeof data !== 'object') {
		errmsg = '服务器响应格式错误';
		uni.showToast({
			title: errmsg,
			icon: 'none'
		})
	} else {
		let {
			code,
			msg
		} = data
		// 报错
		if (code == 0) {
			let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false // 中文还是英文
			let zhStr = msg
			let appid = '20230630001729096'
			let userkey = '8e_t3vzBtUjLMRNafCp5'
			let salt = (new Date).getTime()
			const str = `${appid}${zhStr}${salt}${userkey}`;
			const sign = md5(str); /* md5加密，生成签名 */
			const params = {
				q: zhStr,
				from: 'zh',
				to: 'en',
				appid: appid,
				sign,
				salt: salt
			}
			function showToast(data) {
				if (data.error_code) {
					uni.showToast({
						icon: 'none',
						title: data.error_msg
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: data.trans_result[0].dst
					});
				}
			}
			//#ifdef H5
			// console.log($, "======uni-app的H5模式引入JQuery=====");
			if (isShopCont) {
				$.ajax({
					url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
					type: 'get',
					dataType: 'jsonp',
					data: params,
					success:showToast
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			}
			//#endif
			// #ifdef APP-PLUS
			if (isShopCont) {
				uni.request({
					url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', //仅为示例，并非真实接口地址。
					data: params,
					header: {
						'custom-header': 'hello' //自定义请求头信息
					},
					success: showToast
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: msg
				})
			}
			// #endif
		}
		// 未登录
		else if (code === 2) {
			uni.removeStorageSync('token');
			let isEnglish = uni.getStorageSync('locale') == 'en' ? true : false;
			uni.showModal({
				title: isEnglish ? 'Tips' : '温馨提示',
				content: isEnglish ?
					'You have not logged in or your identity has expired, please log in.' :
					'您暂未登录或身份过期，请前往登录。',
				success: (res) => {
					if (res.confirm) {
						uni.navigateTo({
							url: '/pages/public/login'
						});
					} else {
						uni.navigateBack();
					}
				},
			});
			return
		}
		// 设置支付密码
		else if (code === 3) {
			uni.navigateTo({
				url: '/pages/mine/setPassword'
			})
			return
		}
		// 实名认证
		// if (code === 5) {
		// 	uni.navigateTo({
		// 		url: '/pages/mine/Vid'
		// 	})
		// 	return
		// }
		// 账号不存在
		else if (code == 6) {
			let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			if (isShopCont) {
				uni.showToast({
					icon: 'none',
					title: 'Account number does not exist'
				})
			} else {
				uni.showToast({
					icon: 'none',
					title: '账号不存在'
				})
			}
			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			}, 1500);
			return
		}
	}
	return response.data; //只返回业务数据部分
}, function(err) {
	let errmsg = err.message;
	let isEnglish = uni.getStorageSync('locale') == 'en' ? true : false;
	switch (err.status) {
		case 0:
			errmsg = isEnglish ? "Connection Timeout" : "网络连接错误";
			uni.showToast({
				title: errmsg,
				icon: 'none'
			})
			break;
		case 2:
			uni.removeStorageSync('token');
			uni.navigateTo({
				url: '/pages/public/login'
			})
			break;
		default:
			uni.showToast({
				title: errmsg,
				icon: 'none'
			})
	}
})

export default request

function http(api, updata) {
	let result = null
	request.post(api, updata).then((res) => {
		result = res
	}).finally(() => {
		// store.commit('upIsLogin', false)
	})
	return result
}
// export default http