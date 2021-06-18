const puppeteer = require("puppeteer")
const CourseService = require("./lib/course");
const LessonService = require("./lib/lesson");
const ContentService = require("./lib/content");
const LiveService = require("./lib/live");
const loginService = require("./lib/login")
//const textReader = require("./utils/text-reader")
require("dotenv").config()

;(async()=>{
    const browser = await puppeteer.launch({headless: false})
	const page = await browser.newPage()


	await loginService.doLogin(page, process.env.USER, process.env.PASSWORD)  
	await LiveService.create(page)
	//await ContentService.create(page)

})()