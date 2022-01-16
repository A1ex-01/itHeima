<template>
	<view class="resetUserInfo" v-if="userInfo">
		<view class="userImg" @click="changeImg">
			<text>头像</text>
			<view class="userImg_right">
				<image :src="userInfo.photo" mode=""></image>
				<uni-icons type="right"></uni-icons>
			</view>
		</view>
		<view class="ename" @click="changeName">
			<text>名称</text>
			<view class="ename_right">
				<text>{{userInfo.name}}</text>
				<uni-icons type="right"></uni-icons>
			</view>
		</view>
		<view class="birth">
			<text>生日</text>
			<view class="piker">
				<picker mode="date" :value="birValue" start="2000-01-01" end="2030-01-01" @change="bindDateChange">
					<view>{{userInfo.birthday}}</view>
				</picker>
				<uni-icons type="right"></uni-icons>
			</view>
		</view>
		<luanqing-inputdialog ref="mask" type="text" :allowEmpty="false" @callback="setName"></luanqing-inputdialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				acid:null,
				userInfo:null,
				birValue:null
			};
		},
		onLoad() {
			this.getAcid();
		},
		methods:{
			getAcid(){
				uni.showLoading({
					title:"加载中"
				})
				uni.getStorage({
					key:"token",
					success:(res)=>{
						this.acid = res.data;
						this.getUserInfo();
					}
				})
			},
			showInput(title,returnData,gameStyle,large){
			    this.gameStyle = gameStyle;
			    this.returnData = returnData;
			    this.title = title;
			    this.mask = true;
			    this.large = large;
			},
			changeName(){
				this.$refs.mask.showInput("修改昵称");
			},
			getUserInfo(){
				uniCloud.callFunction({
					name:"getMineRes",
					data:{
						"acid":this.acid
					},
					success:async(res)=>{
						this.userInfo =await res.result.data.data[0];
						this.birValue = await this.userInfo.birthday;
						uni.hideLoading()
					}
				})
			},
			bindDateChange(e){
				uniCloud.callFunction({
					name:"updateUserBirth",
					data:{
						"acid":this.acid,
						"birthday":e.detail.value
					},
					success:()=>{
						console.log("修改成功")
						this.getUserInfo();
					}
				})
			},
			setName(val){
				uniCloud.callFunction({
					name:"updateUserName",
					data:{
						"acid":this.acid,
						"ename":val.content
					},
					success:()=> {
						if(this.acid == "15070911936"){
							uniCloud.callFunction({
								name:"updateArtitles",
								data:{
									"aut_name":val.content
								}
							})
							uniCloud.callFunction({
								name:"up",
								data:{
									"aut_name":val.content
								}
							})
						}
						this.getUserInfo();
					}
				})
			},
			changeImg(){
				uni.chooseImage({
					count:1,
					sizeType:["orginal"],
					success: (res) => {
						const img = res.tempFilePaths[0];
						uniCloud.uploadFile({
							cloudPath:"userImg",
							filePath:img,
							success:async (res)=>{
								const imgUrl = await res.fileID;
								uniCloud.callFunction({
									name:"updateUserInfo",
									data:{
										"acid":this.acid,
										"imgsrc":imgUrl
									},
									success:()=> {
										if(this.acid == "15070911936"){
											uniCloud.callFunction({
												name:"updateArtitles",
												data:{
													"aut_photo":imgUrl
												}
											})
											uniCloud.callFunction({
												name:"up",
												data:{
													"aut_photo":imgUrl
												}
											})
										}
										this.getAcid();
									}
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.resetUserInfo {
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		.userImg{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid rgba($color: #ebedf0, $alpha: 0.5);
			>text{
				font-size: 28rpx;
				color: $font-color;
			}
			>.userImg_right{
				display: flex;
				justify-content: center;
				align-items: center;
				>image{
					width: 100rpx;
					height: 100rpx;
					margin-right: 10rpx;
					border-radius: 50%;
				}
			}
		}
		>.ename{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			font-size: 28rpx;
			border-bottom: 1rpx solid rgba($color: #ebedf0, $alpha: 0.5);
			>.ename_right{
				color: #969799;
			}
		}
		>.birth{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			font-size: 28rpx;
			border-bottom: 1rpx solid rgba($color: #ebedf0, $alpha: 0.5);
			>.piker{
				display: flex;
				color: #969799;
			}
		}
	}
</style>
