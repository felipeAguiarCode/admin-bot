const BaseService = require("../core/base-service")

async function create(pageNav){

	const contentService = new BaseService(
	{
		page:pageNav, 
		moduleName:"content"
	})

	await contentService.addNew();
	await contentService.setInputTextTab("id_lesson_text", 1);
	await contentService.setInputText("id_name", "conteúdo nome");
	await contentService.setSelection("id_order", 1);
	await contentService.setSelection("id_type", "video");
	const ID = await contentService.save();
	console.log(ID)
}

module.exports.create = create

