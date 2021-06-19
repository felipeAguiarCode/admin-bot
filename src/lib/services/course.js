const BaseService = require("../core/base-service")

async function create(pageNav){

	const courseService = new BaseService(
	{
		page:pageNav, 
		moduleName:"course"
	})

	await courseService.addNew();

	 await courseService.setSelection("id_school", 1);
	 await courseService.setInputTextTab("id_author_text", 330417);
	 await courseService.setInputText("id_name", "curso nome");
	 await courseService.setSelection("id_level", 2);
	 await courseService.setInputText("id_workload", 120);
	 const ID = await courseService.save();
	 console.log(ID)
}

module.exports.create = create

