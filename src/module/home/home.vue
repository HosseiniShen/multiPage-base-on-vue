<template>
	<div class="home">
    <div class="homebox">
  		<div class="header"  @click='toUpdate'>
        <img src="../../assets/my/portrait.jpeg" class="portrait"> 
        <span class="name">{{userNickName}}</span> 
        <span class='borntime'>距离宝宝出生还有{{babyBornLeft}}天</span>
        <div class='arrow'></div>
      </div>
      <div class='bar'>
        <div class="smallbar">
          <div class='num'>18</div>
          <div class="numins">关注</div>
        </div>
        <div class="smallbar">
           <div class='num'>25</div>
          <div class="numins">收藏</div>
        </div>
        <div class="smallbar">
           <div class='num'>859</div>
          <div class="numins">积分</div>
        </div>
      </div>
      <div class="listbar">
        <div class="baricon"></div>
        <div class="barcontent">
          <span>妈妈信息</span>
          <div class="littlearrow1"></div>
        </div>
      </div>
      <div class="listbar" @click='tobabyset'>
        <div class="baricon" style="background-position:-0.4rem;"></div>
        <div class="barcontent">
          <span>宝宝管理</span>
          <span class="moreInfo">{{babyCount}}个宝宝</span>
          <div class="littlearrow1"></div>
        </div>
      </div>
      <div class="listbar">
        <div class="baricon" style="background-position:-1rem;"></div>
        <div class="barcontent">
          <span>我的问答</span>
          <div class="littlearrow1"></div>
        </div>
      </div>
      <div class="listbar">
        <div class="baricon" style="background-position:-1.6rem;"></div>
        <div class="barcontent">
          <span>我的消息</span>
          <div class="littlearrow1"></div>
        </div>
      </div>
      <div class="listbar" style="margin-top:0.2rem;">
        <div class="baricon" style="background-position:-2.2rem;"></div>
        <div class="barcontent">
          <span>好物推荐</span>
          <span class="moreInfo">中国妇幼保健协会认证</span>
          <div class="littlearrow1"></div>
        </div>
      </div>
      <div class="listbar">
        <div class="baricon" style="background-position:-2.8rem;"></div>
        <div class="barcontent">
          <span>好物推荐</span>
          <div class="littlearrow1"></div>
        </div>
      </div>
      <div class="guard">
        <div class="baricon" style="background-position:-3.4rem;"></div>
        <div class="barcontent addclass">
          <span>保障情况</span>
         <div class="littlearrow2"></div>
        </div>
      </div>
      <div class="medal">
        <span class="medalsp1">我的保障勋级</span>
        <span class="medalsp2">查看勋章</span>
        <div class="littlearrow3"></div>
      </div>
      <div class="insurance">
        <div class="insurancebox">
          <div class="insuranceimg"></div>
          <div class="insurancedetail">
            <div class="detailline1">
              <span>母婴安康意外险</span>
              <span style="color:#ff6666;padding-left:0.2rem;">¥400</span>
            </div>
            <div class="note">改保险覆盖被保险人分娩过程中常见的并发症、连带被保险人损伤、甚至意外伤残等情况。</div>
            <div class="heart">被保险人(产妇)意外伤害</div>
            <div class="heart">连带被保险人(婴儿)身故</div>
            <div class="heart">被保险人并发症及连带被保险人损伤</div>
            <div class="percent">已有88%的用户加入保障计划</div>
          </div>
        </div>
        <div class="insurancebtn">查看更多保险</div>
      </div>
    </div>
    <appTab :tabItem="'user'"></appTab>
	</div>
</template>
<script>
window.onload=function(){//ios设备兼容性问题
  var u = navigator.userAgent;
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if(isiOS){
    document.getElementsByClassName('insurance')[0].style.height='13rem';
  }
}
import appTab from 'components/common/appTab';
import {customerInfo} from 'API/security';
export default {
  name: 'home',
  data () {
    return {
      userNickName:'',//用户的昵称
      babyBornLeft:'',//距离宝宝出生还有多少天
      babyCount:1,//一共有多少个宝宝
    }
  },
  methods:{
    toUpdate(){
      window.location.href='./my/updateInfo.html';
    },
    tobabyset(){
      window.location.href='./babyset.html';
    }
  },
  components:{
    appTab 
  },
  mounted () {
     var self=this;
  	 customerInfo().then(function(data){//加载用户信息
        let {user}=data;
        Object.assign(self,user);
     }).catch(function(e){
        throw 'something error';
     });
  }
}
</script>
<style scoped>
.home{
  font-size: 0.32rem;
  font-family: PingFangSC-Regular;
}
.header{
  height: 3.0rem;
  position: relative;
  background-color: #FF9F9F;
}
.header *{
  position: absolute;
}
.portrait{
  width: 1.28rem;
  height: 1.28rem;
  left: 0.38rem;
  top:0.86rem;
  border-radius: 50%;
}
.name{
  color: #fff;
  left: 2.08rem;
  top:1.0rem;
  font-size: 18px;
}
.borntime{
  color: #fff;
  left: 2.08rem;
  top:1.54rem;
  font-size: 14px;
}
.homebox{
  min-height: calc(110vh - 1rem);
  margin-bottom: 1.5rem;
}
footer{
  height: 1.0rem;
  display: flex;
  align-items: flex-end;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.arrow{
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(45deg);
  width: 0.4rem;
  height: 0.4rem;
  left: 6.5rem;
  top:1.2rem;
}
.bar{
  height: 1.2rem;
  background-color: #fff;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.smallbar{
  width: 33.3333%;
  height: 100%;
  text-align: center;
  display: inline-block;
  float: left;
}
.num,.numins{
  height: 0.6rem;
  line-height: 0.6rem;
}
.numins{
  color: #999;
}
.num{
  font-weight: 500;
  font-size: 0.36rem;
}
.listbar{
  height: 1.22rem;
  background-color: #fff;
  display: flex;
}
.baricon{
  display: inline-block;
  height: 100%;
  width: 0.8rem;
  background-image: url(../../assets/my/iconmenus.png);
  background-repeat: no-repeat;
  background-size: 4.0rem 0.4rem;
  background-position: 0.2rem;
}
.barcontent{
  display:inline-block;
  height: 100%;
  border-bottom: 2px solid #f5f5f5;
  width: 6.7rem;
  line-height: 1.22rem;
  position: relative;
}
.addclass{
  line-height: 0.92rem;
  border-bottom: none;
}

.littlearrow1,.littlearrow2,.littlearrow3{
  width: 0.15rem;
  height: 0.15rem;
  border-top: 2px solid #999;
  border-right: 2px solid #999;
  transform: rotate(45deg);
  position: absolute;
}
.littlearrow1{
  left: 6.2rem;
  top:0.55rem;  
}
.littlearrow2{
  left: 6.2rem;
  top:0.36rem;  
}
.littlearrow3{
  left: 6.96rem;
  top:0.3rem;  
}
.addclass1{
  top:0.35rem;
}
.guard{
  margin-top: 0.2rem;
  height: 0.92rem;
  background-color: #fff;
  position: relative;
  display: flex;
  border-bottom: 2px solid #f5f5f5;
}
.medal{
  height: 1.4rem;
  position: relative;
  background-color: #fff;
}
.medal *{
  position: absolute;
}
.medalsp1{
  left: 0.2rem;
  top:0.2rem;
}
.medalsp2{
  left: 5.8rem;
  top:0.2rem;
  color:#999;
  font-size: 0.28rem;
}
.medalarrow{
  width: 0.2rem;
  left: 7.0rem;
  top:0.24rem;
}
.insurance{
  height: 11.2rem;
  background-color: #fff;
}
.insurancebtn{
  width: 6.9rem;
  height: 1.0rem;
  border:2px solid #ff6666;
  border-radius: 2.0rem;
  text-align: center;
  margin:0 auto;
  color: #ff6666;
  line-height: 1.0rem;
}
.insurancebox{
  height: 9.8rem;
}
.insuranceimg{
  height: 5.6rem;
  background-image: url(../../assets/my/women.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.insurancedetail{
  height: 3.8rem;
  width: 6.9rem;
  margin: 0 auto;
  border:2px solid #f5f5f5;
  border-radius: 0.16rem;
  color: #333;
}
.detailline1{
  height: 0.8rem;
  line-height: 0.8rem;
  position: relative;
  background-image: url(../../assets/my/xinhua.png);
  background-repeat: no-repeat;
  background-position:4.8rem;
  background-size: 30%;
  padding: 0 0.3rem;
}
.note{
  font-size: 0.28rem;
  padding: 0 0.3rem;
}
.heart{
  padding: 0.1rem 0rem 0.1rem 0.6rem;
  font-size: 0.28rem;
  margin-left: 0.3rem;
  background-image: url(../../assets/my/heart.png);
  background-repeat: no-repeat;
  background-position: 0 0.1rem;
  background-size: 0.4rem 0.4rem;
}
.percent{
  font-size: 0.24rem;
  color: #666;
  padding: 0 0.3rem;
}
.bts{
  height: 1.0rem;
  flex: 1;
}
.bts3{
  position: relative;
}
.btnicon{
  width: 50%;
  height: 0.5rem;
  margin: 0 auto;
  background-size: 60%;
  background-repeat: no-repeat;
  background-position:0.15rem -0.46rem; 
  margin-top:0.1rem;
}
.iconp1{
  background-image: url(../../assets/tabIcon/recommend-tab.png);
}
.iconp2{
  background-image: url(../../assets/tabIcon/knowledge-tab.png);
}
.iconp3{
  background-image: url(../../assets/tabIcon/live-tab.png);
}
.iconp4{
  background-image: url(../../assets/tabIcon/user-tab.png);
  background-position:0.15rem 0.05rem; 
}
.btssp1{
  width: 50%;
  height: 0.4rem;
  margin: 0 auto;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.4rem;
  color: #666;
}
.bts3 img{
  position: absolute;
  width: 70%;
  top:-0.2rem;
  left: 15%;
}
.moreInfo{
  position: absolute;
  right: 0.6rem;
  color: #999;
  font-size: 0.28rem;
}
</style>