'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const dbcmd = db.command;
	const collect = await db.collection("channels");
	const {navList} = await event;
	const {data:data} = await collect.where({"id":dbcmd.in(navList)}).field({"_id":false}).get();
	//返回数据给客户端
	return {
		msg:"获取成功",
		data
	}
};
