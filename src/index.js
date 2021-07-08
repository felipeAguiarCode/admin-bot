require("module-alias/register")
require("dotenv").config()
const fs = require("fs/promises")
const puppeteer = require("puppeteer")
const loginService = require("@services/login")
const trackService = require("@services/track")
const liveService = require("@services/live")
const batchService = require("@services/batch")
const loaderBootcamp = require("@loaders/bootcamp-to-json")
//const textReader = require("./utils/text-reader")



;(async()=>{
	const browser = await puppeteer.launch({headless: false})
	const page = await browser.newPage()

	await loginService.doLogin(page, process.env.USER, process.env.PASSWORD)  
	await createBootcamp(page)
})()

async function createBootcamp(page){

	//convert excel to json

	let jsonFile = await loadFile("bootcamp")
	console.log("Loaded Json File")

	//create track
	// let {trackID, slugName} = await trackService.create(page, jsonFile.track, "bootcamp")
	// let batchID = await batchService.create(page, jsonFile.batch, trackID)
	// console.log(`crated bootcamp ${trackID} and batch ${batchID}`)

	//create mentorings
	liveService.create(page, jsonFile.mentoring)

	//add courses
	// trackService.addCourses(page, jsonFile.courses, trackID)
	// console.log("Courses add")

}

async function loadFile(fileName){
	return JSON.parse(await fs.readFile(__dirname + "/tmp/" + fileName + ".json"))
}

async function writeFile(){

}