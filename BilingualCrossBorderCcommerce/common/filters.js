// 价格小数点后2位数字体大小不一样
const formatValue = (value, type) => {
	if (typeof value === 'string') {
		if (value.match('¥')) {
			var reg = getRegExp('¥', 'g')
			value = value.replace(reg, '')
		}
	}
	var result = value
	switch (type) {
		case 'price': // 普通价格
			result = Number(value)
			result = result.toFixed(2)
			break
		case 'split': // 分割
			result = ('' + result).split('.')
			break
	}
	return result
}
// php时间搓
const to_date_time = (phpstr) => {
	let str = parseInt(phpstr) * 1000; //将php时间戳转化为整形并乘以1000
	let newDate = new Date(str);
	let year = newDate.getUTCFullYear(); //取年份
	let month = newDate.getUTCMonth() + 1; //取月份
	let nowday = newDate.getUTCDate(); //取天数
	let hours = newDate.getHours(); //取小时
	let minutes = newDate.getMinutes(); //取分钟
	let seconds = newDate.getSeconds(); //取秒
	return year + "-" + (month < 10 ? '0' + month : month) + "-" + (nowday < 10 ? '0' + nowday : nowday) + " " + (
		hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds <
		10 ? '0' + seconds : seconds); //拼接 2017-2-21 12:23:43
}
// php时间搓
const to_dateTimes = (phpstr) => {
	let str = parseInt(phpstr) * 1000; //将php时间戳转化为整形并乘以1000
	let newDate = new Date(str);
	let year = newDate.getUTCFullYear(); //取年份
	let month = newDate.getUTCMonth() + 1; //取月份
	let nowday = newDate.getUTCDate(); //取天数
	let hours = newDate.getHours(); //取小时
	let minutes = newDate.getMinutes(); //取分钟
	let seconds = newDate.getSeconds(); //取秒
	return (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) + ":" + (seconds <
		10 ? '0' + seconds : seconds); //拼接 2017-2-21 12:23:43
}

// php时间搓
const to_DateMonth = (phpstr) => {
	let str = parseInt(phpstr) * 1000; //将php时间戳转化为整形并乘以1000
	let newDate = new Date(str);
	let month = newDate.getUTCMonth() + 1; //取月份
	let nowday = newDate.getUTCDate(); //取天数
	return (month < 10 ? '0' + month : month) + "-" + (nowday < 10 ? '0' + nowday : nowday)  //拼接 02-21
}
const to_date_timees = (phpstr) => {
	let str = parseInt(phpstr) * 1000; //将php时间戳转化为整形并乘以1000
	let newDate = new Date(str);
	let year = newDate.getUTCFullYear(); //取年份
	let month = newDate.getUTCMonth() + 1; //取月份
	let nowday = newDate.getUTCDate(); //取天数
	let hours = newDate.getHours(); //取小时
	let minutes = newDate.getMinutes(); //取分钟
	let seconds = newDate.getSeconds(); //取秒
	return (month < 10 ? '0' + month : month) + "-" + (nowday < 10 ? '0' + nowday : nowday) + " " + (hours < 10 ?
		'0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) //拼接 2017-2-21 12:23:43
}
const to_date_times = (phpstr) => {
	let str = parseInt(phpstr) * 1000; //将php时间戳转化为整形并乘以1000
	let newDate = new Date(str);
	let year = newDate.getUTCFullYear(); //取年份
	let month = newDate.getUTCMonth() + 1; //取月份
	let nowday = newDate.getUTCDate(); //取天数
	let hours = newDate.getHours(); //取小时
	let minutes = newDate.getMinutes(); //取分钟
	let seconds = newDate.getSeconds(); //取秒
	return year + "-" + (month < 10 ? '0' + month : month) + "-" + (nowday < 10 ? '0' + nowday :
	nowday); //拼接 2017-2-21 12:23:43
}

const time_to_date = (phpstr) => {
	let str = parseInt(phpstr) * 1000; //将php时间戳转化为整形并乘以1000
	let newDate = new Date(str);
	let year = newDate.getUTCFullYear(); //取年份
	let month = newDate.getUTCMonth() + 1; //取月份
	let nowday = newDate.getUTCDate(); //取天数
	let hours = newDate.getHours(); //取小时
	let minutes = newDate.getMinutes(); //取分钟
	let seconds = newDate.getSeconds(); //取秒
	return year + "/" + (month < 10 ? '0' + month : month) + "/" + (nowday < 10 ? '0' + nowday :
	nowday)+" "+hours+":"+minutes; //拼接 2017-2-21 12:23:43
}

export default {
	formatValue,
	to_date_time,
	to_date_times,
	to_date_timees,
	to_dateTimes,
	to_DateMonth,
	time_to_date
}