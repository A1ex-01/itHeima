<template>
	<view class="login">
		<uni-forms ref="form" :modelValue="userInfo" :rules="rules">
			<uni-forms-item name="acid">
				<uni-easyinput type="text" v-model="userInfo.acid" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item name="psw">
				<uni-easyinput type="password" v-model="userInfo.psw" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<button @click="submitForm">Submit</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo: {
					acid: "",
					psw: ""
				},
				rules: {
					// 对name字段进行必填验证
					acid: {
						rules: [{
								required: true,
								errorMessage: '请输入账号',
							},
							{
								minLength: 6,
								maxLength: 16,
								errorMessage: '账号长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					// 对email字段进行必填验证
					psw: {
						rules: [{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								minLength: 6,
								maxLength: 16,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							},
						]
					}
				}
			};
		},
		methods: {
			submitForm() {
				uni.showLoading({
					title:"加载中"
				})
				const _this = this;
				this.$refs.form.validate().then(() => {
					uniCloud.callFunction({
						name: "getUserInfo",
						data: {
							"acid": _this.userInfo.acid,
							"psw": _this.userInfo.psw
						},
						success: (res) => {
							if (res.result.affectedDocs != 0) {
								uni.setStorage({
									key: "token",
									data: this.userInfo.acid,
									success() {
										uni.switchTab({
											url: "../mine/mine"
										})
										_this.$forceUpdate();
									}
								})
							} else {
								console.log("账号不存在")
								uni.hideLoading();
							}
						}
					})
				}).catch(() => {
					console.log("提交信息缺失");
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		padding: 40rpx;
		box-sizing: border-box;
	}
</style>
