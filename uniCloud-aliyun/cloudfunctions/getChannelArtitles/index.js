'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collect = await db.collection("artitles");
	const channel = await event;
	const {data:data} = await collect.where(channel).field({"_id":false}).limit(6).get();
	//返回数据给客户端
	return {
		msg:"获取成功",
		data
	}
};
