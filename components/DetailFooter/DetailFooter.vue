<template>
	<view class="footer">
		<template v-if="!isInput">
				<uni-icons type="left" class="icon" @click="back"></uni-icons>
				<input type="text" value="" placeholder="发表评论" @focus="isIn"/>
				<uni-icons type="chat" class="icon" @click="goComment"></uni-icons>
				<uni-icons type="star" :class="{icon:true,checked:iscollect==true}" @click="isCollect"></uni-icons>
				<uni-icons type="redo" class="icon"></uni-icons>
				<view class="mask" v-if="artitleData">
					{{artitleData.comm_count}}
				</view>
		</template>
		<template v-if="isInput">
				<input type="text" v-model="sendData" placeholder="发表评论" focus="true"/>
				<text size="mini"  @click="send" style="flex-shrink: 0; margin-right: 20rpx; padding: 0rpx 16rpx; box-sizing: border-box;">发布</text>
		</template>
	</view>
</template>

<script>
	export default {
		name:"DetailFooter",
		props:["art_id","artitleData"],
		data() {
			return {
				isInput:false,
				sendData:"",
				iscollect:false
			};
		},
		mounted() {
			this.isC();
		},
		methods:{
			isCollect(){
				uni.showLoading({
					title:"加载中"
				})
				uni.getStorage({
					key: "token",
					success: async (res) => {
						const acid = await res.data;
						uniCloud.callFunction({
							name: "updateIsCollect",
							data: {
								"art_id": this.art_id,
								"acid": acid
							},
							success: (res) => {
								console.log(res);
								this.iscollect = !this.iscollect;
								uni.hideLoading();
							}
						})
					}
				})
			},
			isC(){
				uni.getStorage({
					key: "token",
					success: async (res) => {
						const acid = await res.data;
						uniCloud.callFunction({
							name: "getMineRes",
							data: {
								"acid":acid
							},
							success: (res) => {
								const isf =  res.result.data.data[0].collectArt_id;
								setTimeout(()=>{
									if(isf.indexOf(this.art_id)!=-1){
										this.iscollect = true;
									}else{
										this.iscollect = false;
									}
								},1000)
							}
						})
					}
				})
			},
			isIn(){
				this.isInput = true;
			},
			goComment(){
				uni.navigateTo({
					url:"../../pages/comment/comment?art_id="+this.art_id,
				})
			},
			send(){
				if(this.sendData.length > 0){
					uni.showLoading({
						title:"加载中"
					})
					console.log(this.sendData);
					let acid;
					uni.getStorage({
						key:"token",
						success:(res)=>{
							acid = res.data;
						},
						fail: () => {
							uni.navigateTo({
								url:"../../pages/login/login"
							})
						}
					})
					const sendD = this.sendData;
					uniCloud.callFunction({
						name:"getMineRes",
						data:{
							"acid":acid
						},
						success:(res)=>{
							const name = res.result.data.data[0].name;
							const photo = res.result.data.data[0].photo;
							console.log(sendD);
							uniCloud.callFunction({
								name:"updateArtitleDetailInfo",
								data:{
									"art_id":this.art_id,
									"acid":acid,
									"content":sendD,
									"name":name,
									"photo":photo
								},
								success:(res)=> {
									// this.$parent.$root.getDetailData();
									uniCloud.callFunction({
										name:"updateComment",
										data:{
											"art_id":this.art_id
										},
										success: () => {
											this.$parent.$root.getDetailData();
											uni.hideLoading();
										}
									})
									
								}
							})
						}
					})
				}else{
					console.log("不能为空值");
				}
				this.sendData = "";
				this.isInput = false;
			},
			back(){
				uni.navigateBack({
					
				});
			}
		}
	}
</script>

<style lang="scss">
	.footer{
		position: fixed;
		left: 0;
		right: 0;
		top: calc(100% - 92rpx);
		bottom: 0;
		border-top: 1rpx solid #ebedf0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.mask{
			position: fixed;
			right: 18%;
			bottom: 50rpx;
			padding: 0rpx 8rpx;
			background-color: red;
			font-size: 14rpx;
			color: #fff;
			border-radius: 14rpx;
		}
		>.icon{
			width: 150rpx;
			height: 100%;
			font-size: 48rpx !important;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.checked{
			color: red !important;
		}
		>input{
			height: 60rpx;
			width: 100%;
			border: 1px solid #efefef;
			background-color: #f8f8f8;
			border-radius: 30rpx;
			padding-left: 20rpx;
			margin: 0rpx 20rpx;
		}
	}
</style>
