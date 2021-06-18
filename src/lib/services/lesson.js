const BaseService = require("./base-service")

async function create(pageNav){

	const lessonService = new BaseService(
	{
		page:pageNav, 
		moduleName:"lesson"
	})

	await lessonService.addNew();
	await lessonService.setInputTextTab("id_course_text", 1);
    await lessonService.setSelection("id_category", 7);
	await lessonService.setInputTextTab("id_author_text", 330417);
	await lessonService.setInputText("id_name", "lição nome");
    await lessonService.setInputText("id_order", 1);
	await lessonService.setInputText("id_workload", 120);

	const ID = await lessonService.save();

	console.log(ID)
}

module.exports.create = create

