'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const dbCmd = db.command;
	const {value} = event;
	const collection = await db.collection("artitles");
	const data = await collection.get();
	let arr = [];
	for(var i in data.data){
		if(data.data[i].title.indexOf(value) != -1){
			arr.push(data.data[i].art_id);
		}
	}
	const res = await collection.where({"art_id":dbCmd.in(arr)}).get();
	//返回数据给客户端
	return {
		res
	}
};
