'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("channels");
	const {data:data} = await collection.field({"_id":false}).get();
	return {
		data,
		msg:"获取成功"
	}
};
