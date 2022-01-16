'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("artitleDetailInfo");
	const update = event;
	const data = await collection.update(update);
	//返回数据给客户端
	return {
		data
	}
};
