'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collect = await db.collection("artitleDetailInfo");
	const art_id = await event;
	const {data:data} = await collect.where(art_id).field({"_id":false}).get();
	//返回数据给客户端
	return {
		msg:"获取成功",
		data
	}
};
