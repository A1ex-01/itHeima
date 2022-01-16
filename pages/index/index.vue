<template>
	<view class="index">
		<NavBar></NavBar>
		<NavList :curr="currIndex" @send="getnavindex" ref="navlist"></NavList>
		<swiperItem :curr="currIndex" @getartcurr="getArtCurr" class="wec" ref="swiperitem"></swiperItem>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currIndex: 0
			}
		},
		mounted() {
		},
		onHide() {
			uni.$on("indexUpdate",()=>{
				this.$refs.navlist.getNavList();
				this.$refs.swiperitem.getChannels();
			})
		},
		methods: {
			getArtCurr(val) {
				this.currIndex = val;
			},
			getnavindex(val) {
				this.currIndex = val;
			}
		}
	}
</script>

<style scoped>
	.wec {
		/* #ifdef MP-WEIXIN */
		position: fixed;
		top: 0;
		bottom: -100rpx;
		left: 0;
		right: 0;
		/* #endif */
	}
</style>
