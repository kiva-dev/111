<template>
  <view class="own-page">
    <view class="own-box">
      <uni-indexed-list :options="phoneList" :show-select="false" @click="bindClick" />
    </view>
  </view>
</template>

<script>
import ChinesePY from '@/common/pinyin.js'
// import phoneList from '@/common/phone.json'
export default {
  data () {
    return {
      isShopCont: true,// 商品详情显示中文还是英文
      phoneList: {
        list: [
          {
            city: this.$t('phone.zgdl'),
            code: "+86"
          },
          {
            city: this.$t('phone.zgxg'),
            code: "+852"
          },
          {
            city: this.$t('phone.zgam'),
            code: "+853"
          },
          {
            city: this.$t('phone.zgtw'),
            code: "+886"
          },
          {
            city: this.$t('phone.xjp'),
            code: "+65"
          },
          {
            city: this.$t('phone.afh'),
            code: "+93"
          },
          {
            city: this.$t('phone.arbny'),
            code: "+355"
          },
          {
            city: this.$t('phone.aegl'),
            code: "+213"
          },
          {
            city: this.$t('phone.ade'),
            code: "+376"
          },
          {
            city: this.$t('phone.agl'),
            code: "+244"
          },
          {
            city: this.$t('phone.akl'),
            code: "+1264"
          },
          {
            city: this.$t('phone.assg'),
            code: "+247"
          },
          {
            city: this.$t('phone.atghbsd'),
            code: "+1268"
          },
          {
            city: this.$t('phone.agt'),
            code: "+54"
          },
          {
            city: this.$t('phone.alny'),
            code: "+374"
          },
          {
            city: this.$t('phone.alb'),
            code: "+297"
          },
          {
            city: this.$t('phone.adly'),
            code: "+61"
          },
          {
            city: this.$t('phone.adl'),
            code: "+43"
          },
          {
            city: this.$t('phone.asbj'),
            code: "+994"
          },
          {
            city: this.$t('phone.bhm'),
            code: "+1242"
          },
          {
            city: this.$t('phone.blin'),
            code: "+973"
          },
          {
            city: this.$t('phone.mjlg'),
            code: "+880"
          },
          {
            city: this.$t('phone.bbds'),
            code: "+1246"
          },
          {
            city: this.$t('phone.bels'),
            code: "+375"
          },
          {
            city: this.$t('phone.bls'),
            code: "+32"
          },
          {
            city: this.$t('phone.blss'),
            code: "+501"
          },
          {
            city: this.$t('phone.bn'),
            code: "+229"
          },
          {
            city: this.$t('phone.bmd'),
            code: "+1441"
          },
          {
            city: this.$t('phone.bdan'),
            code: "+975"
          },
          {
            city: this.$t('phone.blwy'),
            code: "+591"
          },
          {
            city: this.$t('phone.bjnyhhsgwn'),
            code: "+387"
          },
          {
            city: this.$t('phone.blwn'),
            code: "+267"
          },
          {
            city: this.$t('phone.bx'),
            code: "+55"
          },
          {
            city: this.$t('phone.wl'),
            code: "+673"
          },
          {
            city: this.$t('phone.bjly'),
            code: "+359"
          },
          {
            city: this.$t('phone.bjnfs'),
            code: "+226"
          },
          {
            city: this.$t('phone.bld'),
            code: "+257"
          },
          {
            city: this.$t('phone.jps'),
            code: "+855"
          },
          {
            city: this.$t('phone.gml'),
            code: "+237"
          },
          {
            city: this.$t('phone.jnd'),
            code: "+1"
          },
          {
            city: this.$t('phone.fdj'),
            code: "+238"
          },
          {
            city: this.$t('phone.kmqd'),
            code: "+1345"
          },
          {
            city: this.$t('phone.zfghg'),
            code: "+236"
          },
          {
            city: this.$t('phone.zd'),
            code: "+235"
          },
          {
            city: this.$t('phone.zl'),
            code: "+56"
          },
          {
            city: this.$t('phone.glby'),
            code: "+57"
          },
          {
            city: this.$t('phone.kml'),
            code: "+269"
          },
          {
            city: this.$t('phone.ggghg'),
            code: "+242"
          },
          {
            city: this.$t('phone.ggmzghg'),
            code: "+243"
          },
          {
            city: this.$t('phone.kkqd'),
            code: "+682"
          },
          {
            city: this.$t('phone.gsdlj'),
            code: "+506"
          },
          {
            city: this.$t('phone.tldw'),
            code: "+225"
          },
          {
            city: this.$t('phone.kldy'),
            code: "+385"
          },
          {
            city: this.$t('phone.gb'),
            code: "+53"
          },
          {
            city: this.$t('phone.spls'),
            code: "+357"
          },
          {
            city: this.$t('phone.jkghg'),
            code: "+420"
          },
          {
            city: this.$t('phone.dm'),
            code: "+45"
          },
          {
            city: this.$t('phone.jbt'),
            code: "+253"
          },
          {
            city: this.$t('phone.dmnj'),
            code: "+1767"
          },
          {
            city: this.$t('phone.dmnjghg'),
            code: "+1809"
          },
          {
            city: this.$t('phone.ngde'),
            code: "+593"
          },
          {
            city: this.$t('phone.aiji'),
            code: "+20"
          },
          {
            city: this.$t('phone.aeewd'),
            code: "+503"
          },
          {
            city: this.$t('phone.asny'),
            code: "+372"
          },
          {
            city: this.$t('phone.aseby'),
            code: "+251"
          },
          {
            city: this.$t('phone.flqd'),
            code: "+298"
          },
          {
            city: this.$t('phone.pj'),
            code: "+679"
          },
          {
            city: this.$t('phone.fl'),
            code: "+358"
          },
          {
            city: this.$t('phone.fag'),
            code: "+33"
          },
          {
            city: this.$t('phone.fskyn'),
            code: "+594"
          },
          {
            city: this.$t('phone.fsplnxy'),
            code: "+689"
          },
          {
            city: this.$t('phone.jp'),
            code: "+241"
          },
          {
            city: this.$t('phone.gby'),
            code: "+220"
          },
          {
            city: this.$t('phone.gljy'),
            code: "+995"
          },
          {
            city: this.$t('phone.dguo'),
            code: "+94"
          },
          {
            city: this.$t('phone.jn'),
            code: "+233"
          },
          {
            city: this.$t('phone.zblj'),
            code: "+350"
          },
          {
            city: this.$t('phone.xil'),
            code: "+30"
          },
          {
            city: this.$t('phone.gll'),
            code: "+299"
          },
          {
            city: this.$t('phone.glnd'),
            code: "+1473"
          },
          {
            city: this.$t('phone.gdlp'),
            code: "+590"
          },
          {
            city: this.$t('phone.gd'),
            code: "+1671"
          },
          {
            city: this.$t('phone.wdml'),
            code: "+502"
          },
          {
            city: this.$t('phone.jny'),
            code: "+240"
          },
          {
            city: this.$t('phone.gx'),
            code: "+44"
          },
          {
            city: this.$t('phone.jnya'),
            code: "+224"
          },
          {
            city: this.$t('phone.knya'),
            code: "+592"
          },
          {
            city: this.$t('phone.haid'),
            code: "+509"
          },
          {
            city: this.$t('phone.hodols'),
            code: "+504"
          },
          {
            city: this.$t('phone.md'),
            code: "+95"
          },
          {
            city: this.$t('phone.xyl'),
            code: "+36"
          },
          {
            city: this.$t('phone.bd'),
            code: "+354"
          },
          {
            city: this.$t('phone.ydu'),
            code: "+91"
          },
          {
            city: this.$t('phone.ydnxy'),
            code: "+62"
          },
          {
            city: this.$t('phone.yl'),
            code: "+98"
          },
          {
            city: this.$t('phone.ylk'),
            code: "+964"
          },
          {
            city: this.$t('phone.ael'),
            code: "+353"
          },
          {
            city: this.$t('phone.msd'),
            code: "+44"
          },
          {
            city: this.$t('phone.ysl'),
            code: "+972"
          },
          {
            city: this.$t('phone.ydl'),
            code: "+93"
          },
          {
            city: this.$t('phone.ymj'),
            code: "+1876"
          },
          {
            city: this.$t('phone.rb'),
            code: "+81"
          },
          {
            city: this.$t('phone.zxd'),
            code: "+44"
          },
          {
            city: this.$t('phone.yd'),
            code: "+962"
          },
          {
            city: this.$t('phone.ajkst'),
            code: "+7"
          },
          {
            city: this.$t('phone.kny'),
            code: "+254"
          },
          {
            city: this.$t('phone.ksa'),
            code: "+383"
          },
          {
            city: this.$t('phone.kwk'),
            code: "+965"
          },
          {
            city: this.$t('phone.jejsst'),
            code: "+996"
          },
          {
            city: this.$t('phone.lw'),
            code: "+856"
          },
          {
            city: this.$t('phone.ltwy'),
            code: "+371"
          },
          {
            city: this.$t('phone.lbn'),
            code: "+961"
          },
          {
            city: this.$t('phone.lst'),
            code: "+266"
          },
          {
            city: this.$t('phone.lbly'),
            code: "+231"
          },
          {
            city: this.$t('phone.lby'),
            code: "+218"
          },
          {
            city: this.$t('phone.lzgsd'),
            code: "+423"
          },
          {
            city: this.$t('phone.ltw'),
            code: "+370"
          },
          {
            city: this.$t('phone.lsb'),
            code: "+352"
          },
          {
            city: this.$t('phone.mqd'),
            code: "+389"
          },
          {
            city: this.$t('phone.mdjsj'),
            code: "+261"
          },
          {
            city: this.$t('phone.mlw'),
            code: "+265"
          },
          {
            city: this.$t('phone.mlxy'),
            code: "+60"
          },
          {
            city: this.$t('phone.medf'),
            code: "+960"
          },
          {
            city: this.$t('phone.ml'),
            code: "+223"
          },
          {
            city: this.$t('phone.met'),
            code: "+356"
          },
          {
            city: this.$t('phone.mtnk'),
            code: "+596"
          },
          {
            city: this.$t('phone.mltny'),
            code: "+222"
          },
          {
            city: this.$t('phone.lmqs'),
            code: "+230"
          },
          {
            city: this.$t('phone.myt'),
            code: "+262"
          },
          {
            city: this.$t('phone.mxg'),
            code: "+52"
          },
          {
            city: this.$t('phone.medw'),
            code: "+373"
          },
          {
            city: this.$t('phone.mnge'),
            code: "+377"
          },
          {
            city: this.$t('phone.mgu'),
            code: "+976"
          },
          {
            city: this.$t('phone.hs'),
            code: "+382"
          },
          {
            city: this.$t('phone.mtslt'),
            code: "+1664"
          },
          {
            city: this.$t('phone.meg'),
            code: "+212"
          },
          {
            city: this.$t('phone.msbk'),
            code: "+258"
          },
          {
            city: this.$t('phone.nmby'),
            code: "+264"
          },
          {
            city: this.$t('phone.nbe'),
            code: "+977"
          },
          {
            city: this.$t('phone.hl'),
            code: "+31"
          },
          {
            city: this.$t('phone.hsadls'),
            code: "+599"
          },
          {
            city: this.$t('phone.xlldny'),
            code: "+687"
          },
          {
            city: this.$t('phone.xxl'),
            code: "+64"
          },
          {
            city: this.$t('phone.njlg'),
            code: "+505"
          },
          {
            city: this.$t('phone.nre'),
            code: "+227"
          },
          {
            city: this.$t('phone.nrly'),
            code: "+234"
          },
          {
            city: this.$t('phone.nw'),
            code: "+47"
          },
          {
            city: this.$t('phone.am'),
            code: "+968"
          },
          {
            city: this.$t('phone.bjst'),
            code: "+92"
          },
          {
            city: this.$t('phone.best'),
            code: "+970"
          },
          {
            city: this.$t('phone.bnm'),
            code: "+507"
          },
          {
            city: this.$t('phone.bbyxjny'),
            code: "+675"
          },
          {
            city: this.$t('phone.blz'),
            code: "+595"
          },
          {
            city: this.$t('phone.mlu'),
            code: "+51"
          },
          {
            city: this.$t('phone.flb'),
            code: "+63"
          },
          {
            city: this.$t('phone.bl'),
            code: "+48"
          },
          {
            city: this.$t('phone.pty'),
            code: "+351"
          },
          {
            city: this.$t('phone.bdlg'),
            code: "+1"
          },
          {
            city: this.$t('phone.kt'),
            code: "+974"
          },
          {
            city: this.$t('phone.lnw'),
            code: "+262"
          },
          {
            city: this.$t('phone.lmny'),
            code: "+40"
          },
          {
            city: this.$t('phone.els'),
            code: "+7"
          },
          {
            city: this.$t('phone.lwd'),
            code: "+250"
          },
          {
            city: this.$t('phone.smydb'),
            code: "+684"
          },
          {
            city: this.$t('phone.smyxb'),
            code: "+685"
          },
          {
            city: this.$t('phone.smlx'),
            code: "+378"
          },
          {
            city: this.$t('phone.sdmhplxb'),
            code: "+239"
          },
          {
            city: this.$t('phone.stalb'),
            code: "+966"
          },
          {
            city: this.$t('phone.snje'),
            code: "+221"
          },
          {
            city: this.$t('phone.sewy'),
            code: "+381"
          },
          {
            city: this.$t('phone.ses'),
            code: "+248"
          },
          {
            city: this.$t('phone.slly'),
            code: "+232"
          },
          {
            city: this.$t('phone.slfk'),
            code: "+421"
          },
          {
            city: this.$t('phone.slwny'),
            code: "+386"
          },
          {
            city: this.$t('phone.nf'),
            code: "+27"
          },
          {
            city: this.$t('phone.hg'),
            code: "+82"
          },
          {
            city: this.$t('phone.xby'),
            code: "+34"
          },
          {
            city: this.$t('phone.sllk'),
            code: "+94"
          },
          {
            city: this.$t('phone.sjshnws'),
            code: "+1869"
          },
          {
            city: this.$t('phone.slxy'),
            code: "+1758"
          },
          {
            city: this.$t('phone.swst'),
            code: "+1784"
          },
          {
            city: this.$t('phone.sd'),
            code: "+249"
          },
          {
            city: this.$t('phone.sln'),
            code: "+597"
          },
          {
            city: this.$t('phone.swsl'),
            code: "+268"
          },
          {
            city: this.$t('phone.rd'),
            code: "+46"
          },
          {
            city: this.$t('phone.rs'),
            code: "+41"
          },
          {
            city: this.$t('phone.xly'),
            code: "+963"
          },
          {
            city: this.$t('phone.tjkst'),
            code: "+992"
          },
          {
            city: this.$t('phone.dsny'),
            code: "+255"
          },
          {
            city: this.$t('phone.tg'),
            code: "+66"
          },
          {
            city: this.$t('phone.ddw'),
            code: "+670"
          },
          {
            city: this.$t('phone.dg'),
            code: "+228"
          },
          {
            city: this.$t('phone.tj'),
            code: "+676"
          },
          {
            city: this.$t('phone.tlndhdbg'),
            code: "+1868"
          },
          {
            city: this.$t('phone.tns'),
            code: "+216"
          },
          {
            city: this.$t('phone.teq'),
            code: "+90"
          },
          {
            city: this.$t('phone.tkmst'),
            code: "+993"
          },
          {
            city: this.$t('phone.tkshkksqd'),
            code: "+1649"
          },
          {
            city: this.$t('phone.wgd'),
            code: "+256"
          },
          {
            city: this.$t('phone.wkl'),
            code: "+380"
          },
          {
            city: this.$t('phone.alblhxzg'),
            code: "+971"
          },
          {
            city: this.$t('phone.yg'),
            code: "+44"
          },
          {
            city: this.$t('phone.mg'),
            code: "+1"
          },
          {
            city: this.$t('phone.wlg'),
            code: "+598"
          },
          {
            city: this.$t('phone.wzbkst'),
            code: "+998"
          },
          {
            city: this.$t('phone.wnat'),
            code: "+678"
          },
          {
            city: this.$t('phone.wnrl'),
            code: "+58"
          },
          {
            city: this.$t('phone.yn'),
            code: "+84"
          },
          {
            city: this.$t('phone.wejqd'),
            code: "+1340"
          },
          {
            city: this.$t('phone.ym'),
            code: "+967"
          },
          {
            city: this.$t('phone.zby'),
            code: "+260"
          },
          {
            city: this.$t('phone.jbbw'),
            code: "+263"
          }
        ]
      },
      indexList: [],
      object: {},
      isshow:true
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    let name = uni.getStorageSync('locale') == 'en' ? 'Initial' : '首字母'
    let arr = [{ letter: name, data: [] }]
    arr[0].data.push(JSON.parse(uni.getStorageSync('phoneCont')))
    this.phoneList.list.forEach(item => {
      var py = ChinesePY.getFirstCamelChars(item.city);
      py = py.replace(py[0], py[0].toUpperCase())
      item.sou = py
      if (!this.object[py]) {
        this.object[py] = [];
        this.indexList.push(py)
      }
      this.object[py].push(item);
      // 添加数据排序
      this.indexList.sort();
    })
    this.indexList.map(items => {
      arr.push({ letter: items, data: [] })
    })
    this.phoneList.list.map(items => {
      for (let i in arr) {
        if (arr[i].letter == items.sou) {
          arr[i].data.push(items)
        }
      }
    })
    this.phoneList = arr
  },
  methods: {
    bindClick (e) {
      if(!this.isshow) return
      this.isshow=false
      uni.setStorageSync('phoneCont', JSON.stringify(e.item.name))
      setTimeout(() => {
        uni.navigateBack({ delta: 1 })
          this.isshow=true
      }, 1000);
    }
  }
}
</script>

<style lang="less" scoped>
.own-page {
  .own-box {
    .own-letter {
      position: fixed;
      right: 20rpx;
      top: 15%;
      font-size: 24rpx;
      color: #666;
      line-height: 36rpx;
      text-align: center;
    }
    .own-li {
      padding: 30rpx;
      line-height: 1;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 120rpx;
      .label {
        font-size: 26rpx;
      }
      .num {
        color: 999;
      }
    }
    .own-ul {
    }
    .own-t {
      font-size: 26rpx;
      line-height: 1;
      padding: 30rpx 30rpx;
    }
    .own-hd {
      height: 60rpx;
      background: #f9f9f9;
      line-height: 60rpx;
      font-size: 26rpx;
      padding: 0 30rpx;
    }
  }
}
</style>