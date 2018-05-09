<template>
  <div class="appTab">
    <a href="recommend.html" :class="['recommend-tab', tabItem == 'recommend' ? 'active' : '']"><i></i>推荐</a>
    <a href="knowledge.html" :class="['knowledge-tab', tabItem == 'knowledge' ? 'active' : '']"><i></i>知识</a>
    <a href="baby.html" class="baby-tab"><i></i></a>
    <a href="live.html" :class="['live-tab', tabItem == 'live' ? 'active' : '']"><i></i>互动</a>
    <a href="home.html" :class="['user-tab', tabItem == 'user' ? 'active' : '']"><i></i>我的</a>
  </div>
</template>

<script>
export default {
    name: 'AppTab',

    data () {
        return {
      
        }
    },

    props: ['tabItem'],

    created () {

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .appTab{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: .1rem 0;
        border-top: 1px solid #eee;
        background: #fff;
        z-index: 999999;
    }
    .appTab a{
        display: inline-block;
        width: 20%;
        float: left;
        text-align: center;
        font-size: .24rem;
        color: #999;
    }
    .appTab i{
        display: block;
        margin: 0 auto;
        margin-bottom: .08rem;
        width: .4rem;
        height: .39rem;
        background-size: 100% 200%;
        background-position: center bottom;
        background-repeat: no-repeat;
    }
    .appTab a.active{
        color: #ff6666;
    }
    .appTab a.active i{
        background-position-y: top;
    }
    .recommend-tab i{
        background-image: url(../../assets/tabIcon/recommend-tab.png);
    }
    .knowledge-tab i{
        background-image: url(../../assets/tabIcon/knowledge-tab.png);
    }
    .baby-tab i{
        background: url(../../assets/tabIcon/baby-tab.png) no-repeat center;
        background-size: 100% 100%;
        width: 1rem;
        height: 1rem;
        margin-top: -.28rem
    }
    .live-tab i{
        background-image: url(../../assets/tabIcon/live-tab.png);
    }
    .user-tab i{
        background-image: url(../../assets/tabIcon/user-tab.png);
    }
</style>
