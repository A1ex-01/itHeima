<template>
	<view class="navlist">
		<view class="container" style="display: flex;">
			<scroll-view scroll-x="true" scroll-with-animation="true" :scroll-left="scroll_left" class="sc">
				<view class="content">
					<view :class="[{item:true},{checked:index == currIndex}]" v-for="(item,index) in navList" :key="item.id" @click="navClick(index)">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<view class="addIcon" @click="choose">
				<uni-icons type="plusempty" style="width: 88rpx; height: 88rpx; color: #323232;"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "NavList",
		props:["curr"],
		data() {
			return {
				navList:null,
				currIndex:0,
				scroll_left:0
			};
		},
		watch:{
			curr(newV){
				this.currIndex = newV;
				this.scroll_left = 55 * newV;
				if(newV == 3){
					this.scroll_left = 75 * newV;
				}
				if(newV == 4){
					this.scroll_left = 75 * newV - 20;
				}
				if(newV == 5){
					this.scroll_left = 75 * newV - 50;
				}
			},
		},
		mounted() {
			this.getNavList();
			console.log(1);
		},
		methods:{
			choose(){
				uni.getStorage({
					key:"token",
					success:()=>{
						uni.navigateTo({
							url:"../../pages/navListCheck/navListCheck"
						})
					},
					fail: () => {
						uni.navigateTo({
							url:"../../pages/login/login"
						})
					}
				})
			},
			navClick(i){
				this.currIndex = i;
				this.$emit("send",this.currIndex);
				console.log(11111);
			},
			getNavList(){
				uni.getStorage({
					key:"token",
					success:(res)=>{
						uniCloud.callFunction({
							name:"getMineRes",
							data:{
								"acid":res.data
							},
							success:(res)=> {
								const navList = res.result.data.data[0].myNavList;
								uniCloud.callFunction({
									name:"getNewNavList",
									data:{
										"navList":navList
									},
									success:(res)=> {
										this.navList = res.result.data;
									}
								})
							}
						})
					},
					fail:()=> {
						uniCloud.callFunction({
							name:"getChannels",
							success:(res) => {
								this.navList = res.result.data;
								console.log(this.navList);
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.sc{
		width: calc(100% - 88rpx);
		white-space: nowrap;
		// & ::-webkit-scrollbar {
		// 	width: 0;
		// 	height: 0;
		// 	color: transparent;
		// }
	}
	.navlist{
		.container{
			.content{
				.checked{
					font-size: 32rpx;
					color: $base-color;
				}
			}
		}
	}
	.content {
		// width: 1000rpx;
		height: 88rpx;
		display: flex;
		.item{
			padding: 0rpx 30rpx;
			text-align: center;
			line-height: 88rpx;
			font-size: 28rpx;
			color: $font-color;
		}
	}
	.addIcon{
		width: 88rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
	}
</style>
