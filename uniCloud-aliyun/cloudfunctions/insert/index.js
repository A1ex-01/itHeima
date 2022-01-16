'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//返回数据给客户端
	const collection = await db.collection("artitleDetailInfo");
	const obj = event;
	const data = collection.add(obj);
	return {
		data
	}
};
