export default {
	// 通用判空函数
	isEmpty(str) {
		if (str === "null" || str === "" || str === 0 || str === "0" || str === null || str === false || typeof str ===
			'undefined' || str.length === 0) {
			return true;
		}
		return false;
	},
	// 判断手机是否开启通知权限
	setPermissionsInform() {
		if (plus.os.name == 'Android') {
			var main = plus.android.runtimeMainActivity();
			var pkName = main.getPackageName();
			var uid = main.getApplicationInfo().plusGetAttribute("uid");
			var NotificationManagerCompat = plus.android.importClass(
				"android.support.v4.app.NotificationManagerCompat");
			//android.support.v4升级为androidx
			if (NotificationManagerCompat == null) {
				NotificationManagerCompat = plus.android.importClass("androidx.core.app.NotificationManagerCompat");
			}
			var areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled();
			// 未开通‘允许通知’权限，则弹窗提醒开通，并点击确认后，跳转到系统设置页面进行设置  
			if (!areNotificationsEnabled) {
				uni.showModal({
					title: '通知权限开启提醒',
					content: '您还没有开启通知权限，无法接受到消息通知，请前往设置！',
					showCancel: false,
					confirmText: '去设置',
					success: function(res) {
						if (res.confirm) {
							var Intent = plus.android.importClass('android.content.Intent');
							var Build = plus.android.importClass("android.os.Build");
							if (Build.VERSION.SDK_INT >= 26) { //android 8.0引导  
								var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
								intent.putExtra('android.provider.extra.APP_PACKAGE', pkName);
							} else if (Build.VERSION.SDK_INT >= 21) { //android 5.0-7.0  
								var intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS');
								intent.putExtra("app_package", pkName);
								intent.putExtra("app_uid", uid);
							} else { //(<21)其他--跳转到该应用管理的详情页  
								intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
								var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
								intent.setData(uri);
							}
							// 跳转到该应用的系统通知设置页  
							main.startActivity(intent);
						}
					}
				});
			}
		} else if (plus.os.name == 'iOS') {
			var isOn = undefined;
			var types = 0;
			var app = plus.ios.invoke('UIApplication', 'sharedApplication');
			var settings = plus.ios.invoke(app, 'currentUserNotificationSettings');
			if (settings) {
				types = settings.plusGetAttribute('types');
				plus.ios.deleteObject(settings);
			} else {
				types = plus.ios.invoke(app, 'enabledRemoteNotificationTypes');
			}
			plus.ios.deleteObject(app);
			isOn = (0 != types);
			if (isOn == false) {
				uni.showModal({
					title: '通知权限开启提醒',
					content: '您还没有开启通知权限，无法接受到消息通知，请前往设置！',
					showCancel: false,
					confirmText: '去设置',
					success: function(res) {
						if (res.confirm) {
							var app = plus.ios.invoke('UIApplication', 'sharedApplication');
							var setting = plus.ios.invoke('NSURL', 'URLWithString:', 'app-settings:');
							plus.ios.invoke(app, 'openURL:', setting);
							plus.ios.deleteObject(setting);
							plus.ios.deleteObject(app);
						}
					}
				});
			}
		}
	},
	// 数字转成汉字
	toChinesNum(num) {
		let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
		let unit = ['', '十', '百', '千', '万']
		num = parseInt(num)
		let getWan = (temp) => {
			let strArr = temp.toString().split('').reverse()
			let newNum = ''
			let newArr = []
			strArr.forEach((item, index) => {
				newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
			})
			let numArr = []
			newArr.forEach((m, n) => {
				if (m !== '零') numArr.push(n)
			})
			if (newArr.length > 1) {
				newArr.forEach((m, n) => {
					if (newArr[newArr.length - 1] === '零') {
						if (n <= numArr[numArr.length - 1]) {
							newNum += m
						}
					} else {
						newNum += m
					}
				})
			} else {
				newNum = newArr[0]
			}

			return newNum
		}
		let overWan = Math.floor(num / 10000)
		let noWan = num % 10000
		if (noWan.toString().length < 4) {
			noWan = '0' + noWan
		}
		return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
	},
	// 强制保留2位小数,会补上00
	toDecimal2(x) {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return false;
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if (rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + 2) {
			s += '0';
		}
		return s;
	},
}