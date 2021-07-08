require("module-alias/register")
require("dotenv").config({path:"../../../.env"})

const fs = require("fs/promises")
const path = require("path")
const puppeteer = require("puppeteer")

const BaseService = require("../core/base-service")
const liveService = require("../services/live")
const loginService = require("@services/login")

const TRACK_ID = 11
const NOTION_PROJECT_ID = 33

;(async()=>{
	const browser = await puppeteer.launch({headless: false})
	const page = await browser.newPage()

	await loginService.doLogin(page, process.env.USER, process.env.PASSWORD)  

	let jsonFile = await loadFile()
	console.log("[1/4] arquivo de JSON carregado...")

	let createdLives = await liveService.create(page, jsonFile.mentoring)
	console.log("[2/4] Lives criadas....")
	await writeFile(createLives)
	console.log(createdLives)


	//	await addLivesToBootcamp(page, lives, TRACK_ID)
	//console.log("[3/4] Lives adicionados ao bootcamp....")
})()


async function createLives(pageResponse, jsonResponse){
}

async function addLivesToBootcamp(pageResponse, arrayLives, trackID){

}
async function addEventsToNotion(pageResponse, jsonResponse){

}

async function loadFile(){
	return JSON.parse(await fs.readFile(path.resolve(__dirname, "../../tmp/mentoring.json")))
}

async function writeFile(jsonFile){
	await fs.writeFile(path.resolve(__dirname, "../../tmp/mentoring-created.json"), JSON.stringify(jsonFile))
}