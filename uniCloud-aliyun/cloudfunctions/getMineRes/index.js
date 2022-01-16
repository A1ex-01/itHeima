'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("userInfo");
	const account =event;
	const data = await collection.where(account).field({"acid":false,"psw":false,"_id":false}).get(); 
	//返回数据给客户端
	return {
		msg:"获取成功",
		data
	}
};
