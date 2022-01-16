'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collect = await db.collection("artitles");
	const {channel,page} = await event;
	const {data:data} = await collect.where({"channel":channel}).field({"_id":false}).skip((page-1)*6).limit(6).get();
	//返回数据给客户端
	return {
		msg:"获取成功",
		data
	}
};
