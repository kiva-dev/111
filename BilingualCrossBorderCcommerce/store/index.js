import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let xdlSsjt = {};

try{
	// 尝试获取本地是否存在xdlSsjt变量，第一次启动APP时是不存在的
	xdlSsjt = uni.getStorageSync('xdlSsjt');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token'];

// 保存变量到本地存储中
const savexdlSsjt = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的xdlSsjt对象，将变量添加到对象中
		let tmp = uni.getStorageSync('xdlSsjt');
		// 第一次打开APP，不存在xdlSsjt变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的xdlSsjt对象中
		uni.setStorageSync('xdlSsjt', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的xdlSsjt对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		vuex_user: xdlSsjt.vuex_user ? xdlSsjt.vuex_user : {},
		vuex_token: xdlSsjt.vuex_token ? xdlSsjt.vuex_token : '',
		// 如果vuex_version无需保存到本地永久存储，无需xdlSsjt.vuex_version方式
		vuex_version: '2.2.3',
		carNumber:0, // 购物车商品数量
		nowAddress:{
			address:'',
			latitude:'',
			longitude:''
		},
		ryStatus:99,//融云连接状态，99未连接
		conversationList:[],//融云会话列表
		newMsg:{
			num:0,
			msg:{}
		}, //融云新消息
	},
	mutations: {
		setConversationList(state,valArr){
			state.conversationList = valArr
		},
		setNewState(state,val){	//传递新消息
			state.newMsg=val
		},
		clearxdlSsjt(state){	//注销登录
			state.vuex_user = {}
			state.vuex_token = ''
		},
		setVuex_user(state,info){
			 state.vuex_user = info;
		},
		setVuex_token(state,token){
			 state.vuex_token = token;
		},
		setAddress(state,address){
			 state.nowAddress = address;
		},
		setCarNum(state,num){
			 state.carNumber = num;
		},
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			savexdlSsjt(saveKey, state[saveKey])
		}
	}
})

export default store
