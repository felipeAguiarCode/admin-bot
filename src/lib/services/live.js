const BaseService = require("../core/base-service")

async function create(pageNav){

	const liveService = new BaseService(
	{
		page:pageNav, 
		moduleName:"live"
	})

	await liveService.addNew();
	await liveService.setSkillsByText(["Android","Android","Android"]);
	// await liveService.setInputTextTab("id_author_text", 330417);
	// await liveService.setInputText("id_name", "live nome");
	// await liveService.setSelection("id_level", 2);
	// await liveService.setInputText("id_workload", 120);
	// const ID = await liveService.save();
	// console.log(ID)
}

module.exports.create = create

